import { useSvgContainer } from "@/Hooks/useSvgContainer";
import React, { useEffect, useMemo, useState } from "react";
import { useFetchStatistics } from "@/Hooks/useFetchStatistics";
import { useMakeStatistics } from "@/Hooks/useMakeStatistics";
import OverviewPanel from "./OverviewPanel";
import {
    bisector,
    easeExp,
    easeLinear,
    easeQuadIn,
    extent,
    max,
    pointer,
    scaleLinear,
    scaleTime,
    select,
    selectAll,
} from "d3";
import Chart from "./Chart";
import XAxis from "./XAxis";
import YAxis from "./YAxis";
import { formatDateLocal, getTimeToHMSFormat } from "@/Helper/date";
import { useTooltip } from "@/Hooks/useTooltip";
import TooltipCard from "../TooltipCard";
import TooltipIndicator from "./TooltipIndicator";
import {
    getKeyListFromData,
    groupDataByKeyValue,
    transformData,
} from "@/Helper/utils";
import SelectorPanel from "./SelectorPanel";
import NoDataText from "../NoDataText";

const currentTime = new Date().getTime();
const weekInterval = 6 * 24 * 60 * 60 * 1000;
const initStart = formatDateLocal(new Date(currentTime - weekInterval));
const initEnd = formatDateLocal(new Date(currentTime));

const TotalStatusContainer = () => {
    const { svgContainerRef, svgWidth, svgHeight } = useSvgContainer();
    const {
        overlayRef,
        setTooltipPos,
        tooltipPos,
        tooltipData,
        setTooltipData,
    } = useTooltip();
    const [filteredData, setFilteredData] = useState([]);
    const [legendItems, setLegendItems] = useState([]);
    const [activatedLegend, setActivatedLegend] = useState(null);
    const [selectedGame, setSelectedGame] = useState("");
    const [selectedManager, setSelectedManager] = useState("");
    const [calendarDate, setCalendarDate] = useState({
        start: initStart,
        end: initEnd,
    });
    const { fetchedData, fetchData } = useFetchStatistics(
        calendarDate.start,
        calendarDate.end
    );

    const gameList = useMemo(
        () => getKeyListFromData(fetchedData, "product"),
        [fetchedData]
    );
    const managerList = useMemo(
        () => getKeyListFromData(fetchedData, "assigned_manager"),
        [fetchedData]
    );

    const margin = {
        top: 14,
        right: 15,
        bottom: 30,
        left: 50,
    };
    const innerWidth = svgWidth - margin.left - margin.right;
    const innerHeight = svgHeight - margin.top - margin.bottom;

    const totalStatusTransformer = (data, key) => {
        const valueArray = data[key];
        const satisfyRespondedInquiries = valueArray.filter(
            (v) => v.satisfy_rate > 0
        );

        const processedInquiries = valueArray.filter(
            (v) => v.inquiry_status === "답변완료"
        );

        const totalSatisfyRate = satisfyRespondedInquiries.reduce(
            (sum, curr) => sum + curr.satisfy_rate,
            0
        );

        const avgSatisfyRate =
            satisfyRespondedInquiries.length === 0
                ? 0
                : Math.round(
                      (totalSatisfyRate / satisfyRespondedInquiries.length) * 10
                  ) / 10;

        const avgElapsedTime =
            processedInquiries.length > 0
                ? Math.round(
                      processedInquiries.reduce(
                          (sum, curr) => sum + curr.elapsed_time,
                          0
                      ) / processedInquiries.length
                  )
                : 0;

        const inquiryProcessRatio = valueArray.length > 0 ? 
            Math.round((processedInquiries.length / valueArray.length) * 1000) /
            10 : 0;

        const satisfyResponseRatio = valueArray.length > 0 ? 
            Math.round(
                (satisfyRespondedInquiries.length / valueArray.length) * 1000
            ) / 10 : 0;

        return {
            date: key,
            inquiryCount: valueArray.length,
            avgSatisfyRate: avgSatisfyRate,
            avgElapsedTime: avgElapsedTime,
            inquiryProcessRatio: inquiryProcessRatio,
            satisfyResponseRatio: satisfyResponseRatio,
        };
    };

    const legendItemFactory = ({
        id,
        title,
        scale,
        totalValue,
        accessor,
        formatter,
        isShow = false,
        ticks,
        unit,
    }) => {
        return {
            id,
            title,
            scale,
            totalValue,
            accessor,
            formatter,
            isShow,
            ticks,
            unit,
            makeTicks() {
                if (this.scale === null)
                    throw new Error("Scale을 초기화 해주세요.");
                const [_, max] = this.scale.domain();
                const ticks = this.scale.ticks(this.ticks);
                const lastTick = ticks[ticks.length - 1];
                const ticksInterval = ticks[1] - ticks[0];
                if (max > lastTick) {
                    ticks.push(max);
                }
                return ticks;
            },
            formatValue() {
                if (this.formatter === null)
                    throw new Error("formatter를 초기화 해주세요.");
                return `${this.formatter(this.totalValue)} ${this.unit}`;
            },
        };
    };

    const makeLegend = (data) => {
        const totalInquiryLegend = legendItemFactory({
            id: "total_inquiry_count",
            title: "총 문의 수",
            scale: scaleLinear()
                .domain([0, max(data.map((d) => d.inquiryCount))])
                .range([innerHeight, 0])
                .nice(),
            totalValue:
                data.length > 0
                    ? data.reduce((sum, cur) => sum + cur.inquiryCount, 0)
                    : 0,
            accessor: (d) => d.inquiryCount,
            formatter: (v) => new Intl.NumberFormat("ko-KR").format(v),
            isShow: true,
            ticks: 5,
            unit: "건",
        });

        const avgElapsedTimeLegend = legendItemFactory({
            id: "avg_elapsed_time",
            title: "평균 처리 시간",
            scale: scaleLinear()
                .domain([
                    0,
                    Math.max(
                        max(data, (d) => d.avgElapsedTime),
                        1
                    ),
                ])
                .range([innerHeight, 0]),
            totalValue:
                data.length > 0
                    ? Math.round(
                          data.reduce(
                              (sum, cur) => sum + cur.avgElapsedTime,
                              0
                          ) / data.length
                      )
                    : 0,
            accessor: (d) => d.avgElapsedTime,
            formatter: getTimeToHMSFormat,
            ticks: 5,
            unit: null,
        });

        const processedRatioLegend = legendItemFactory({
            id: "processed_ratio",
            title: "처리율",
            scale: scaleLinear().domain([0, 100]).range([innerHeight, 0]),
            totalValue:
                data.length > 0
                    ? Math.round(
                          (data.reduce(
                              (sum, cur) => sum + cur.inquiryProcessRatio,
                              0
                          ) /
                              data.length) *
                              10
                      ) / 10
                    : 0,
            accessor: (d) => d.inquiryProcessRatio,
            formatter: (v) => +v.toFixed(1),
            ticks: 5,
            unit: "%",
        });

        const avgSatisfyRateLegend = legendItemFactory({
            id: "avg_satisfy_rate",
            title: "평균 만족도",
            scale: scaleLinear().domain([0, 3]).range([innerHeight, 0]),
            totalValue:
                data.filter((v) => v.avgSatisfyRate > 0).length > 0
                    ? Math.round(
                          (data
                              .filter((v) => v.avgSatisfyRate > 0)
                              .reduce(
                                  (sum, cur) => sum + cur.avgSatisfyRate,
                                  0
                              ) /
                              data.filter((v) => v.avgSatisfyRate > 0).length) *
                              10
                      ) / 10
                    : 0,
            accessor: (d) => d.avgSatisfyRate,
            formatter: (v) => +v.toFixed(1),
            ticks: 4,
            unit: "점",
        });

        const satisfyResponseRatioLegend = legendItemFactory({
            id: "satisfy_response_ratio",
            title: "만족도 응답률",
            scale: scaleLinear().domain([0, 100]).range([innerHeight, 0]),
            totalValue:
                data.length > 0
                    ? Math.round(
                          (data.reduce(
                              (sum, cur) => sum + cur.satisfyResponseRatio,
                              0
                          ) /
                              data.length) *
                              10
                      ) / 10
                    : 0,
            accessor: (d) => d.satisfyResponseRatio,
            formatter: (v) => +v.toFixed(1),
            ticks: 4,
            unit: "%",
        });

        return [
            totalInquiryLegend,
            avgSatisfyRateLegend,
            avgElapsedTimeLegend,
            satisfyResponseRatioLegend,
            processedRatioLegend,
        ];
    };

    const dateScale = scaleTime()
        .domain(extent(filteredData, (d) => new Date(d.date)))
        .range([0, innerWidth]);

    useEffect(() => {
        if (fetchedData.length === 0) return;
        const groupedData = groupDataByKeyValue(fetchedData, "reg_date");
        const transformedData = transformData(groupedData, (key) =>
            totalStatusTransformer(groupedData, key)
        );

        setFilteredData(transformedData);
        const legendItemList = makeLegend(transformedData);

        if (activatedLegend) {
            const activated_id = activatedLegend?.id;
            legendItemList.map((v) => {
                if (v.id === activated_id) {
                    v.isShow = true;
                } else {
                    v.isShow = false;
                }
            });
        }
        setSelectedGame("");
        setSelectedManager("");
        setLegendItems(legendItemList);
        setActivatedLegend(legendItemList.find((v) => v.isShow));
    }, [fetchedData]);

    useEffect(() => {
        const pathAnimationDuration = 500;
        const svg = svgContainerRef.current;
        if (!svg) return;
        select(svg)
            .selectAll("path")
            .interrupt()
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", function () {
                const length = this.getTotalLength();
                return length;
            })
            .attr("stroke-dashoffset", function () {
                const length = this.getTotalLength();
                return length;
            })
            .transition()
            .duration(pathAnimationDuration)
            .ease(easeLinear)
            .attr("stroke-dashoffset", 0);

        selectAll(".indicatorCircle")
            .interrupt()
            .attr("r", 0)
            .transition()
            .duration(200)
            .delay(pathAnimationDuration)
            .ease(easeLinear)
            .attr("r", 2);

        selectAll(".yAxis")
            .interrupt()
            .attr("transform", `translate(0,${innerHeight})`)
            .attr("opacity", 0)
            .transition()
            .duration(pathAnimationDuration / 2)
            .ease(easeQuadIn)
            .attr("opacity", 1)
            .attr("transform", function () {
                return `translate(0,${this.getAttribute("data-height-value")})`;
            });

        return () => {};
    }, [filteredData, legendItems]);

    useEffect(() => {
        const gameFilterFunc = (data) => data.product === selectedGame;
        const managerFilterFunc = (data) =>
            data.assigned_manager === selectedManager;
        const filterFuncList = [];
        if (selectedGame) filterFuncList.push(gameFilterFunc);
        if (selectedManager) filterFuncList.push(managerFilterFunc);

        const newlyFiltered = filterFuncList.reduce((acc, cur) => {
            return acc.filter(cur);
        }, fetchedData);
        const groupedData = groupDataByKeyValue(newlyFiltered, "reg_date");
   
        let currentDate = new Date(calendarDate.start);
        while(currentDate <= new Date(calendarDate.end)){
            const targetDate = formatDateLocal(currentDate);
            if(!groupedData[targetDate]){
                groupedData[targetDate] = []
            };
            currentDate.setDate(currentDate.getDate() + 1);
        }

        const transformedData = transformData(groupedData, (key) =>
            totalStatusTransformer(groupedData, key)
        );
        transformedData.sort((a,b) => new Date(a.date) - new Date(b.date));

        const newLegends = makeLegend(transformedData);
        setFilteredData(transformedData);
        const activated_id = activatedLegend?.id;
        newLegends.map((v) => {
            if (v.id === activated_id) {
                v.isShow = true;
            } else {
                v.isShow = false;
            }
        });
        setLegendItems(newLegends);
        setActivatedLegend(newLegends.find((v) => v.id === activated_id));
    }, [selectedGame, selectedManager]);

    const legendToggleHandler = (payload) => {
        setLegendItems((prev) =>
            prev.map((legend) => {
                if (legend.id === payload) {
                    legend.isShow = true;
                } else {
                    legend.isShow = false;
                }
                return legend;
            })
        );
        setActivatedLegend(legendItems.find((v) => v.id === payload));
    };

    const mouseOverHandler = (e) => {
        const overlay = overlayRef.current;
        if (!overlay) return;
        if (!dateScale) return;
        const [x] = pointer(e, overlay);
        setTooltipPos({ x: e.clientX, y: e.clientY });
        const x0 = dateScale.invert(x);
        const bisectDate = bisector((d) => new Date(d.date)).right;
        const index = bisectDate(filteredData, x0, 1);
        const targetData = filteredData[index - 1];
        setTooltipData(targetData);
    };

    const mouseOutHandler = () => {
        setTooltipData(null);
    };
    const gameSelectHandler = (e) => {
        setSelectedGame(e.target.value);
    };
    const managerSelectHandler = (e) => {
        setSelectedManager(e.target.value);
    };
    const dateSelectHandler = (dates) => {
        const [start, end] = dates;

        setCalendarDate({
            start: start ? new Date(formatDateLocal(start)) : null,
            end: end ? new Date(formatDateLocal(end)) : null,
        });

        if (!!start && !!end) {
            fetchData(formatDateLocal(start), formatDateLocal(end));
        }
    };

    return (
        <div className="col-span-1 rounded-sm h-[480px] bg-white p-5 box-border flex flex-col">
            <h1 className="font-bold text-[18px]">1:1문의 현황</h1>
            <OverviewPanel
                legendItems={legendItems}
                legendToggleHandler={legendToggleHandler}
            />
            <SelectorPanel
                selectedGame={selectedGame}
                gameList={gameList}
                gameSelectHandler={gameSelectHandler}
                selectedManager={selectedManager}
                managerList={managerList}
                managerSelectHandler={managerSelectHandler}
                dateSelectHandler={dateSelectHandler}
                calendarDate={calendarDate}
            />

            <div
                ref={svgContainerRef}
                className="flex-1 w-full h-full rounded-sm"
            >
                {svgWidth > 0 && (
                    <>
                        <svg width={svgWidth} height={svgHeight}>
                            <g
                                transform={`translate(${margin.left},${margin.top})`}
                            >
                                <XAxis
                                    margin={margin}
                                    filteredData={filteredData}
                                    dateScale={dateScale}
                                    innerWidth={innerWidth}
                                    innerHeight={innerHeight}
                                />
                                <YAxis
                                    margin={margin}
                                    activatedLegend={activatedLegend}
                                    innerWidth={innerWidth}
                                    innerHeight={innerHeight}
                                />
                                {filteredData.length === 0 ? (
                                    <NoDataText
                                        innerWidth={innerWidth}
                                        innerHeight={innerHeight}
                                    />
                                ) : (
                                    <>
                                        <Chart
                                            filteredData={filteredData}
                                            dateScale={dateScale}
                                            activatedLegend={activatedLegend}
                                        />
                                        <rect
                                            ref={overlayRef}
                                            width={innerWidth + margin.right}
                                            height={innerHeight}
                                            onMouseMove={mouseOverHandler}
                                            onMouseLeave={mouseOutHandler}
                                            opacity={0}
                                        ></rect>
                                        {tooltipData && (
                                            <TooltipIndicator
                                                tooltipData={tooltipData}
                                                margin={margin}
                                                innerHeight={innerHeight}
                                                dateScale={dateScale}
                                                activatedLegend={
                                                    activatedLegend
                                                }
                                            />
                                        )}
                                    </>
                                )}
                            </g>
                        </svg>
                        {tooltipData && filteredData.length > 0 && activatedLegend && (
                            <TooltipCard tooltipPos={tooltipPos}>
                                <p className="text-[14px] py-1">
                                    {tooltipData.date}
                                </p>
                                <p className="text-[12px]">
                                    <span>{activatedLegend.title} : </span>
                                    <span>
                                        {`${activatedLegend.formatter(
                                            activatedLegend.accessor(
                                                tooltipData
                                            )
                                        )}${
                                            activatedLegend.unit
                                                ? activatedLegend.unit
                                                : ""
                                        }`}
                                    </span>
                                </p>
                            </TooltipCard>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default TotalStatusContainer;

import { formatDateLocal, getTimeToHMSFormat } from "@/Helper/date";
import {
    getKeyListFromData,
    groupDataByKeyValue,
    transformData,
} from "@/Helper/utils";
import { useFetchStatistics } from "@/Hooks/useFetchStatistics";
import { useSvgContainer } from "@/Hooks/useSvgContainer";
import {
    bisector,
    extent,
    filter,
    max,
    pointer,
    scaleLinear,
    scaleTime,
} from "d3";
import React, { useEffect, useState, useMemo, useRef } from "react";
import XAxis from "./XAxis";
import YAxis from "./YAxis";
import ScatterPlotChart from "./ScatterPlotChart";
import SelectorPanel from "./SelectorPanel";
import TooltipCard from "../TooltipCard";
import { useTooltip } from "@/Hooks/useTooltip";
import NoDataText from "../NoDataText";

const currentTime = new Date().getTime();
const weekInterval = 6 * 24 * 60 * 60 * 1000;
const initStart = formatDateLocal(new Date(currentTime - weekInterval));
const initEnd = formatDateLocal(new Date(currentTime));

const ProcessingTimeAndSatisfactionScoreContainer = () => {
    const { svgContainerRef, svgWidth, svgHeight } = useSvgContainer();
    const [calendarDate, setCalendarDate] = useState({
        start: initStart,
        end: initEnd,
    });
    const maxInquiryCountFetched = useRef(0);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedGame, setSelectedGame] = useState("");
    const [selectedManager, setSelectedManager] = useState("");
    const { fetchedData, fetchData } = useFetchStatistics(
        calendarDate.start,
        calendarDate.end
    );
    const [graphType, setGraphType] = useState("manager");
    const {
        overlayRef,
        setTooltipPos,
        tooltipPos,
        tooltipData,
        setTooltipData,
    } = useTooltip();

    const mouseMoveHandler = (data) => (event) => {
        const x = event.clientX;
        const y = event.clientY;
        setTooltipData(data);
        setTooltipPos({ x, y });
    };

    const mouseOutHandler = () => {
        setTooltipData(null);
    };

    const graphTypeToggleHandler = (payload) => {
        if (!["game", "manager"].includes(payload)) return;
        setGraphType(payload);
    };

    const gameList = useMemo(
        () => getKeyListFromData(fetchedData, "product"),
        [fetchedData]
    );
    const managerList = useMemo(
        () => getKeyListFromData(fetchedData, "assigned_manager"),
        [fetchedData]
    );

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

    const gameColorMap = {
        PT: "#FF5733", // Red-Orange
        LH: "#33C1FF", // Light Blue
        DK: "#8D33FF", // Purple
        FH: "#33FF57", // Green
        AO: "#FFC300", // Yellow
        GZ: "#FF33A6", // Pink
        NX: "#33FFCC", // Mint Green
        SR: "#FF3380", // Hot Pink
        CC: "#335BFF", // Blue
        ETC: "#A6FF33", // Lime Green
    };

    const margin = {
        top: 14,
        right: 15,
        bottom: 30,
        left: 55,
    };
    const innerWidth = svgWidth - margin.left - margin.right;
    const innerHeight = svgHeight - margin.top - margin.bottom;

    const transFormer = (data, key) => {
        const valueArray = data[key];
        const satisfyRespondedInquiries = valueArray.filter(
            (v) => v.satisfy_rate > 0
        );
        const totalSatisfyRate = satisfyRespondedInquiries.reduce(
            (sum, curr) => sum + curr.satisfy_rate,
            0
        );
        const processedInquiries = valueArray.filter(
            (v) => v.inquiry_status === "답변완료"
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

        return {
            category: key,
            inquiryCount: valueArray.length,
            avgSatisfyRate: avgSatisfyRate,
            avgElapsedTime: avgElapsedTime,
        };
    };

    const elapsedTimeScale = scaleLinear()
        .domain([
            0,
            Math.max(
                max(filteredData, (d) => d.avgElapsedTime),
                60 * 10
            ),
        ])
        .range([innerHeight, 0]);

    const inquiryCountScale = scaleLinear()
        .domain([0, maxInquiryCountFetched.current])
        .range([7, Math.floor(innerWidth / 15)]);

    const avgSatisfyRateScale = scaleLinear()
        .domain([0, 3])
        .range([0, innerWidth]);

    useEffect(() => {
        if (fetchedData.length === 0) return;
        const groupedData = groupDataByKeyValue(
            fetchedData.filter((v) => v.inquiry_status === "답변완료"),
            "product"
        );

        const transformedData = transformData(groupedData, (key) =>
            transFormer(groupedData, key)
        );
        maxInquiryCountFetched.current = max(
            transformedData,
            (d) => d.inquiryCount
        );

        setFilteredData(transformedData);
        setTooltipData(null);
        setSelectedGame("");
        setSelectedManager("");
        setGraphType("manager");
    }, [fetchedData]);

    useEffect(() => {
        if (fetchedData.length === 0) return;
        if (graphType !== "game") return;
        const targetData = selectedGame
            ? fetchedData.filter((v) => v.product === selectedGame)
            : fetchedData;

        const groupedData = groupDataByKeyValue(
            targetData.filter((v) => v.inquiry_status === "답변완료"),
            "assigned_manager"
        );

        const transformedData = transformData(groupedData, (key) =>
            transFormer(groupedData, key)
        );

        setTooltipData(null);
        setFilteredData(transformedData);
        setSelectedManager("");
    }, [selectedGame, graphType]);

    useEffect(() => {
        if (fetchedData.length === 0) return;
        if (graphType !== "manager") return;
        const targetData = selectedManager
            ? fetchedData.filter((v) => v.assigned_manager === selectedManager)
            : fetchedData;

        const groupedData = groupDataByKeyValue(targetData, "product");

        const transformedData = transformData(groupedData, (key) =>
            transFormer(groupedData, key)
        );
        setTooltipData(null);
        setFilteredData(transformedData);
        setSelectedGame("");
    }, [selectedManager, graphType]);

    return (
        <div className="col-span-1 rounded-sm h-[380px] p-5 bg-white box-border flex flex-col relative">
            <h1 className="font-bold text-[18px]">처리시간 및 만족도</h1>

            <SelectorPanel
                selectedGame={selectedGame}
                gameList={gameList}
                gameSelectHandler={gameSelectHandler}
                selectedManager={selectedManager}
                managerList={managerList}
                managerSelectHandler={managerSelectHandler}
                dateSelectHandler={dateSelectHandler}
                calendarDate={calendarDate}
                graphType={graphType}
                graphTypeToggleHandler={graphTypeToggleHandler}
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
                                {filteredData.length === 0 ? (
                                    <NoDataText
                                        innerWidth={innerWidth}
                                        innerHeight={innerHeight}
                                    />
                                ) : (
                                    <>
                                        <XAxis
                                            margin={margin}
                                            filteredData={filteredData}
                                            avgSatisfyRateScale={
                                                avgSatisfyRateScale
                                            }
                                            innerWidth={innerWidth}
                                            innerHeight={innerHeight}
                                        />
                                        <YAxis
                                            margin={margin}
                                            filteredData={filteredData}
                                            elapsedTimeScale={elapsedTimeScale}
                                            innerWidth={innerWidth}
                                            innerHeight={innerHeight}
                                        />
                                        <ScatterPlotChart
                                            overlayRef={overlayRef}
                                            margin={margin}
                                            filteredData={filteredData}
                                            avgSatisfyRateScale={
                                                avgSatisfyRateScale
                                            }
                                            gameColorMap={gameColorMap}
                                            elapsedTimeScale={elapsedTimeScale}
                                            inquiryCountScale={
                                                inquiryCountScale
                                            }
                                            innerWidth={innerWidth}
                                            innerHeight={innerHeight}
                                            tooltipData={tooltipData}
                                            mouseMoveHandler={mouseMoveHandler}
                                            mouseOutHandler={mouseOutHandler}
                                        />
                                    </>
                                )}
                            </g>
                        </svg>
                        {tooltipData && filteredData.length > 0 && (
                            <TooltipCard tooltipPos={tooltipPos}>
                                {graphType === "game" ? (
                                    <p className="text-[14px] py-1">
                                        게임 -{" "}
                                        {selectedGame ? selectedGame : "all"}
                                    </p>
                                ) : null}
                                <p className="text-[14px] py-1">
                                    분류 - {tooltipData.category}
                                </p>
                                <p className="text-[14px]">
                                    총 문의량 : {tooltipData.inquiryCount} 건
                                </p>
                                <p className="text-[14px]">
                                    평균 만족도 : {tooltipData.avgSatisfyRate}{" "}
                                    점
                                </p>
                                <p className="text-[14px]">
                                    평균 처리시간 :{" "}
                                    {getTimeToHMSFormat(
                                        tooltipData.avgElapsedTime
                                    )}
                                </p>
                            </TooltipCard>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProcessingTimeAndSatisfactionScoreContainer;

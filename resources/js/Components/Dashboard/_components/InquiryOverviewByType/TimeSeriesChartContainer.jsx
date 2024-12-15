import {
    bisector,
    easeLinear,
    extent,
    pointer,
    scaleLinear,
    scaleTime,
    select,
    selectAll,
} from "d3";
import React, { useEffect, useState } from "react";
import TimeSeriesLineChart from "./TimeSeriesLineChart";
import TimeSeriesXAxis from "./TimeSeriesXAxis";
import TimeSeriesYAxis from "./TimeSeriesYAxis";
import { useTooltip } from "@/Hooks/useTooltip";
import { commaSeparateNumber } from "@/Helper/numberFormat";
import TooltipCard from "./../TooltipCard";
import NoDataText from "../NoDataText";

const TimeSeriesChartContainer = ({
    innerWidth,
    innerHeight,
    margin,
    data,
    inquiryTypeList,
    setTooltipPos,
    tooltipData,
    setTooltipData,
    overlayRef
}) => {
    const [activatedInquiryType, setActivatedInquiryType] = useState(new Set());
    useEffect(() => {
        selectAll(".line__chart--group").each(function () {
            const chartGroup = select(this);
            const path = chartGroup.select("path");
            const pathTotalLength = path.node().getTotalLength();
            const indicator = chartGroup.select(".indicator");
            path.interrupt()
                .attr("stroke-dasharray", pathTotalLength)
                .attr("stroke-dashoffset", pathTotalLength)
                .transition()
                .duration(1200)
                .ease(easeLinear)
                .attr("stroke-dashoffset", 0)
                .tween("pathTween", function () {
                    return function (t) {
                        const point = path
                            .node()
                            .getPointAtLength(pathTotalLength * t);
                        indicator.attr(
                            "transform",
                            `translate(${point.x},${point.y})`
                        );
                    };
                });
        });
    }, [data]);
    const dateScale = scaleTime()
        .domain(extent(data, (d) => new Date(d.date)))
        .range([0, innerWidth])
        .nice();
    const largestNumber = Math.max(...data.map((v) => v.maxCount));

    const yScale = scaleLinear()
        .domain([0, largestNumber])
        .range([innerHeight, 0]);

    const updateActivatedInquiry = (payload) => { 
        const currentInquiryList = new Set([...activatedInquiryType]);
        if (currentInquiryList.has(payload)) {
            currentInquiryList.delete(payload);
        } else {
            currentInquiryList.add(payload);
        }
        
        const sortedCurrentInquiryList = new Set([...currentInquiryList].sort())
        setActivatedInquiryType(sortedCurrentInquiryList);
    };

    const mouseOverHandler = (e) => {
        const overlay = overlayRef.current;
        if (!overlay) return;
        const [x] = pointer(e, overlay);
        setTooltipPos({
            x: e.clientX,
            y: e.clientY,
        });
        const x0 = dateScale.invert(x);
        const bisectDate = bisector((d) => new Date(d.date)).right;
        const index = bisectDate(data, x0, 1);
        const targetData = data[index - 1];

        let tempMap = {};
        if (activatedInquiryType.size === 0) {
            tempMap = { ...targetData };
            delete tempMap.maxCount;
            delete tempMap.totalCount;
        } else {
            tempMap.date = targetData.date;
            activatedInquiryType.forEach((element) => {
                if (element in targetData) {
                    tempMap[element] = targetData[element];
                }
            });
        }
        setTooltipData(tempMap);
    };

    const mouseOutHandler = () => {
        setTooltipData(null);
    };

    return (
        <>
            {data.length === 0 ? (
                <NoDataText innerWidth={innerWidth} innerHeight={innerHeight} />
            ) : (
                <>
                    <TimeSeriesXAxis
                        innerWidth={innerWidth}
                        innerHeight={innerHeight}
                        margin={margin}
                        dateScale={dateScale}
                        yScale={yScale}
                        data={data}
                        activatedInquiryType={activatedInquiryType}
                        inquiryTypeList={inquiryTypeList}
                        updateActivatedInquiry={updateActivatedInquiry}
                    />
                    <TimeSeriesYAxis
                        innerWidth={innerWidth}
                        innerHeight={innerHeight}
                        margin={margin}
                        yScale={yScale}
                        data={data}
                    />
                    <TimeSeriesLineChart
                        innerWidth={innerWidth}
                        innerHeight={innerHeight}
                        margin={margin}
                        dateScale={dateScale}
                        yScale={yScale}
                        inquiryTypeList={inquiryTypeList}
                        data={data}
                        activatedInquiryType={activatedInquiryType}
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
                        <>
                            <line
                                x1={dateScale(new Date(tooltipData.date))}
                                x2={dateScale(new Date(tooltipData.date))}
                                y1={0}
                                y2={innerHeight}
                                stroke="black"
                                strokeWidth={0.3}
                                shapeRendering="crispEdges"
                            ></line>
                            {inquiryTypeList
                                .filter((v) => activatedInquiryType.has(v.type))
                                .map((v) => (
                                    <circle
                                        key={v.type}
                                        fill={v.color}
                                        r={5}
                                        cx={dateScale(
                                            new Date(tooltipData.date)
                                        )}
                                        cy={yScale(tooltipData[v.type])}
                                    ></circle>
                                ))}
                        </>
                    )}

                </>
            )}
        </>
    );
};

export default TimeSeriesChartContainer;

import { timeFormat } from "d3";
import React from "react";

const XAxis = ({
    innerHeight,
    innerWidth,
    filteredData,
    dateScale,
    margin,
}) => {
    if (!dateScale) return;
    const xAxisTickFormat = timeFormat("%y/%m/%d");
    const tickSize = dateScale.ticks().length;
    const dataSize = filteredData.length;
    const tickCount = Math.min(dataSize, 8);
    const XScaleTicks = dateScale.ticks(tickCount);

    const isPerMonth =
        XScaleTicks[1] === undefined
            ? false
            : XScaleTicks[1].getTime() - XScaleTicks[0].getTime() > 2678300000;

    return (
        <>
            {XScaleTicks.map((tickValue, index) => {
                const [year, month, day] =
                    xAxisTickFormat(tickValue).split("/");
                const isTextIntersect =
                    Math.abs(
                        dateScale(
                            XScaleTicks[(index + 1 + tickSize) % tickSize]
                        ) -
                            dateScale(
                                XScaleTicks[(index + tickSize) % tickSize]
                            )
                    ) < 32;
                return (
                    <g
                        key={tickValue}
                        transform={`translate(${dateScale(tickValue)},0)`}
                    >
                        <line
                            x1={0}
                            x2={0}
                            y1={innerHeight}
                            y2={innerHeight + 5}
                            stroke="black"
                            strokeWidth={0.1}
                            shapeRendering="crispEdges"
                        ></line>
                        <text
                            className="text-[12px]"
                            y={innerHeight}
                            x={0}
                            dy={
                                !isTextIntersect
                                    ? "1.4em"
                                    : index % 2 === 0
                                    ? "2.4em"
                                    : "1.4em"
                            }
                            style={{ textAnchor: "middle" }}
                        >
                            {isPerMonth
                                ? `${year}.${month}`
                                : `${month}.${day}`}
                        </text>
                    </g>
                );
            })}
        </>
    );
};

export default XAxis;

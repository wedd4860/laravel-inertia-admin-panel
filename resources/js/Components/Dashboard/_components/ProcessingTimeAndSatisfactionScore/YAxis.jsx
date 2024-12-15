import React from "react";
import { getTimeToHMSFormat } from "@/Helper/date";
import { max } from "d3";

const YAxis = ({
    margin,
    filteredData,
    elapsedTimeScale,
    innerWidth,
    innerHeight,
}) => {
    const ticks = [];
    const interval = 8;
    const maxValue = Math.max(
        max(filteredData, (d) => d.avgElapsedTime),
        60 * 10
    );
    const rangeValue = maxValue / interval;

    for (let i = 0; i < interval + 1; i++) {
        ticks.push(rangeValue * i);
    }

    return (
        <>
            <line
                x1={0}
                x2={0}
                y1={0}
                y2={innerHeight}
                stroke="black"
                strokeWidth={0.1}
                shapeRendering="crispEdges"
            ></line>
            <text
                transform={`translate(${-margin.left},${innerHeight / 2})`}
                style={{ textAnchor: "middle", writingMode: "vertical-rl" }}
                dx=".3em"
                className="text-[12px]"
            >
                처리시간
            </text>
            {ticks.map((tickValue, index) => (
                <g
                    transform={`translate(0,${
                        elapsedTimeScale(tickValue) ?? 0
                    })`}
                    key={tickValue + "ticks-" + Math.random()}
                >
                    <line
                        x1={0}
                        x2={innerWidth}
                        y1={0}
                        y2={0}
                        stroke="black"
                        strokeWidth={0.1}
                        shapeRendering="crispEdges"
                    ></line>
                    {index % 2 === 0 && (
                        <text
                            className="text-[12px]"
                            style={{ textAnchor: "end" }}
                            dy=".3em"
                            dx="-.5em"
                        >
                            {getTimeToHMSFormat(tickValue).split(" ")[0]}
                        </text>
                    )}
                </g>
            ))}
        </>
    );
};

export default YAxis;

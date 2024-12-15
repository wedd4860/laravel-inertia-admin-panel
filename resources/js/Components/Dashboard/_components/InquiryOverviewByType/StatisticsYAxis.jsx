import React from "react";
import { commaSeparateNumber } from "@/Helper/numberFormat";

const StatisticsYAxis = ({ innerWidth, innerHeight, data, yScale, margin }) => {
    return (
        <>
            {yScale.ticks(5).map((tickValue, index) => (
                <g
                    transform={`translate(${-margin.left},${yScale(
                        tickValue
                    )})`}
                    key={index}
                >
                    <line
                        x1={-margin.left}
                        x2={innerWidth + margin.right}
                        stroke="black"
                        strokeWidth={0.1}
                        shapeRendering="crispEdges"
                    />
                    <text className="text-[12px]" dy="-.32em" x={0}>
                        {commaSeparateNumber(tickValue)}
                        {index === 0 && "건"}
                    </text>
                </g>
            ))}
        </>
    );
};

export default StatisticsYAxis;

import React from "react";
import { commaSeparateNumber } from "@/Helper/numberFormat";

const TimeSeriesYAxis = ({ innerWidth, innerHeight, margin, yScale, data }) => {
    const AxisStyle = {
        fontSize: "12px",
        textAnchor: "start",
    };
    return (
        <>
            {yScale.ticks(7).map((tickValue, index) => (
                <g key={tickValue}>
                    <g
                        key={index}
                        transform={`translate(${-margin.left},${yScale(
                            tickValue
                        )})`}
                    >
                        <line
                            x1={-margin.left}
                            x2={innerWidth + margin.right}
                            stroke="black"
                            strokeWidth={0.1}
                            shapeRendering="crispEdges"
                        />
                        <text style={AxisStyle} dy="-.32em">
                            {commaSeparateNumber(tickValue)}
                            {index === 0 && "건"}
                        </text>
                    </g>
                </g>
            ))}
        </>
    );
};

export default TimeSeriesYAxis;

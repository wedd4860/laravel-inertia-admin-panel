import React from "react";

const labelOffset = 20;
const tickRightMargin = 40;
const tickLeftOffset = 25;

const YAxis = ({ yScale, margin, innerHeight, innerWidth }) => {
    return (
        <g transform={`translate(${margin.left},${margin.top})`}>
            <text
                textAnchor="middle"
                transform={`rotate(-90) translate(${
                    -innerHeight / 2
                },-${labelOffset})`}
            >
                문의 개수
            </text>
            {yScale.ticks().map((tick) => (
                <g key={tick} transform={`translate(0,${yScale(tick)})`}>
                    <line
                        x1={margin.left}
                        x2={innerWidth - tickRightMargin}
                        y1={0}
                        y2={0}
                        stroke="#ccc"
                        strokeWidth={0.5}
                    />
                    <text y={0} x={tickLeftOffset} dy=".32em" textAnchor="end">
                        {tick}
                    </text>
                </g>
            ))}
        </g>
    );
};

export default YAxis;

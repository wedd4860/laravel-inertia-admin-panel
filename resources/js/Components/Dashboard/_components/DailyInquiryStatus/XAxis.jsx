import React from "react";

const labelOffset = 40;

const XAxis = ({ xScale, margin, innerWidth, innerHeight }) => {
    return (
        <g transform={`translate(${margin.left},${innerHeight + margin.top})`}>
            <text
                textAnchor="middle"
                transform={`translate(${innerWidth / 2}, ${labelOffset})`}
            >
                문의량
            </text>
            {xScale.ticks().map((tick) => {
                return (
                    <g
                        key={tick}
                        transform={`translate(${innerWidth - xScale(tick)},0)`}
                    >
                        <line
                            y1={0}
                            y2={-innerHeight}
                            stroke="#ccc"
                            strokeWidth={0.5}
                        />
                        <text y={0} dy=".32em" textAnchor="middle">
                            {tick}
                        </text>
                    </g>
                );
            })}
        </g>
    );
};

export default XAxis;

import React from "react";

const chartYOffset = 65;
const labelOffset = 25;

const XAxis = ({ dateScale, margin, innerWidth, innerHeight }) => {
    return (
        <g
            transform={`translate(${margin.left},${
                innerHeight + chartYOffset
            })`}
        >
            <text
                textAnchor="middle"
                transform={`translate(${innerWidth / 2}, ${labelOffset})`}
            >
                날짜
            </text>
            {dateScale.domain().map((date) => (
                <g
                    key={date}
                    transform={`translate(${labelOffset + dateScale(date)},0)`}
                >
                    <text textAnchor="middle">
                        {date.toLocaleDateString()}
                    </text>
                </g>
            ))}
        </g>
    );
};

export default XAxis;

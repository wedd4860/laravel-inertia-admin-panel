import React from "react";

const YAxis = ({
    innerHeight,
    innerWidth,
    margin,
    inquiryCountScale,
    filteredData,
}) => {
    return (
        <>
            {inquiryCountScale.ticks(4).map((data, index) => {
                return (
                    <g
                        key={data}
                        transform={`translate(${0},${inquiryCountScale(data)})`}
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
                        <text
                            className="text-[12px]"
                            dy="0.32em"
                            dx="-.5em"
                            style={{ textAnchor: "end" }}
                        >
                            {data}
                            {index === 0 && "건"}
                        </text>
                    </g>
                );
            })}
        </>
    );
};

export default YAxis;

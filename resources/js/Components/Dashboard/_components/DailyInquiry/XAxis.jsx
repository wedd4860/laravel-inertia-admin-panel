import React from "react";

const XAxis = ({
    innerHeight,
    innerWidth,
    margin,
    inquiryCountScale,
    filteredData,
}) => {
    return (
        <>
            <line
                x1={0}
                x2={innerWidth}
                y1={innerHeight}
                y2={innerHeight}
                stroke="black"
                strokeWidth={0.1}
                shapeRendering="crispEdges"
            ></line>
            {inquiryCountScale.ticks(4).map((data) => {
                return (
                    <g
                        transform={`translate(${inquiryCountScale(data)},0)`}
                        key={data}
                    >
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
                            y={innerHeight}
                            dy="1.3em"
                            className="text-[12px]"
                            style={{ textAnchor: "middle" }}
                        >
                            {data}
                        </text>
                    </g>
                );
            })}
        </>
    );
};

export default XAxis;

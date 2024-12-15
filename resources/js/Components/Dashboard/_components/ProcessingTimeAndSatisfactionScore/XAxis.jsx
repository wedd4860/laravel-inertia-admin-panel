import React from "react";

const XAxis = ({
    margin,
    filteredData,
    avgSatisfyRateScale,
    innerWidth,
    innerHeight,
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
            <text
                transform={`translate(${innerWidth / 2},${innerHeight})`}
                dy="2em"
                style={{ textAnchor: "middle" }}
                className="text-[12px]"
            >
                만족도
            </text>
            {avgSatisfyRateScale.ticks(12).map((tickValue, index) => (
                <g
                    key={tickValue}
                    transform={`translate(${avgSatisfyRateScale(
                        tickValue
                    )}, ${innerHeight})`}
                >
                    <line
                        x1={0}
                        x2={0}
                        y1={-innerHeight}
                        y2={0}
                        stroke="black"
                        strokeWidth={0.1}
                        shapeRendering="crispEdges"
                    ></line>
                    {(tickValue * 10) % 10 === 0 && (
                        <text
                            dy="1.4em"
                            className="text-[12px]"
                            style={{ textAnchor: "middle" }}
                        >
                            {tickValue}
                        </text>
                    )}
                </g>
            ))}
        </>
    );
};

export default XAxis;

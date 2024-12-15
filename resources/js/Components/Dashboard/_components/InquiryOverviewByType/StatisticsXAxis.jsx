import React from "react";

const StatisticsXAxis = ({
    innerWidth,
    innerHeight,
    data,
    xScale,
    xBandWidth,
    inquiryTypeList,
}) => {
    const bandWidth = Math.min(xBandWidth * 1, 30);
    return (
        <>
            {inquiryTypeList.map((v, index) => {
                return (
                    <g
                        transform={`translate(${xScale(
                            v.type
                        )},${innerHeight})`}
                        key={v.type}
                    >
                        {index === 0 && (
                            <line
                                x1={-bandWidth / 2}
                                x2={-bandWidth / 2}
                                y1={0}
                                y2={5}
                                stroke="black"
                                strokeWidth={0.2}
                                shapeRendering="crispEdges"
                            ></line>
                        )}
                        <foreignObject
                            style={{
                                textAnchor: "middle",
                            }}
                            x={-bandWidth / 2}
                            width={bandWidth * 2}
                            height={200}
                        >
                            <p
                                style={{
                                    fontSize: "12px",
                                    padding: "0px",
                                    wordBreak: "break-word",
                                    textAlign: "center",
                                }}
                            >
                                {v.type}
                            </p>
                        </foreignObject>
                        <line
                            x1={bandWidth + bandWidth / 2}
                            x2={bandWidth + bandWidth / 2}
                            y1={0}
                            y2={5}
                            stroke="black"
                            strokeWidth={0.2}
                            shapeRendering="crispEdges"
                        ></line>
                    </g>
                );
            })}
        </>
    );
};

export default StatisticsXAxis;

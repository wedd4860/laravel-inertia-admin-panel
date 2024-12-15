import React from "react";

const YAxis = ({
    innerHeight,
    innerWidth,
    margin,
    tooltipData,
    productScale,
    inquiryCountScale,
    filteredData,
    mouseMoveHandler,
    mouseOutHandler,
}) => {
    const barChartHeight = productScale.bandwidth();

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
            {productScale.domain().map((data) => {
                const targetData = filteredData.find(
                    (v) => v.category === data
                );

                return (
                    <g
                        transform={`translate(0,${productScale(data)})`}
                        key={data}
                        className="select-none cursor-pointer transition-all duration-100"
                        onMouseMove={mouseMoveHandler(targetData)}
                        onMouseLeave={mouseOutHandler}
                        opacity={
                            !tooltipData
                                ? 1
                                : tooltipData.category === data
                                ? 1
                                : 0.3
                        }
                    >
                        <rect
                            width={inquiryCountScale(targetData.totalInquiries)}
                            height={barChartHeight}
                            className="fill-gray-300 transition-all duration-500"
                        ></rect>
                        <rect
                            width={inquiryCountScale(
                                targetData.processedInquiries
                            )}
                            height={barChartHeight}
                            className="fill-blue-400  transition-all duration-500"
                        ></rect>
                        <text
                            x={0}
                            y={barChartHeight / 2}
                            dx="-.3em"
                            dy=".3em"
                            className="text-[12px]"
                            style={{ textAnchor: "end" }}
                        >
                            {data}
                        </text>
                    </g>
                );
            })}
        </>
    );
};

export default YAxis;

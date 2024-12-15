import React from "react";

const XAxis = ({
    innerHeight,
    innerWidth,
    margin,
    inquiryCountScale,
    dateScale,
    filteredData,
    mouseMoveHandler,
    mouseOutHandler,
    tooltipData,
}) => {
    const outerBarChartWidth = dateScale.bandwidth();
    const barChartPadding = outerBarChartWidth * 0.15;
    const innerBarChartWidth = (outerBarChartWidth - barChartPadding * 2) / 3;
    const innerBarChartPadding = 2;

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
            {dateScale.domain().map((date, index) => {
                const target = filteredData.find((v) => v.date === date);
                const isLastIndex = dateScale.domain().length - 1 === index;

                return (
                    <g
                        className="transition-all duration-150 cursor-pointer"
                        key={index}
                        transform={`translate(${dateScale(date)},0)`}
                        onMouseMove={mouseMoveHandler(target)}
                        onMouseLeave={mouseOutHandler}
                        opacity={
                            !tooltipData
                                ? 1
                                : tooltipData.date === date
                                ? 1
                                : 0.3
                        }
                    >
                        <line
                            x1={0}
                            x2={0}
                            y1={innerHeight}
                            y2={innerHeight + 10}
                            stroke="black"
                            strokeWidth={0.1}
                            shapeRendering="crispEdges"
                        ></line>
                        {isLastIndex && (
                            <line
                                x1={outerBarChartWidth}
                                x2={outerBarChartWidth}
                                y1={innerHeight}
                                y2={innerHeight + 10}
                                stroke="black"
                                strokeWidth={0.1}
                                shapeRendering="crispEdges"
                            ></line>
                        )}
                        <text
                            dy="1.3em"
                            x={outerBarChartWidth / 2}
                            y={innerHeight}
                            className="text-[12px]"
                            style={{ textAnchor: "middle" }}
                        >
                            {date.slice(2)}
                        </text>
                        <rect
                            className="fill-gray-400 transition-all duration-200"
                            x={barChartPadding + innerBarChartPadding}
                            y={inquiryCountScale(target.totalInquiries)}
                            height={
                                innerHeight -
                                inquiryCountScale(target.totalInquiries)
                            }
                            width={innerBarChartWidth - innerBarChartPadding}
                        ></rect>
                        <rect
                            className="fill-blue-400 transition-all duration-200"
                            x={
                                barChartPadding +
                                innerBarChartWidth +
                                innerBarChartPadding
                            }
                            y={inquiryCountScale(target.processedInquiries)}
                            width={innerBarChartWidth - innerBarChartPadding}
                            height={
                                innerHeight -
                                inquiryCountScale(target.processedInquiries)
                            }
                        ></rect>
                        <rect
                            className="fill-red-400 transition-all duration-200"
                            x={
                                barChartPadding +
                                innerBarChartWidth * 2 +
                                innerBarChartPadding
                            }
                            y={inquiryCountScale(target.unprocessedInquiries)}
                            height={
                                innerHeight -
                                inquiryCountScale(target.unprocessedInquiries)
                            }
                            width={innerBarChartWidth - innerBarChartPadding}
                        ></rect>
                    </g>
                );
            })}
        </>
    );
};

export default XAxis;

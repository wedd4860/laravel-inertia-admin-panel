import { commaSeparateNumber } from "@/Helper/numberFormat";
import { timeFormat } from "d3";
import React from "react";

const TimeSeriesXAxis = ({
    innerWidth,
    innerHeight,
    margin,
    dateScale,
    data,
    inquiryTypeList,
    updateActivatedInquiry,
    activatedInquiryType,
}) => {
    if (!dateScale) return;
    const xAxisTickFormat = timeFormat("%y/%m/%d");
    const tickSize = dateScale.ticks().length;
    const dataSize = data.length;
    const tickCount = Math.min(dataSize, 8);
    const XScaleTicks = dateScale.ticks(tickCount);
    const labelOuterPadding = 100;
    const labelWidth =
        (innerWidth - labelOuterPadding) / inquiryTypeList.length;
    const labelInnerPadding = labelOuterPadding / inquiryTypeList.length;

    const isPerMonth =
        XScaleTicks[1] === undefined
            ? false
            : XScaleTicks[1].getTime() - XScaleTicks[0].getTime() > 2678300000;
    return (
        <>
            {XScaleTicks.map((tickValue, index) => {
                const [year, month, day] =
                    xAxisTickFormat(tickValue).split("/");
                const isTextIntersect =
                    Math.abs(
                        dateScale(
                            XScaleTicks[(index + 1 + tickSize) % tickSize]
                        ) -
                            dateScale(
                                XScaleTicks[(index + tickSize) % tickSize]
                            )
                    ) < 32;
                return (
                    <g
                        key={tickValue}
                        transform={`translate(${dateScale(tickValue)},0)`}
                    >
                        <line
                            x1={0}
                            x2={0}
                            y1={innerHeight}
                            y2={innerHeight + 5}
                            stroke="black"
                            strokeWidth={0.1}
                            shapeRendering="crispEdges"
                        ></line>
                        <text
                            className="text-[12px]"
                            y={innerHeight}
                            x={0}
                            dy={
                                !isTextIntersect
                                    ? "1.4em"
                                    : index % 2 === 0
                                    ? "2.4em"
                                    : "1.4em"
                            }
                            style={{ textAnchor: "middle" }}
                        >
                            {isPerMonth
                                ? `${year}.${month}`
                                : `${month}.${day}`}
                        </text>
                    </g>
                );
            })}
            {inquiryTypeList.map((inquiry, index) => (
                <g
                    key={inquiry.type}
                    className="cursor-pointer select-none"
                    transform={`translate(${
                        (labelWidth + labelInnerPadding) * index
                    },${innerHeight + 8})`}
                    opacity={
                        activatedInquiryType.size === 0
                            ? 1
                            : activatedInquiryType.has(inquiry.type)
                            ? 1
                            : 0.3
                    }
                    onClick={() => updateActivatedInquiry(inquiry.type)}
                >
                    <circle
                        r={8}
                        cx={(labelWidth + 3) / 2}
                        cy={24}
                        fill={inquiry.color}
                    ></circle>
                    <foreignObject width={labelWidth} height={50} y={36}>
                        <p
                            style={{
                                lineHeight: "11px",
                                fontSize: "10px",
                                margin: "0 auto",
                                letterSpacing: "-2px",
                                wordBreak: "break-word",
                                textAlign: "center",
                            }}
                        >
                            {inquiry.type}
                        </p>
                    </foreignObject>
                </g>
            ))}
        </>
    );
};

export default TimeSeriesXAxis;

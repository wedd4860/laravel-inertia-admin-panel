import { line } from "d3";
import React from "react";
const TimeSeriesLineChart = ({
    innerWidth,
    innerHeight,
    margin,
    dateScale,
    yScale,
    inquiryTypeList,
    data,
    activatedInquiryType,
}) => {
    return (
        <>
            {inquiryTypeList.map((inquiry, index) => (
                <g
                    key={inquiry.type}
                    className="line__chart--group transition-opacity duration-200 ease-linear"
                    transform="translate(0,0)"
                    opacity={
                        activatedInquiryType.size === 0
                            ? 1
                            : activatedInquiryType.has(inquiry.type)
                            ? 1
                            : 0.03
                    }
                >
                    <path
                        fill="none"
                        stroke={inquiry.color}
                        shapeRendering="geometricPrecision"
                        d={line()
                            .x((d) => dateScale(new Date(d.date)))
                            .y((d) => yScale(d[inquiry.type]))(data)}
                    />
                    <g
                        className="indicator"
                        transform={`translate(${dateScale(
                            new Date(data[data.length - 1].date)
                        )}, ${yScale(data[data.length - 1][inquiry.type])})`}
                    >
                        <circle fill={inquiry.color} r={5} />
                        {/* <text
                            fill="black"
                            dy="-0.8em"
                            style={{ textAnchor: "end", fontSize: "12px" }}
                        >
                            {inquiry.type}
                        </text> */}
                    </g>
                </g>
            ))}
        </>
    );
};

export default TimeSeriesLineChart;

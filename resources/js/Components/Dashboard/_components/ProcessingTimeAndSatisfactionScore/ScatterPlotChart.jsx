import React, { useState } from "react";

const ScatterPlotChart = ({
    margin,
    filteredData,
    avgSatisfyRateScale,
    elapsedTimeScale,
    inquiryCountScale,
    gameColorMap,
    innerWidth,
    innerHeight,
    tooltipData,
    mouseMoveHandler,
    mouseOutHandler,
}) => {
    return (
        <>
            {filteredData
                .sort((a, b) => b.inquiryCount - a.inquiryCount)
                .map((data, index) => (
                    <circle
                        className="cursor-pointer hover:opacity-80 transition-all duration-300"
                        onMouseMove={mouseMoveHandler(data)}
                        onMouseLeave={mouseOutHandler}
                        key={data.category}
                        fill={gameColorMap[data.category] ?? "orange"}
                        stroke="gray"
                        strokeWidth={1}
                        opacity={!!tooltipData ? 0.25 : 0.5}
                        cy={elapsedTimeScale(data.avgElapsedTime)}
                        cx={avgSatisfyRateScale(data.avgSatisfyRate)}
                        r={inquiryCountScale(data.inquiryCount)}
                    ></circle>
                ))}
        </>
    );
};

export default ScatterPlotChart;

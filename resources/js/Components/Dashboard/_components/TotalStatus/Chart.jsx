import { line } from "d3";
import React from "react";

const Chart = ({ filteredData, dateScale, activatedLegend }) => {
    if (!dateScale) return;
    if (!activatedLegend) return;
    const existingDataArray = filteredData.filter((d) => activatedLegend.accessor(d) > 0);
    
    return (
        <>
            <path
                fill="none"
                strokeWidth={2}
                className="stroke-gray-400"
                shapeRendering="geometricPrecision"
                d={line()
                    .x((d) => dateScale(new Date(d.date)))
                    .y((d) =>
                        activatedLegend.scale(activatedLegend.accessor(d))
                    )(filteredData)}
            />
            {existingDataArray.map((d) => (
                <circle
                    key={d.date}
                    className="fill-blue-500 indicatorCircle"
                    cx={dateScale(new Date(d.date))}
                    cy={activatedLegend.scale(activatedLegend.accessor(d))}
                    r={2}
                />
            ))}
        </>
    );
};

export default Chart;

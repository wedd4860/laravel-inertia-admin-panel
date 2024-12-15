import React from "react";

const TooltipIndicator = ({
    tooltipData,
    dateScale,
    activatedLegend,
    innerHeight,
}) => {
    return (
        <>
            <line
                strokeWidth={1}
                stroke="#ccc"
                fill="#ccc"
                x1={dateScale(new Date(tooltipData.date))}
                y1={0}
                x2={dateScale(new Date(tooltipData.date))}
                y2={innerHeight}
                shapeRendering="crispEdges"
            ></line>
            {activatedLegend && (
                <circle
                    className="fill-blue-500"
                    cx={dateScale(new Date(tooltipData.date))}
                    cy={activatedLegend.scale(
                        activatedLegend.accessor(tooltipData)
                    )}
                    r={activatedLegend.isShow ? 4 : 0}
                ></circle>
            )}
        </>
    );
};

export default TooltipIndicator;

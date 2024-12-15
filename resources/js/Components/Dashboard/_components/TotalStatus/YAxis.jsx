import React from "react";

const YAxis = ({ innerWidth, innerHeight, activatedLegend, margin }) => {
    if (!activatedLegend) return;
    const AxisStyle = {
        fontSize: "12px",
        textAnchor: "start",
    };
    return (
        <>
            {activatedLegend.scale
                .ticks(activatedLegend.ticks)
                .map((tickValue, index) => (
                    <g
                        className="yAxis"
                        key={index}
                        data-height-value={activatedLegend.scale(tickValue)}
                        transform={`translate(${-margin.left},${activatedLegend.scale(
                            tickValue
                        )})`}
                    >
                        <line
                            x1={-margin.left}
                            x2={innerWidth}
                            stroke="black"
                            strokeWidth={0.1}
                            shapeRendering="crispEdges"
                        />
                        <text
                            style={AxisStyle}
                            x={-margin.left}
                            dx="5px"
                            dy="-.32em"
                        >
                            {activatedLegend.formatter(tickValue)}
                            {index === 0 ? activatedLegend.unit : ""}
                        </text>
                    </g>
                ))}
        </>
    );
};

export default YAxis;

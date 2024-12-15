import React from "react";

const StatisticsBarChart = ({
    innerHeight,
    data,
    xScale,
    xBandWidth,
    yScale,
    setTooltipData,
    setTooltipPos,
    tooltipData
}) => {
    const mouseOutHandler = () => {
        setTooltipData(null);
    };
    const mouseOverHandler = (e, { count, type, processedCount }) => {
        setTooltipPos({
            x: e.clientX,
            y: e.clientY,
        });
        setTooltipData({ type, count, processedCount });
    };
    return (
        <>
            {data.map((d) => (
                <g 
                    key={d.inquiry_type}
                    onMouseMove={(e) =>
                        mouseOverHandler(e, {
                            count: d.count,
                            type: d.inquiry_type,
                            processedCount: d.processedCount
                        })
                    }
                    onMouseLeave={mouseOutHandler}
                    opacity={
                        !tooltipData
                        ? 1
                        : tooltipData.type === d.inquiry_type
                        ? 1
                        : 0.3
                    }
                >
                    <rect
                        className="bar cursor-pointer"
                        fill="#D0D5E8"
                        x={xScale(d.inquiry_type)}
                        y={yScale(d.count)}
                        data-y={yScale(d.count)}
                        height={innerHeight - yScale(d.count)}
                        data-height={innerHeight - yScale(d.count)}
                        width={Math.min(xBandWidth, 30)}
                        shapeRendering="crispEdges"
                        data-type={d.inquiry_type} 
                    />
                    <rect
                        className="bar cursor-pointer"
                        fill="#76BBFF"
                        x={xScale(d.inquiry_type)}
                        y={yScale(d.processedCount)}
                        data-y={yScale(d.processedCount)}
                        height={innerHeight - yScale(d.processedCount)}
                        data-height={innerHeight - yScale(d.processedCount)}
                        width={Math.min(xBandWidth, 30)}
                        shapeRendering="crispEdges"
                        data-type={d.inquiry_type}
                    />
                </g>
            ))}
        </>
    );
};

export default StatisticsBarChart;

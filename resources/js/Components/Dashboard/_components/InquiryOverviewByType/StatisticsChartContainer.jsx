import { easeLinear, max, scaleBand, scaleLinear, select, selectAll } from "d3";
import React, { useEffect } from "react";
import StatisticsBarChart from "./StatisticsBarChart";
import StatisticsXAxis from "./StatisticsXAxis";
import StatisticsYAxis from "./StatisticsYAxis";
import NoDataText from "../NoDataText";

const StatisticsChartContainer = ({
    innerWidth,
    innerHeight,
    margin,
    data,
    inquiryTypeList,
    setTooltipData,
    setTooltipPos,
    tooltipData,
}) => {
    useEffect(() => {
        selectAll(".bar")
            .interrupt()
            .attr("y", innerHeight)
            .attr("height", 0)
            .transition()
            .duration(300)
            .ease(easeLinear)
            .attr("y", function () {
                return select(this).attr("data-y") * 1;
            })
            .attr("height", function () {
                return select(this).attr("data-height") * 1;
            });
    }, [data]);

    const xScale = scaleBand()
        .domain(inquiryTypeList.map((v) => v.type))
        .range([0, innerWidth])
        .paddingInner(0.3)
        .paddingOuter(0.5);

    const bandWidth = xScale.bandwidth();

    const yScale = scaleLinear()
        .domain([0, max(data, (d) => d.count)])
        .range([innerHeight, 0])
        .nice();

    return (
        <>
            {data.length === 0 ? (
                <NoDataText innerWidth={innerWidth} innerHeight={innerHeight} />
            ) : (
                <>
                    <StatisticsXAxis
                        inquiryTypeList={inquiryTypeList}
                        innerWidth={innerWidth}
                        innerHeight={innerHeight}
                        data={data}
                        xScale={xScale}
                        xBandWidth={bandWidth}
                    />
                    <StatisticsYAxis
                        innerWidth={innerWidth}
                        innerHeight={innerHeight}
                        margin={margin}
                        data={data}
                        yScale={yScale}
                    />
                    <StatisticsBarChart
                        innerHeight={innerHeight}
                        data={data}
                        xScale={xScale}
                        xBandWidth={bandWidth}
                        yScale={yScale}
                        setTooltipData={setTooltipData}
                        setTooltipPos={setTooltipPos} 
                        tooltipData={tooltipData}
                    />
                </>
            )}
        </>
    );
};

export default StatisticsChartContainer;

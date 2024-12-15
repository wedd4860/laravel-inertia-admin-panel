import React, { useEffect, useState } from "react";
import XAxis from "./_components/WeeklyInquiryGraph/XAxis";
import YAxis from "./_components/WeeklyInquiryGraph/YAxis";
import Bar from "./_components/WeeklyInquiryGraph/Bar";
import Line from "./_components/WeeklyInquiryGraph/Line";
import { max, groups, scaleBand, scaleLinear } from "d3";
import Legend from "./_components/WeeklyInquiryGraph/Legend";
import jsonData from "./_components/WeeklyInquiryGraph/0613_0619_weeklyInquiryStatusData.json";

const filterFunc = (d) => {
    d.date = new Date(d.date);
    d.input = +d.input;
    d.proc = +d.proc;
    d.remain = +d.remain;
    d.progress = +d.progress;
    return d;
};
const WeeklyInquiryGraph = () => {
    const [hoveringType, setHoveringType] = useState(null);
    const [lineChartVisible, setLineChartVisible] = useState(true);
    const [weeklyInquiryData, setWeeklyInquiryData] = useState(null);
    const width = 800;
    const height = 500;
    const margin = { top: 20, right: 80, bottom: 80, left: 40 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    useEffect(() => {
        const filtered = jsonData.map(filterFunc);
        setWeeklyInquiryData(filtered);
    }, []);

    if (weeklyInquiryData === null) return <div>Loading...</div>;

    const preProcessedData = weeklyInquiryData
        .map((v) => {
            const temp = [];
            const keys = Object.keys(v).slice(1);
            keys.forEach((key) => {
                temp.push({
                    date: v.date,
                    type: key,
                    value: v[key],
                });
            });
            return temp;
        })
        .flat();

    const groupData = groups(
        preProcessedData.filter((v) => v.type !== "progress"),
        (d) => d.date
    );
    const progressData = preProcessedData.filter((v) => v.type === "progress");

    const columns = Object.keys(weeklyInquiryData[0]).slice(1, 4);
    const types = columns;

    const dateScale = scaleBand()
        .domain(groupData.map((d) => d[0]))
        .rangeRound([0, innerWidth])
        .padding(0.3);

    const typeScale = scaleBand()
        .domain(types)
        .range([0, dateScale.bandwidth()])
        .padding(0.05);

    const yScale = scaleLinear()
        .domain([0, max(preProcessedData, (d) => d.value)])
        .range([innerHeight, 0])
        .nice();

    const progressScale = scaleLinear()
        .domain([0, 100])
        .range([innerHeight, margin.top]);

    const colorMap = {
        input: "#4285F4",
        proc: "#EA4335",
        remain: "#FBBC04",
        progress: "#34A853",
    };

    return (
        <div className="my-3">
            <h1 className="text-2xl font-black mb-5">일별 문의처리 그래프</h1>
            <svg width={width} height={height}>
                <XAxis
                    dateScale={dateScale}
                    margin={margin}
                    innerWidth={innerWidth}
                    innerHeight={innerHeight}
                />
                <YAxis
                    yScale={yScale}
                    margin={margin}
                    innerWidth={innerWidth}
                    innerHeight={innerHeight}
                />
                <Legend
                    innerWidth={innerWidth}
                    innerHeight={innerHeight}
                    data={types}
                    colorMap={colorMap}
                    setHoveringType={setHoveringType}
                    lineChartVisible={lineChartVisible}
                    setLineChartVisible={setLineChartVisible}
                />
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <Bar
                        groupData={groupData}
                        yScale={yScale}
                        typeScale={typeScale}
                        dateScale={dateScale}
                        innerHeight={innerHeight}
                        colorMap={colorMap}
                        hoveringType={hoveringType}
                    />
                    {lineChartVisible && (
                        <Line
                            data={progressData}
                            dateScale={dateScale}
                            progressScale={progressScale}
                            lineChartVisible={lineChartVisible}
                            colorMap={colorMap}
                        />
                    )}
                </g>
            </svg>
        </div>
    );
};

export default WeeklyInquiryGraph;

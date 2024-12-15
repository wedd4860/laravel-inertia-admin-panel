import { max, scaleBand, scaleLinear } from "d3";
import React, { useState } from "react";
import Bar from "./_components/DailyInquiryStatus/Bar";
import YAxis from "./_components/DailyInquiryStatus/YAxis";
import XAxis from "./_components/DailyInquiryStatus/XAxis";

const DailyInquiryStatus = () => {
    const [hoveringType, setHoveringType] = useState(null);
    const width = 800;
    const height = 500;
    const margin = { top: 40, right: 20, bottom: 60, left: 110 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const dailyInquiryDataPerGames = [
        {
            title: "DK 온라인",
            value: 23,
        },
        {
            title: "DK 글로벌",
            value: 1,
        },
        {
            title: "프리톤테일",
            value: 108,
        },
        {
            title: "콜오브카오스",
            value: 7,
        },
        {
            title: "라그라임",
            value: 63,
        },
        {
            title: "에이스 온라인",
            value: 0,
        },
        {
            title: "건즈",
            value: 14,
        },
        {
            title: "출조 낚시왕",
            value: 2,
        },
        {
            title: "스키드러쉬",
            value: 0,
        },
        {
            title: "능력자X",
            value: 0,
        },
        {
            title: "아스다 온라인",
            value: 3,
        },
        {
            title: "마이크로볼츠",
            value: 17,
        },
        {
            title: "아케인M",
            value: 0,
        },
    ];

    const yScale = scaleBand()
        .domain(dailyInquiryDataPerGames.map((v) => v.title))
        .range([0, innerHeight])
        .padding(0.2);

    const xScale = scaleLinear()
        .domain([0, max(dailyInquiryDataPerGames, (d) => d.value)])
        .range([innerWidth, 0])
        .nice();

    return (
        <div className="my-3">
            <h1 className="text-2xl font-black mb-5">금일 신규 문의접수</h1>
            <svg width={width} height={height}>
                <XAxis
                    xScale={xScale}
                    margin={margin}
                    innerWidth={innerWidth}
                    innerHeight={innerHeight}
                />
                <YAxis
                    yScale={yScale}
                    margin={margin}
                    innerWidth={innerWidth}
                    innerHeight={innerHeight}
                    setHoveringType={setHoveringType}
                />
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <Bar
                        data={dailyInquiryDataPerGames}
                        xScale={xScale}
                        yScale={yScale}
                        margin={margin}
                        innerWidth={innerWidth}
                        innerHeight={innerHeight}
                        setHoveringType={setHoveringType}
                        hoveringType={hoveringType}
                    />
                </g>
            </svg>
        </div>
    );
};

export default DailyInquiryStatus;

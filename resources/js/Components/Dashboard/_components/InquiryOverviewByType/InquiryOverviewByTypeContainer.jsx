import { useSvgContainer } from "@/Hooks/useSvgContainer";
import React, { useEffect, useMemo, useState } from "react";
import TypeToggleButtons from "./TypeToggleButtons";
import { useFetchStatistics } from "@/Hooks/useFetchStatistics";
import { formatDateLocal } from "@/Helper/date";
import {
    getKeyListFromData,
    groupDataByKeyValue,
    transformData,
} from "@/Helper/utils";
import GameSelector from "./../GameSelector";
import DateSelector from "./../DateSelector";
import StatisticsChartContainer from "./StatisticsChartContainer";
import TimeSeriesChartContainer from "./TimeSeriesChartContainer";
import { useTooltip } from "@/Hooks/useTooltip";
import { commaSeparateNumber } from "@/Helper/numberFormat";
import { StatisticsTooltipCard } from "./StatisticsTooltipCard";
import { TimeSeriesChartTooltipCard } from "./TimSeriesChartTooltipCard";

const colorSet = [
    "#FF5733", // Red
    "#33FF57", // Green
    "#3357FF", // Blue
    "#FF33A1", // Pink
    "#33FFF5", // Cyan
    "#FFB533", // Orange
    "#A133FF", // Purple
    "#33FFB5", // Light Green
    "#5733FF", // Indigo
    "#FF33D4", // Magenta
    "#A1FF33", // Lime
    "#33A1FF", // Light Blue
];

const currentTime = new Date().getTime();
const weekInterval = 6 * 24 * 60 * 60 * 1000;
const initStart = formatDateLocal(new Date(currentTime - weekInterval));
const initEnd = formatDateLocal(new Date(currentTime));
const margin = {
    top: 20,
    right: 15,
    bottom: 65,
    left: 20,
};

const InquiryOverviewByTypeContainer = () => {
    const { svgContainerRef, svgWidth, svgHeight } = useSvgContainer();
    const [timeSeriesFilteredData, setTimeSeriesFilteredData] = useState([]);
    const [statisticsFilteredData, setStatisticsFilteredData] = useState([]);
    const [selectedGame, setSelectedGame] = useState("");
    const [calendarDate, setCalendarDate] = useState({
        start: initStart,
        end: initEnd,
    });
    const { fetchedData, fetchData } = useFetchStatistics(
        calendarDate.start,
        calendarDate.end
    );
    const [graphType, setGraphType] = useState("stat");
    const gameList = useMemo(
        () => getKeyListFromData(fetchedData, "product"),
        [fetchedData]
    );
    const { 
        tooltipPos,
        tooltipData,
        setTooltipData,
        setTooltipPos,
        overlayRef
         } = useTooltip();
    const inquiryTypeList = useMemo(
        () =>
            getKeyListFromData(fetchedData, "inquiry_type").map(
                (data, index) => {
                    return {
                        type: data,
                        color: colorSet[index],
                    };
                }
            ),
        [fetchedData]
    );

    const innerWidth = svgWidth - margin.left - margin.right;
    const innerHeight = svgHeight - margin.top - margin.bottom;

    const statisticsTransformer = (data, key) => {
        const valueArray = data[key];    
        const processedInquiries = valueArray.filter(
            (v) => v.inquiry_status === "답변완료"
        );
        return {
            inquiry_type: key,
            count: valueArray.length,
            processedCount: processedInquiries.length
        };
    };
    
    const timeSeriesTransformer = (data, key) => {
        const valueArray = data[key];
        const tempInquiryCountMap = new Map(
            inquiryTypeList.map((inquiry_type) => [inquiry_type.type, 0])
        );
        valueArray.forEach(({ inquiry_type }) => {
            tempInquiryCountMap.set(
                inquiry_type,
                tempInquiryCountMap.get(inquiry_type) + 1
            );
        });
        return {
            ...Object.fromEntries(tempInquiryCountMap),
            date: key,
            totalCount: valueArray.length,
            maxCount: Math.max(...tempInquiryCountMap.values()),
        };
    };

    useEffect(() => {
        setSelectedGame("");
        const groupedDataByInquiryType = groupDataByKeyValue(
            fetchedData,
            "inquiry_type"
        );
        const transformedByInquiryType = transformData(
            groupedDataByInquiryType,
            (key) => statisticsTransformer(groupedDataByInquiryType, key)
        );

        const groupedDataByDate = groupDataByKeyValue(fetchedData, "reg_date");
        const transformedByDate = transformData(groupedDataByDate, (key) =>
            timeSeriesTransformer(groupedDataByDate, key)
        );
        
        
        setStatisticsFilteredData(transformedByInquiryType);
        setTimeSeriesFilteredData(transformedByDate);
    }, [fetchedData]);

    useEffect(() => {
        const gameFilterFunc = (data) =>
            selectedGame === "" ? true : data.product === selectedGame;
        const fetchedDataFilteredByGame = fetchedData.filter(gameFilterFunc);

        const groupedDataByInquiryType = groupDataByKeyValue(
            fetchedDataFilteredByGame,
            "inquiry_type"
        );
        const transformedByInquiryType = transformData(
            groupedDataByInquiryType,
            (key) => statisticsTransformer(groupedDataByInquiryType, key)
        );

        const groupedDataByDate = groupDataByKeyValue(
            fetchedDataFilteredByGame,
            "reg_date"
        );
        const transformedByDate = transformData(groupedDataByDate, (key) =>
            timeSeriesTransformer(groupedDataByDate, key)
        );

        setStatisticsFilteredData(transformedByInquiryType);
        setTimeSeriesFilteredData(transformedByDate);
    }, [selectedGame]);

    const typeToggleHandler = (payload) => {
        if (payload === "time") {
            setGraphType("time");
        } else if (payload === "stat") {
            setGraphType("stat");
        }
    };
    const gameSelectHandler = (e) => {
        setSelectedGame(e.target.value);
    };
    const dateSelectHandler = (dates) => {
        const [start, end] = dates;

        setCalendarDate({
            start: start ? new Date(formatDateLocal(start)) : null,
            end: end ? new Date(formatDateLocal(end)) : null,
        });

        if (!!start && !!end) {
            fetchData(formatDateLocal(start), formatDateLocal(end));
        }
    };

    return (
        <div className="col-span-1 rounded-sm h-[480px] p-5 bg-white box-border flex flex-col relative">
            <h1 className="font-bold text-[18px]">유형별 문의 현황</h1>

            <div className="flex flex-wrap py-3 relative">
                <TypeToggleButtons
                    graphType={graphType}
                    typeToggleHandler={typeToggleHandler}
                />
                <GameSelector
                    selectedGame={selectedGame}
                    gameList={gameList}
                    gameSelectHandler={gameSelectHandler}
                />
                <span className="ml-auto">
                    <DateSelector
                        calendarDate={calendarDate}
                        dateSelectHandler={dateSelectHandler}
                    />
                </span>
            </div>
            <div
                ref={svgContainerRef}
                className="flex-1 w-full h-full rounded-sm"
            > 
                <>
                    {svgWidth > 0 && (
                        <svg width={svgWidth} height={svgHeight}>
                            <g
                                transform={`translate(${margin.left},${margin.top})`}
                            >
                                {graphType === "stat" ? (
                                    <StatisticsChartContainer
                                        inquiryTypeList={inquiryTypeList}
                                        innerWidth={innerWidth}
                                        innerHeight={innerHeight}
                                        margin={margin}
                                        data={statisticsFilteredData}
                                        tooltipData={tooltipData}
                                        setTooltipData={setTooltipData}
                                        setTooltipPos={setTooltipPos} 
                                    />
                                ) : (
                                    <TimeSeriesChartContainer
                                        inquiryTypeList={inquiryTypeList}
                                        innerWidth={innerWidth}
                                        innerHeight={innerHeight}
                                        margin={margin}
                                        data={timeSeriesFilteredData}
                                        tooltipData={tooltipData}
                                        setTooltipData={setTooltipData}
                                        setTooltipPos={setTooltipPos} 
                                        tooltipPos={tooltipPos}
                                        overlayRef={overlayRef}
                                    />
                                )}
                            </g>
                        </svg>     
                    )}
                    {tooltipData && (
                        graphType === "stat" ? (
                            statisticsFilteredData.length > 0 && (
                                <StatisticsTooltipCard
                                    tooltipData={tooltipData}
                                    tooltipPos={tooltipPos}
                                />
                                )
                            )
                            : ( timeSeriesFilteredData.length > 0  && (
                                <TimeSeriesChartTooltipCard
                                    inquiryTypeList={inquiryTypeList}
                                    tooltipData={tooltipData}
                                    tooltipPos={tooltipPos}
                                    colorSet={colorSet}
                                />
                                )
                            )
                        )
                    }
                </>
                
            </div>
        </div>
    );
};

export default InquiryOverviewByTypeContainer;

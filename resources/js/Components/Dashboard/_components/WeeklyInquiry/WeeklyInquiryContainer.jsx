import { formatDateLocal, getWeekDays } from "@/Helper/date";
import { groupDataByKeyValue, transformData } from "@/Helper/utils";
import { useFetchStatistics } from "@/Hooks/useFetchStatistics";
import { useSvgContainer } from "@/Hooks/useSvgContainer";
import { max, scaleBand, scaleLinear } from "d3";
import React, { useEffect, useState } from "react";
import XAxis from "./XAxis";
import YAxis from "./YAxis";
import NoDataText from "../NoDataText";
import { useTooltip } from "@/Hooks/useTooltip";
import TooltipCard from "../TooltipCard";
import { commaSeparateNumber } from "@/Helper/numberFormat";
import ChevronLeft from "@/Components/Icon/ChevronLeft";
import ChevronRight from "@/Components/Icon/ChevronRight";
import DateSelector from "./../DateSelector";
const currentTime = new Date().getTime();
const initWeekDays = getWeekDays(currentTime);
const debounceTime = 160;

const WeeklyInquiryContainer = () => {
    const { svgContainerRef, svgHeight, svgWidth } = useSvgContainer();
    const [calendarDate, setCalendarDate] = useState({
        start: initWeekDays[0],
        end: initWeekDays[6],
    });
    const [currentWeekDays, setCurrentWeekDays] = useState(initWeekDays);
    const { fetchedData, fetchData } = useFetchStatistics(
        calendarDate.start,
        calendarDate.end
    );
    const [timeoutId, setTimeoutId] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    const margin = {
        top: 14,
        right: 25,
        bottom: 30,
        left: 35,
    };
    const { setTooltipPos, tooltipPos, tooltipData, setTooltipData } =
        useTooltip();

    const mouseMoveHandler = (data) => (event) => {
        const x = event.clientX;
        const y = event.clientY;
        setTooltipData(data);
        setTooltipPos({ x, y });
    };

    const mouseOutHandler = () => {
        setTooltipData(null);
    };

    const innerWidth = svgWidth - margin.left - margin.right;
    const innerHeight = svgHeight - margin.top - margin.bottom;

    const dateScale = scaleBand()
        .domain(filteredData.map((v) => v.date))
        .range([0, innerWidth]);

    const inquiryCountScale = scaleLinear()
        .domain([
            0,
            Math.max(
                max(filteredData, (d) => d.totalInquiries),
                10
            ),
        ])
        .range([innerHeight, 0])
        .nice();

    const transformer = (data, key) => {
        const valueArray = data[key];
        const processedInquiries = valueArray.filter(
            (v) => v.inquiry_status === "답변완료"
        );

        return {
            date: key,
            totalInquiries: valueArray.length,
            processedInquiries: processedInquiries.length,
            unprocessedInquiries: valueArray.length - processedInquiries.length,
        };
    };

    const setNextDateHandler = () => {
        const start = new Date(calendarDate.start);
        const end = new Date(calendarDate.end);
        start.setDate(start.getDate() + 7);
        end.setDate(end.getDate() + 7);
        setCalendarDate({
            start: formatDateLocal(start),
            end: formatDateLocal(end),
        });
        setCurrentWeekDays([...getWeekDays(start)]);
    };
    const setPrevDateHandler = () => {
        const start = new Date(calendarDate.start);
        const end = new Date(calendarDate.end);
        start.setDate(start.getDate() - 7);
        end.setDate(end.getDate() - 7);
        setCalendarDate({
            start: formatDateLocal(start),
            end: formatDateLocal(end),
        });
        setCurrentWeekDays([...getWeekDays(start)]);
    };

    const dateSelectHandler = (payload) => {
        const targetDate = new Date(payload[0]);
        const newWeekDays = getWeekDays(targetDate);
        setCalendarDate({
            start: formatDateLocal(new Date(newWeekDays[0])),
            end: formatDateLocal(new Date(newWeekDays[6])),
        });
        setCurrentWeekDays([...newWeekDays]);
    };

    useEffect(() => {
        if (!timeoutId) return;
        const groupedData = groupDataByKeyValue(fetchedData, "reg_date");
        const transformedData = transformData(groupedData, (key) =>
            transformer(groupedData, key)
        );
        const existingDateList = transformedData.map((v) => v.date);

        if (existingDateList.length !== currentWeekDays.length) {
            currentWeekDays.forEach((element) => {
                if (existingDateList.includes(element)) return;
                transformedData.push({
                    date: element,
                    totalInquiries: 0,
                    processedInquiries: 0,
                    unprocessedInquiries: 0,
                });
            });
        }

        setFilteredData(transformedData);
    }, [fetchedData]);

    useEffect(() => {
        if (timeoutId) clearTimeout(timeoutId);
        const newTimeoutId = setTimeout(() => {
            fetchData(calendarDate.start, calendarDate.end);
        }, debounceTime);
        setTimeoutId(newTimeoutId);
    }, [calendarDate]);
    return (
        <div className="col-span-1 rounded-sm h-[380px] p-5 bg-white box-border flex flex-col relative">
            <div className="header flex items-center flex-wrap">
                <h1 className="font-bold text-[18px]">전체 문의 - 주간</h1>
                <div className="flex items-center text-[12px] ml-auto">
                    <div className="flex items-center">
                        <DateSelector
                            calendarDate={calendarDate}
                            dateSelectHandler={dateSelectHandler}
                            className={`text-[12px] w-[240px] ${
                                !calendarDate.start ? "text-end" : "text-start"
                            } py-1 px-1 m-0 border-none`}
                            shouldCloseOnSelect={true}
                        />
                        <div className="flex ml-3 gap-x-1">
                            <button
                                className="hover:bg-blue-200 rounded-md border border-blue-200 border-solid transition-all duration-200 ease-in-out active:scale-95"
                                onClick={setPrevDateHandler}
                            >
                                <ChevronLeft className="w-6 h-6 p-1 " />
                            </button>
                            <button
                                className="hover:bg-blue-200 rounded-md border border-blue-200 border-solid transition-all duration-200 ease-in-out active:scale-95"
                                onClick={setNextDateHandler}
                            >
                                <ChevronRight className="w-6 h-6 p-1" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ul className="flex ml-auto text-[12px] gap-2">
                <li className="flex items-center">
                    <div className="bg-gray-400 w-[10px] h-[10px] rounded-full mx-1"></div>
                    <p>총 인입</p>
                </li>
                <li className="flex items-center">
                    <div className="bg-blue-400 w-[10px] h-[10px] rounded-full mx-1"></div>
                    <p>처리</p>
                </li>
                <li className="flex items-center">
                    <div className="bg-red-400 w-[10px] h-[10px] rounded-full mx-1"></div>
                    <p>미처리</p>
                </li>
            </ul>
            <div
                ref={svgContainerRef}
                className="flex-1 w-full h-full rounded-sm"
            >
                <svg width={svgWidth} height={svgHeight}>
                    <g transform={`translate(${margin.left},${margin.top})`}>
                        {fetchedData.length === 0 ? (
                            <NoDataText
                                innerHeight={innerHeight}
                                innerWidth={innerWidth}
                            />
                        ) : (
                            <>
                                <YAxis
                                    innerHeight={innerHeight}
                                    innerWidth={innerWidth}
                                    margin={margin}
                                    inquiryCountScale={inquiryCountScale}
                                    filteredData={filteredData}
                                />
                                <XAxis
                                    innerHeight={innerHeight}
                                    innerWidth={innerWidth}
                                    margin={margin}
                                    inquiryCountScale={inquiryCountScale}
                                    dateScale={dateScale}
                                    filteredData={filteredData}
                                    tooltipData={tooltipData}
                                    mouseMoveHandler={mouseMoveHandler}
                                    mouseOutHandler={mouseOutHandler}
                                />
                            </>
                        )}
                    </g>
                </svg>
                {tooltipData && filteredData.length > 0 && (
                    <TooltipCard tooltipPos={tooltipPos}>
                        <p className="text-[14px] py-1">{tooltipData.date}</p>
                        <ul className="text-[12px]">
                            <li className="flex items-center">
                                <div className="bg-gray-400 w-[10px] h-[10px] rounded-full mx-1"></div>
                                총 인입 :{" "}
                                {commaSeparateNumber(
                                    tooltipData.totalInquiries
                                )}
                                건
                            </li>
                            <li className="flex items-center">
                                {" "}
                                <div className="bg-blue-400 w-[10px] h-[10px] rounded-full mx-1"></div>
                                처리 :{" "}
                                {commaSeparateNumber(
                                    tooltipData.processedInquiries
                                )}
                                건
                            </li>
                            <li className="flex items-center">
                                <div className="bg-red-400 w-[10px] h-[10px] rounded-full mx-1"></div>
                                미처리 :{" "}
                                {commaSeparateNumber(
                                    tooltipData.unprocessedInquiries
                                )}
                                건
                            </li>
                        </ul>
                    </TooltipCard>
                )}
            </div>
        </div>
    );
};

export default WeeklyInquiryContainer;

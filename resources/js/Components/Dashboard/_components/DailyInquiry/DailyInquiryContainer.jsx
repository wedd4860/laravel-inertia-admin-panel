import { MasanggamesProductList } from "@/Helper/data";
import { formatDateLocal } from "@/Helper/date";
import {
    getKeyListFromData,
    groupDataByKeyValue,
    transformData,
} from "@/Helper/utils";
import { useFetchStatistics } from "@/Hooks/useFetchStatistics";
import { useSvgContainer } from "@/Hooks/useSvgContainer";
import { filter, max, scaleBand, scaleLinear } from "d3";
import React, { useEffect, useMemo, useState } from "react";
import NoDataText from "../NoDataText";
import YAxis from "./YAxis";
import XAxis from "./XAxis";
import TooltipCard from "../TooltipCard";
import { useTooltip } from "@/Hooks/useTooltip";
import { commaSeparateNumber } from "@/Helper/numberFormat";
import ChevronLeft from "./../../../Icon/ChevronLeft";
import ChevronRight from "./../../../Icon/ChevronRight";
import DateSelector from "../DateSelector";

const currentDate = new Date();
const initStart = formatDateLocal(currentDate);
const initEnd = formatDateLocal(currentDate);
const debounceTime = 160;
const DailyInquiryContainer = () => {
    const { setTooltipPos, tooltipPos, tooltipData, setTooltipData } =
        useTooltip();
    const [calendarDate, setCalendarDate] = useState({
        start: initStart,
        end: initEnd,
    });
    const { fetchedData, fetchData } = useFetchStatistics(
        calendarDate.start,
        calendarDate.end
    );
    const [timeoutId, setTimeoutId] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const { svgContainerRef, svgWidth, svgHeight } = useSvgContainer();

    const margin = {
        top: 14,
        right: 25,
        bottom: 30,
        left: 35,
    };

    const innerWidth = svgWidth - margin.left - margin.right;
    const innerHeight = svgHeight - margin.top - margin.bottom;

    const productScale = scaleBand()
        .domain(MasanggamesProductList.map((v) => v.id))
        .paddingInner(0.4)
        .range([0, innerHeight])
        .paddingOuter(0.2);

    const inquiryCountScale = scaleLinear()
        .domain([
            0,
            Math.max(
                max(filteredData, (d) => d.totalInquiries),
                10
            ),
        ])
        .range([1, innerWidth])
        .nice();

    const mouseMoveHandler = (data) => (event) => {
        const x = event.clientX;
        const y = event.clientY;
        setTooltipData(data);
        setTooltipPos({ x, y });
    };

    const mouseOutHandler = () => {
        setTooltipData(null);
    };

    const transformer = (data, key) => {
        const valueArray = data[key];
        const processedInquiries = valueArray.filter(
            (v) => v.inquiry_status === "답변완료"
        );

        return {
            category: key,
            totalInquiries: valueArray.length,
            processedInquiries: processedInquiries.length,
            processedRatio: Math.floor(
                (processedInquiries.length / valueArray.length) * 100
            ),
        };
    };

    const setNextDateHandler = () => {
        const current = new Date(calendarDate.start);
        current.setDate(current.getDate() + 1);
        setCalendarDate({
            start: formatDateLocal(current),
            end: formatDateLocal(current),
        });
    };
    const setPrevDateHandler = () => {
        const current = new Date(calendarDate.start);
        current.setDate(current.getDate() - 1);
        setCalendarDate({
            start: formatDateLocal(current),
            end: formatDateLocal(current),
        });
    };

    const dateSelectHandler = (payload) => {
        const current = new Date(payload);
        setCalendarDate({
            start: formatDateLocal(current),
            end: formatDateLocal(current),
        });
    };

    useEffect(() => {
        const groupedData = groupDataByKeyValue(fetchedData, "product");
        const transformedData = transformData(groupedData, (key) =>
            transformer(groupedData, key)
        );
        const existingGameList = transformedData.map((v) => v.category);
        MasanggamesProductList.forEach((element) => {
            if (existingGameList.includes(element.id)) return;
            transformedData.push({
                category: element.id,
                totalInquiries: 0,
                processedInquiries: 0,
                processedRatio: 0,
            });
        });
        const sortedArray = transformedData.sort((a, b) => {
            const indexA = MasanggamesProductList.findIndex(
                (item) => item.id === a.category
            );
            const indexB = MasanggamesProductList.findIndex(
                (item) => item.id === b.category
            );
            return indexA - indexB;
        });
        setFilteredData(sortedArray);
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
                <h1 className="font-bold text-[18px]">프로덕트별 - 일간</h1>
                <div className="flex items-center text-[12px] ml-auto">
                    <span>일자 :</span>
                    <DateSelector
                        calendarDate={calendarDate}
                        dateSelectHandler={dateSelectHandler}
                        selectsRange={false}
                        className={`text-[12px] w-[128px] ${
                            !calendarDate.start ? "text-end" : "text-start"
                        } py-1 px-1 m-0 border-none`}
                    />
                    <span>
                        {new Date(calendarDate.start).toLocaleDateString() ===
                            new Date().toLocaleDateString() &&
                            `(${new Date().toLocaleString().slice(13, -6)}:00)`}
                    </span>
                    <div className="flex gap-x-1 ml-3">
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
            <div
                ref={svgContainerRef}
                className="flex-1 w-full h-full rounded-sm"
            >
                <svg width={svgWidth} height={svgHeight}>
                    <g transform={`translate(${margin.left}, ${margin.top})`}>
                        {filteredData.reduce(
                            (acc, cur) => acc + cur.totalInquiries,
                            0
                        ) === 0 ? (
                            <NoDataText
                                innerHeight={innerHeight}
                                innerWidth={innerWidth}
                            />
                        ) : (
                            <>
                                <XAxis
                                    innerHeight={innerHeight}
                                    innerWidth={innerWidth}
                                    margin={margin}
                                    inquiryCountScale={inquiryCountScale}
                                    filteredData={filteredData}
                                />
                                <YAxis
                                    innerHeight={innerHeight}
                                    innerWidth={innerWidth}
                                    margin={margin}
                                    inquiryCountScale={inquiryCountScale}
                                    productScale={productScale}
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
                        <p className="text-[14px] py-1">
                            프로덕트 - {tooltipData.category}
                        </p>
                        <p className="text-[12px]">
                            총 인입 :{" "}
                            {commaSeparateNumber(tooltipData.totalInquiries)}건
                        </p>
                        <p className="text-[12px]">
                            처리량 :{" "}
                            {commaSeparateNumber(
                                tooltipData.processedInquiries
                            )}
                            건
                        </p>
                        <p className="text-[12px]">
                            처리율 : {tooltipData.processedRatio}%
                        </p>
                    </TooltipCard>
                )}
            </div>
        </div>
    );
};

export default DailyInquiryContainer;

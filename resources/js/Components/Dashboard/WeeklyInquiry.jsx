import React from "react";
import Card from "./_components/Card";
import InquiryStatusTable from "./_components/InquiryStatusTable";
import { getWeekNumber, getWeeksInMonth } from "@/Helper/date";

const workDays = 5;
const columns = ["주간 인입", "주간 처리", "평균 인입", "평균 처리"];

const WeeklyInquiry = () => {
    const weeklySummaryData = [
        {
            week_number: 22,
            total_input: 852,
            total_proc: 605,
        },
        {
            week_number: 23,
            total_input: 933,
            total_proc: 788,
        },
        {
            week_number: 24,
            total_input: 1099,
            total_proc: 806,
        },
        {
            week_number: 25,
            total_input: 985,
            total_proc: 827,
        },
        {
            week_number: 26,
            total_input: 0,
            total_proc: 0,
        },
    ];
    const weeks = getWeeksInMonth();
    const currentWeek = getWeekNumber(new Date());

    const filteredData = weeklySummaryData.filter((v) =>
        weeks.includes(v.week_number)
    );

    return (
        <div className="my-8">
            <h1 className="text-2xl font-black mb-5">주차별 문의처리 통계</h1>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {filteredData.map((weeklyData) => {
                    const beforeWeeklyData =
                        weeklySummaryData.find(
                            (v) => v.week_number === weeklyData.week_number - 1
                        ) ?? weeklyData;
                    const total_input_diff =
                        weeklyData.total_input - beforeWeeklyData?.total_input;
                    const total_proc_diff =
                        weeklyData.total_proc - beforeWeeklyData?.total_proc;
                    const avg_input_dff =
                        Math.round((total_input_diff * 10) / workDays) / 10;
                    const avg_proc_dff =
                        Math.round((total_proc_diff * 10) / workDays) / 10;

                    const diff = {
                        total_input_diff,
                        total_proc_diff,
                        avg_input_dff,
                        avg_proc_dff,
                    };

                    return (
                        <Card
                            className="min-w-[420px]  bg-blue-500"
                            key={weeklyData.week_number}
                        >
                            <h2
                                className={`text-xl font-bold mb-2 ${
                                    weeklyData.week_number === currentWeek
                                        ? "text-green-300"
                                        : "text-white"
                                }`}
                            >
                                {weeklyData.week_number} 주차 주간 현황
                            </h2>
                            <InquiryStatusTable
                                columns={columns}
                                weeklyData={weeklyData}
                                diff={diff}
                            />
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default WeeklyInquiry;

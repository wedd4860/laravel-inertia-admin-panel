import React, { useEffect } from "react";
import WeeklyInquiry from "./WeeklyInquiry";
import WeeklyInquiryGraph from "./WeeklyInquiryGraph";
import DailyInquiryStatus from "./DailyInquiryStatus";
import TotalStatusContainer from "./_components/TotalStatus/TotalStatusContainer";
import InquiryOverviewByTypeContainer from "./_components/InquiryOverviewByType/InquiryOverviewByTypeContainer";
import ProcessingTimeAndSatisfactionScoreContainer from "./_components/ProcessingTimeAndSatisfactionScore/ProcessingTimeAndSatisfactionScoreContainer";
import DailyInquiryContainer from "./_components/DailyInquiry/DailyInquiryContainer";
import WeeklyInquiryContainer from "./_components/WeeklyInquiry/WeeklyInquiryContainer";
import { usePage } from "@inertiajs/react";
import clsx from "clsx";
const StatisticDashboard = () => {
    const auth = usePage().props.auth;
    const isPermissionGroup = auth.member.member_t_permission_group !== null;
    return (
        <div className={clsx(
            "h-full p-5 bg-gray-100 relative w-full",
            {
                "ml-[80px]": isPermissionGroup,
            },
            {
                "ml-0": !isPermissionGroup,
            }
        )}>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-4 pb-0 w-full">
                <TotalStatusContainer />
                <InquiryOverviewByTypeContainer />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4 w-full">
                <ProcessingTimeAndSatisfactionScoreContainer />
                <DailyInquiryContainer />
                <WeeklyInquiryContainer />
            </div>
        </div>
    );
};

export default StatisticDashboard;

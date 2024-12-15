import React, { useRef, useEffect } from "react";
import { registerLocale } from "react-datepicker";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import "./dateSelector.css";
import ChevronDown from "./../../Icon/ChevronDown";
registerLocale("ko", ko);
const DateSelector = ({ calendarDate, dateSelectHandler, ...props }) => {
    const calendarContainer = useRef(null);
    const calendarToggleHandler = () => {
        const targetElement = calendarContainer.current;
        targetElement.setFocus(true);
    };
    return (
        <div className="custom__datepicker relative">
            <DatePicker
                ref={calendarContainer}
                locale="ko"
                swapRange
                placeholderText="기간을 입력해주세요."
                selected={calendarDate.start}
                onChange={dateSelectHandler}
                startDate={calendarDate.start}
                endDate={calendarDate.end}
                showDisabledMonthNavigation
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selectsRange
                dateFormat="yyyy년 MM월 dd일"
                className={`text-[12px] w-[235px] ${
                    !calendarDate.start ? "text-end" : "text-start"
                } py-1 px-1 m-0 border-none`}
                {...props}
            />
            <ChevronDown
                onClick={calendarToggleHandler}
                className="cursor-pointer absolute w-4 h-4 top-2 right-1.5 stroke-[1px]"
            />
        </div>
    );
};

export default DateSelector;

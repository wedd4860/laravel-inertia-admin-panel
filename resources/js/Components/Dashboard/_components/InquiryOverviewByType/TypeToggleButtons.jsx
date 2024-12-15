import React from "react";

const TypeToggleButtons = ({ graphType, typeToggleHandler }) => {
    return (
        <div className="absolute right-0 top-[-30px] flex border border-gray-400 rounded-lg overflow-hidden">
            <button
                className={`${
                    graphType === "stat" && "bg-blue-200"
                } p-1 w-[80px] text-[12px] transition-all duration-200 ease-in-out"`}
                onClick={() => typeToggleHandler("stat")}
            >
                통계
            </button>
            <button
                className={`${
                    graphType === "time" && "bg-blue-200"
                } p-1 w-[80px] text-[12px] transition-all duration-200 ease-in-out"`}
                onClick={() => typeToggleHandler("time")}
            >
                추이
            </button>
        </div>
    );
};

export default TypeToggleButtons;

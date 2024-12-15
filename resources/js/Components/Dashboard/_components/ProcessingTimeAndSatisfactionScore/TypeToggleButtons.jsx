import React from "react";

const TypeToggleButtons = ({ graphType, graphTypeToggleHandler }) => {
    return (
        <div className="absolute right-0 top-[-30px] flex border border-gray-400 rounded-lg overflow-hidden">
            <button
                className={`${
                    graphType === "game" && "bg-blue-200"
                } p-1 w-[80px] text-[12px] transition-all duration-200 ease-in-out`}
                onClick={() => graphTypeToggleHandler("game")}
            >
                게임
            </button>
            <button
                className={`${
                    graphType === "manager" && "bg-blue-200"
                } p-1 w-[80px] text-[12px] transition-all duration-200 ease-in-out`}
                onClick={() => graphTypeToggleHandler("manager")}
            >
                GM
            </button>
        </div>
    );
};

export default TypeToggleButtons;

import React from "react";
import styles from "./OverviewPanel.module.css";

const OverviewPanel = ({ legendItems, legendToggleHandler }) => {
    return (
        <>
            <div className={`flex gap-x-3 ${styles.container}`}>
                {legendItems.map((item) => (
                    <button
                        onClick={() => legendToggleHandler(item.id)}
                        key={item.id}
                        className={`rounded-md p-3 text-nowrap ${
                            item.isShow ? "bg-[#E4EBFD]" : "bg-white"
                        }`}
                    >
                        <div className="text-[14px] text-gray-600">
                            {item.title}
                        </div>
                        <div
                            className={`text-center text-[1.3rem] ${
                                item.isShow ? "text-blue-400" : "text-black"
                            }`}
                        >
                            {`${item.formatter(item.totalValue)}${
                                !!item.unit ? item.unit : ""
                            }`}
                        </div>
                    </button>
                ))}
            </div>
        </>
    );
};

export default OverviewPanel;

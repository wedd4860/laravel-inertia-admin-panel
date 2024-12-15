import React from "react";

const ManagerSelector = ({
    selectedManager,
    managerList,
    managerSelectHandler,
}) => {
    return (
        <select
            name="manager_selector"
            id="manager_selector"
            onChange={managerSelectHandler}
            value={selectedManager}
            className="border-none text-[12px] pl-3 pr-[26px] py-1"
        >
            <option value="">GM 전체</option>
            {managerList.map((manager) => (
                <option key={manager} value={manager}>
                    {manager}
                </option>
            ))}
        </select>
    );
};

export default ManagerSelector;

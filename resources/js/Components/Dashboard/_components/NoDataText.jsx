import React from "react";

const NoDataText = ({ innerHeight, innerWidth }) => {
    return (
        <text
            style={{ textAnchor: "middle" }}
            x={innerWidth / 2}
            y={innerHeight / 2}
        >
            No Data
        </text>
    );
};

export default NoDataText;

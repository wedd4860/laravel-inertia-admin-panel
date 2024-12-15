import React from "react";

const Show = ({ show = true, children }) => {
    if (!show) return false;
    return <div>{children}</div>;
};

export default Show;

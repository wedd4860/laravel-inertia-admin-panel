import React from "react";
import { twMerge } from "tailwind-merge";

const Card = ({ children, className }) => {
    return (
        <div
            className={twMerge(
                "container p-3 bg-white shadow-lg rounded-lg",
                className
            )}
        >
            {children}
        </div>
    );
};

export default Card;

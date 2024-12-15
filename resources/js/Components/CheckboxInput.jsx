import { useState } from "react";
import InputLabel from "./InputLabel";

export default function CheckboxInput({
    inputId = "",
    inputName = "",
    className = "",
    inputValue = "",
    checkedValue = false,
    ...props
}) {
    return (
        <div className="flex ml-2">
            <input
                {...props}
                type="checkbox"
                id={inputId}
                name={inputName}
                value={inputValue}
                className={
                    "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " +
                    className
                }
            />
            <div className="ml-1">
                <InputLabel
                    htmlFor={inputId}
                    className="inline"
                    value={inputValue}
                />
            </div>
        </div>
    );
}

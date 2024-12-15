import React from "react";

const InquiryStatusTable = ({
    columns,
    weeklyData,
    diff: { total_input_diff, total_proc_diff, avg_input_dff, avg_proc_dff },
}) => {
    return (
        <table className="min-w-full bg-white rounded-md border-collapse overflow-hidden text-sm">
            <thead>
                <tr>
                    <th className="py-2 bg-gray-200 text-left pl-4">분류</th>
                    {columns.map((column) => (
                        <th
                            className="py-2 bg-gray-200 text-center"
                            key={column}
                        >
                            {column}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="py-2 pl-4">종합</td>
                    <td className="py-2 px-4">{weeklyData.total_input}</td>
                    <td className="py-2 px-4">{weeklyData.total_proc}</td>
                    <td className="py-2 px-4">
                        {Math.round((weeklyData.total_input * 10) / 5) / 10}
                    </td>
                    <td className="py-2 px-4">
                        {Math.round((weeklyData.total_proc * 10) / 5) / 10}
                    </td>
                </tr>
                <tr>
                    <td className="py-2 pl-4 bg-gray-200">전주 대비</td>
                    <td
                        className={`py-2 px-4 bg-gray-200 ${
                            total_input_diff === 0
                                ? "text-black"
                                : total_input_diff > 0
                                ? "text-red-500"
                                : "text-blue-700"
                        }`}
                    >
                        {total_input_diff === 0
                            ? "-"
                            : total_input_diff > 0
                            ? `▲${total_input_diff}`
                            : `▼${-total_input_diff}`}
                    </td>
                    <td
                        className={`py-2 px-4 bg-gray-200 ${
                            total_proc_diff === 0
                                ? "text-black"
                                : total_proc_diff > 0
                                ? "text-red-500"
                                : "text-blue-700"
                        }`}
                    >
                        {total_proc_diff === 0
                            ? "-"
                            : total_proc_diff > 0
                            ? `▲${total_proc_diff}`
                            : `▼${-total_proc_diff}`}
                    </td>
                    <td
                        className={`py-2 px-4 bg-gray-200 ${
                            avg_input_dff === 0
                                ? "text-black"
                                : avg_input_dff > 0
                                ? "text-red-500"
                                : "text-blue-700"
                        }`}
                    >
                        {avg_input_dff === 0
                            ? "-"
                            : avg_input_dff > 0
                            ? `▲${avg_input_dff}`
                            : `▼${-avg_input_dff}`}
                    </td>
                    <td
                        className={`py-2 px-4 bg-gray-200 ${
                            avg_proc_dff === 0
                                ? "text-black"
                                : avg_proc_dff > 0
                                ? "text-red-500"
                                : "text-blue-700"
                        }`}
                    >
                        {avg_proc_dff === 0
                            ? "-"
                            : avg_proc_dff > 0
                            ? `▲${avg_proc_dff}`
                            : `▼${-avg_proc_dff}`}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default InquiryStatusTable;

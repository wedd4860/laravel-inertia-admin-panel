import { useEffect } from "react"
import TooltipCard from "../TooltipCard"
import { commaSeparateNumber } from "@/Helper/numberFormat"

export const TimeSeriesChartTooltipCard = ({
    tooltipPos,
    tooltipData,
    colorSet,
    inquiryTypeList
}) => {
    return(
        <TooltipCard tooltipPos={tooltipPos}>
            <p className="p-1">
                <p className="text-[14px] pt-1">
                    <span>일시 : </span>
                    <span className="font-semibold">
                        {tooltipData.date}
                </span>
            </p>
            {Object.keys(tooltipData)
                .filter((d) => d !== "date")
                .map((v) => {
                    const colorIndex = inquiryTypeList.findIndex((value) => value.type === v)
                     return(
                <p
                    key={v}
                    className="text-[12px] pt-1 flex items-center"
                >
                    <svg className="w-5 h-5">
                    <circle 
                        r={5}
                        cx={5}
                        cy={10}
                        fill={colorSet[colorIndex]}                        
                         />
                    </svg>
                    <span className="ml-1">
                        {v === "date" ? "일시" : v}:{" "}
                    </span>
                    <span>
                        {v === "date"
                            ? tooltipData[v]
                            : commaSeparateNumber(
                                tooltipData[v]
                              ) + "건"}
                        </span>
                </p>
                )})}
            </p>
        </TooltipCard>
                        
    )
}
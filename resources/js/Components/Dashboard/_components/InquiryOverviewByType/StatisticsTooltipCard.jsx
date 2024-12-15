import { commaSeparateNumber } from "@/Helper/numberFormat"
import TooltipCard from "../TooltipCard"

export const StatisticsTooltipCard = ({
    tooltipPos,
    tooltipData,
}) => {
    const getInquiryProcessingRate = (data) => {
        return Math.floor(
            data.processedCount/data.count * 100
            )
    }
    return(
        <TooltipCard tooltipPos={tooltipPos}>
        <p className="text-[14px]">
            {tooltipData.type} 
        </p>
        <ul className="flex ml-auto text-[12px] gap-2">
            <li className="flex items-center">
                <div className="bg-gray-400 w-[10px] h-[10px] rounded-full mx-1"/>
                <p className="text-[12px]">    
                    총인입: 
                    <span className="text-[12px] ml-2">
                        {commaSeparateNumber(tooltipData.count)}
                    </span>
                </p>
            </li>
        </ul>
        <ul className="flex ml-auto text-[12px] gap-2">
            <li className="flex items-center">
                <div className="bg-blue-400 w-[10px] h-[10px] rounded-full mx-1"/>
                <p className="text-[12px]">
                    처리량: 
                    <span className="text-[12px] ml-2">
                        {commaSeparateNumber(tooltipData.processedCount)}
                    </span>
                </p>
            </li>
        </ul>
        <ul className="flex ml-auto text-[12px] gap-2">
            <li className="flex items-center">
                <p className="text-[12px]">
                    처리율: 
                    <span className="text-[12px] ml-2">
                        {commaSeparateNumber(
                            getInquiryProcessingRate(tooltipData)
                        )
                        }%
                    </span>
                </p>
            </li>
        </ul>
    </TooltipCard>
    )
}
import { bisector } from "d3";
import { useMemo, useRef, useState } from "react";
export const useTooltip = () => {
    const [isTooltipOpen, setIsTooltipOpen] = useState();
    const [tooltipPos, setTooltipPos] = useState({
        x: 0,
        y: 0,
        boxWidth: Infinity,
        boxHeight: Infinity,
    });
    const [tooltipData, setTooltipData] = useState(null);
    const overlayRef = useRef(null);

    return {
        isTooltipOpen,
        setIsTooltipOpen,
        overlayRef,
        setTooltipPos,
        tooltipPos,
        setTooltipData,
        tooltipData,
    };
};

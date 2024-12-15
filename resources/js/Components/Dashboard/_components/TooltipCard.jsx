import React, { useEffect, useRef, useState } from "react";

const TooltipCard = ({ tooltipPos, children }) => {
    const toolTipBoxRef = useRef(null);

    const [position, setPosition] = useState({ left: 0, top: 0 });

    useEffect(() => {
        let left = tooltipPos.x + 20;
        let top = tooltipPos.y + 10;

        if (tooltipPos.x + 220 > window.innerWidth) {
            left = tooltipPos.x - 210;
        }
        if (tooltipPos.x + 220 > tooltipPos.boxWidth) {
            left = tooltipPos.x - 240;
        }
        if (tooltipPos.y + 80 > window.innerHeight) {
            top = tooltipPos.y - 70;
        }
        if (tooltipPos.y + 40 > tooltipPos.boxHeight) {
            top = tooltipPos.y - 70;
        }

        if (toolTipBoxRef.current) {
            const divHeight = toolTipBoxRef.current.offsetHeight;

            if (tooltipPos.y + divHeight + 50 > window.innerHeight) {
                top = tooltipPos.y - divHeight - 10;
            }
        }
        setPosition({ left, top });
    }, [tooltipPos]);

    return (
        <div
            ref={toolTipBoxRef}
            className="tooltip"
            style={{
                left: position.left,
                top: position.top,
                position: "fixed",
                zIndex: 9999,
            }}
        >
            <div className="rounded-sm border-[1px] border-gray-300 p-3 bg-white min-w-[200px] max-w-[200px] overflow-auto break-words shadow-xl opacity-85">
                {children}
            </div>
        </div>
    );
};

export default TooltipCard;

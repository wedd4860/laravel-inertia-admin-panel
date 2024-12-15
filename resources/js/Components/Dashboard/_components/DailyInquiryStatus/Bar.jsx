import { easeSin, select, transition } from "d3";
import React, { useRef, useEffect } from "react";

const barMargin = 5;
const labelXOffset = 5;

const Bar = ({
    data,
    xScale,
    yScale,
    innerWidth,
    hoveringType,
    setHoveringType,
}) => {
    const rectRefs = useRef([]);
    const handleMouseOver = (d) => {
        setHoveringType(d);
    };
    const handleMouseOut = () => {
        setHoveringType(null);
    };

    useEffect(() => {
        if (rectRefs.current.length > 0) {
            const rects = rectRefs.current.map((ref) => select(ref.element));

            const transitionDuration = 500;
            const rect_t = transition()
                .ease(easeSin)
                .duration(transitionDuration);

            rects.forEach((rect, index) => {
                const value = rectRefs.current[index].value;
                rect.transition(rect_t).attr("width", innerWidth - value);
            });
        }
        return () => {};
    }, [rectRefs]);

    return (
        <>
            {data.map((d) => {
                return (
                    <g
                        key={d.title}
                        onMouseOver={() => handleMouseOver(d.title)}
                        onMouseOut={() => handleMouseOut()}
                    >
                        <rect
                            ref={(ref) =>
                                (rectRefs.current[rectRefs.current.length] = {
                                    element: ref,
                                    value: xScale(d.value),
                                })
                            }
                            opacity={
                                hoveringType === d.title ||
                                hoveringType === null
                                    ? 1
                                    : 0.3
                            }
                            x={0}
                            y={yScale(d.title)}
                            width={0}
                            height={yScale.bandwidth() - barMargin}
                            fill="#4285F4"
                            className="cursor-pointer transition-opacity duration-100 ease-in"
                        />
                        <text
                            opacity={d.value === 0 ? 0 : 1}
                            x={innerWidth - xScale(d.value) + labelXOffset}
                            y={yScale(d.title)}
                            textAnchor="start"
                            dy=".9em"
                        >
                            {d.value}
                        </text>
                    </g>
                );
            })}
        </>
    );
};

export default Bar;

import { easeSin, select, transition } from "d3";
import React, { useEffect, useRef } from "react";
const barInnerOffset = 3;
const textTopOffset = 10;
const opacity = 0.3;
const Bar = ({
    groupData,
    yScale,
    dateScale,
    innerHeight,
    typeScale,
    colorMap,
    hoveringType,
}) => {
    const rectRefs = useRef([]);
    useEffect(() => {
        if (rectRefs.current.length > 0) {
            const rects = rectRefs.current.map((ref) => select(ref.element));
            const transitionDuration = 500;
            const delayStep = 50;
            const rect_t = transition()
                .ease(easeSin)
                .duration(transitionDuration);

            rects.forEach((rect, index) => {
                const yValue = rectRefs.current[index].value;
                rect.transition(rect_t)
                    .delay(index * delayStep)
                    .attr("height", innerHeight - yValue)
                    .attr("y", yValue);
            });
        }
        return () => {};
    }, [rectRefs]);
    return (
        <>
            {groupData.map((group, index) => (
                <g
                    key={index}
                    transform={`translate(${dateScale(group[0])},0)`}
                >
                    {group[1].slice(0, 3).map((d, index) => {
                        return (
                            <g
                                className="transition-opacity duration-200 ease-linear"
                                key={`${d.date}-${d.type}`}
                                opacity={
                                    hoveringType === null
                                        ? 1
                                        : d.type === hoveringType
                                        ? 1
                                        : opacity
                                }
                            >
                                <rect
                                    ref={(ref) =>
                                        (rectRefs.current[
                                            rectRefs.current.length
                                        ] = {
                                            element: ref,
                                            value: yScale(d.value),
                                        })
                                    }
                                    x={
                                        typeScale.bandwidth() * index +
                                        barInnerOffset
                                    }
                                    y={innerHeight}
                                    width={
                                        typeScale.bandwidth() - barInnerOffset
                                    }
                                    height={0}
                                    fill={colorMap[d.type]}
                                />
                                <text
                                    opacity={d.value === 0 ? 0 : 1}
                                    x={
                                        typeScale.bandwidth() * index +
                                        typeScale.bandwidth() / 2
                                    }
                                    y={yScale(d.value) - textTopOffset}
                                    textAnchor="middle"
                                >
                                    {d.value}
                                </text>
                            </g>
                        );
                    })}
                </g>
            ))}
        </>
    );
};

export default Bar;

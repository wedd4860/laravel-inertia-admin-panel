import { line, select, transition, easeLinear } from "d3";
import React, { useEffect, useRef } from "react";
const Line = ({ data, dateScale, progressScale, colorMap }) => {
    const lineRef = useRef(null);
    const circleRefs = useRef([]);
    const textRefs = React.useRef([]);

    useEffect(() => {
        if (
            circleRefs.current.length > 0 &&
            lineRef.current &&
            textRefs.current.length > 0
        ) {
            const line = select(lineRef.current);
            const circles = circleRefs.current.map((ref) => select(ref));
            const texts = textRefs.current.map((ref) => select(ref));

            const circleTransitionDuration = 200;
            const lineTransitionDuration = 980;
            const delayStep = 140;

            const line_t = transition()
                .ease(easeLinear)
                .duration(lineTransitionDuration);
            const pathLength = line.node().getTotalLength();

            line.attr("stroke-dashoffset", pathLength)
                .attr("stroke-dasharray", pathLength)
                .transition(line_t)
                .attr("stroke-dashoffset", 0);

            const circle_t = transition()
                .ease(easeLinear)
                .duration(circleTransitionDuration);

            circles.forEach((circle, index) => {
                circle
                    .attr("opacity", 0)
                    .transition(circle_t)
                    .delay(index * delayStep)
                    .attr("r", 8)
                    .attr("opacity", 1);
            });

            texts.forEach((text, index) => {
                text
                    .attr("opacity", 0)
                    .transition(circle_t)
                    .delay(index * delayStep)
                    .attr("opacity", 1);
            });
        }

        return () => {};
    }, [circleRefs, lineRef]);

    return (
        <>
            <path
                ref={lineRef}
                d={line()
                    .x((d) => dateScale(d.date) + dateScale.bandwidth() / 2)
                    .y((d) => progressScale(d.value))(data)}
                fill="none"
                stroke={colorMap.progress}
                strokeWidth="3"
            />
            {data.map((d, index) => (
                <g key={d.date}>
                    <circle
                        ref={(ref) => {
                            circleRefs.current[index] = ref;
                        }}
                        fill="white"
                        stroke={colorMap.progress}
                        strokeWidth="2"
                        r={0}
                        cx={dateScale(d.date) + dateScale.bandwidth() / 2}
                        cy={progressScale(d.value)}
                    />
                    <text
                        ref={(ref) => {
                            textRefs.current[index] = ref;
                        }}
                        x={dateScale(d.date) + dateScale.bandwidth() / 2}
                        y={progressScale(d.value) + 24}
                        textAnchor="middle"
                        fontSize="16"
                        fill="black"
                    >
                        {d.value}%
                    </text>
                </g>
            ))}
        </>
    );
};

export default Line;

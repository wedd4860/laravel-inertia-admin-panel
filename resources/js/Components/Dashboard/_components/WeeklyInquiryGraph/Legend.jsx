import React from "react";

const typeNameMap = {
    input: "총 인입",
    proc: "처리",
    remain: "미처리",
};
const legendLeftOffset = 30;
const legendTopOffset = 20;
const legendGap = 30;
const legendCircleRadius = 8;

const legendRectWidth = 16;
const legendRectHeight = 8;

const Legend = ({
    innerWidth,
    innerHeight,
    colorMap,
    data,
    setHoveringType,
    lineChartVisible,
    setLineChartVisible,
}) => {
    const handleMouseOver = (d) => {
        setHoveringType(d);
    };
    const handleMouseOut = () => {
        setHoveringType(null);
    };
    const progressHandler = () => {
        setLineChartVisible(!lineChartVisible);
    };

    return (
        <g
            transform={`translate(${innerWidth + legendLeftOffset},${
                innerHeight / 2 + legendTopOffset
            })`}
        >
            {data.map((d, index) => (
                <g
                    className="select-none cursor-pointer"
                    style={{ cursor: "pointer" }}
                    onMouseOver={() => handleMouseOver(d)}
                    onMouseOut={() => handleMouseOut()}
                    key={index}
                    transform={`translate(0, ${index * legendGap})`}
                >
                    <circle r={legendCircleRadius} fill={colorMap[d]} />
                    <text x={15} y={5}>
                        {typeNameMap[d]}
                    </text>
                </g>
            ))}
            <g
                className="select-none cursor-pointer"
                opacity={lineChartVisible ? 1 : 0.5}
                onClick={() => progressHandler()}
                transform={`translate(0, ${data.length * legendGap})`}
            >
                <rect
                    width={legendRectWidth}
                    height={legendRectHeight}
                    x={-legendRectWidth / 2}
                    y={-legendRectHeight / 2}
                    fill={colorMap.progress}
                />
                <text x={15} y={5}>
                    처리율
                </text>
            </g>
        </g>
    );
};

export default Legend;

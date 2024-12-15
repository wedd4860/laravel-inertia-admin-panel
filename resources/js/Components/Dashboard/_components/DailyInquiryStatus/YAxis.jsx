import React from "react";

const labelOffset = 10;

const YAxis = ({ yScale, margin, innerHeight, setHoveringType }) => {
    const handleMouseOver = (d) => {
        setHoveringType(d);
    };
    const handleMouseOut = () => {
        setHoveringType(null);
    };
    return (
        <g transform={`translate(${margin.left - labelOffset},${margin.top})`}>
            {yScale.domain().map((tick) => (
                <g
                    onMouseOver={() => handleMouseOver(tick)}
                    onMouseOut={() => handleMouseOut()}
                    className="cursor-pointer transition-opacity duration-100 ease-in"
                    key={tick}
                    transform={`translate(0,${
                        yScale(tick) + yScale.bandwidth() / 2
                    })`}
                >
                    <text textAnchor="end">{tick}</text>
                </g>
            ))}
        </g>
    );
};

export default YAxis;

import { useEffect, useRef, useState } from "react";

export const useSvgContainer = () => {
    const svgContainerRef = useRef();
    const [svgWidth, setSvgWidth] = useState(0);
    const [svgHeight, setSvgHeight] = useState(0);

    useEffect(() => {
        const container = svgContainerRef.current;
        setSvgWidth(container.clientWidth);
        setSvgHeight(container.clientHeight);
    }, [svgContainerRef]);

    useEffect(() => {
        const changeSvg = () => {
            const container = svgContainerRef.current;
            setSvgWidth(container.clientWidth);
            setSvgHeight(container.clientHeight);
        };
        window.addEventListener("resize", changeSvg);
        return () => {
            window.removeEventListener("resize", changeSvg);
        };
    }, []);

    return {
        svgContainerRef,
        svgWidth,
        svgHeight,
    };
};

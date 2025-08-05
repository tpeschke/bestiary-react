import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";
import ObstacleDisplay from "../../Obstacles/components/ObstacleDisplay";
mermaid.initialize({ theme: "neutral" });
export function ChallengeDisplay({ challenge, index }) {
    const [obstacleInTooltip, setObstacleInTooltip] = useState(null);
    const { name, flowchart, obstacles } = challenge;
    const mermaidRef = useRef(null);
    useEffect(() => {
        const initializeMermaid = async () => {
            if (mermaidRef.current) {
                mermaidRef.current.innerHTML = flowchart;
                const { svg, bindFunctions } = await mermaid.render(`mermaid-diagram-${index}`, flowchart);
                mermaidRef.current.innerHTML = svg;
                bindFunctions?.(mermaidRef.current);
                setUpEventListeners();
            }
        };
        initializeMermaid();
    }, [flowchart]);
    function setUpEventListeners() {
        const nodes = Array.from(document.getElementsByClassName('node'));
        nodes.forEach((node) => {
            // I could find the label by searching for a deeper element but I need to set the event listener at the node level
            const label = node?.children.item(1)?.children.item(1)?.children.item(0)?.children.item(0)?.children.item(0)?.innerHTML;
            if (label && obstacles[label]) {
                node.setAttribute("data-tooltip-id", `${name}-obstacle-tooltip`);
                node.addEventListener('mouseover', showPopup(label));
            }
        });
    }
    function showPopup(obstacleName) {
        return (_) => setObstacleInTooltip(obstacles[obstacleName]);
    }
    return (_jsxs(_Fragment, { children: [_jsx("h6", { children: name }), _jsx("div", { id: `${index}`, ref: mermaidRef }), _jsx(Tooltip, { id: `${name}-obstacle-tooltip`, children: _jsx(ObstacleDisplay, { obstacle: obstacleInTooltip }) })] }));
}

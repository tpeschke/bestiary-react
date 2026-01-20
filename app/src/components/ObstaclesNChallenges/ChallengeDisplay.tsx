import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";
import { Challenge, Obstacle } from "../../../../backend/server/interfaces/skillInterfaces";
import ObstacleDisplay from "./ObstacleDisplay";
import Header from "../header/Header";
import NameHeader from "../../pages/bestiary/beast/components/UI/nameHeader/nameHeader";

interface Props {
    title?: 'full',
    challenge: Challenge,
    index: number,
    skillSkulls: number
}

mermaid.initialize({ theme: "neutral" });

export function ChallengeDisplay({ challenge, index, skillSkulls, title }: Props) {
    const [obstacleInTooltip, setObstacleInTooltip] = useState<Obstacle | null>(null);

    const { name, flowchart, obstacles } = challenge
    const mermaidRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initializeMermaid = async () => {
            if (mermaidRef.current) {
                mermaidRef.current.innerHTML = flowchart;
                const { svg, bindFunctions } = await mermaid.render(`mermaid-diagram-${index}`, flowchart);
                mermaidRef.current.innerHTML = svg;
                bindFunctions?.(mermaidRef.current);
                setUpEventListeners()
            }
        };

        initializeMermaid();
    }, [flowchart]);

    function setUpEventListeners() {
        const nodes: Element[] = Array.from(document.getElementsByClassName('node'));
        nodes.forEach((node: Element) => {
            // I could find the label by searching for a deeper element but I need to set the event listener at the node level
            const label = node?.children.item(1)?.children.item(1)?.children.item(0)?.children.item(0)?.children.item(0)?.innerHTML
            
            if (label && obstacles[label]) {
                node.setAttribute("data-tooltip-id", `${name}-obstacle-tooltip`)
                node.addEventListener('mouseover', showPopup(label));
            }
        })
    }

    function showPopup(obstacleName: string) {
        return (_: any) =>  setObstacleInTooltip(obstacles[obstacleName])
    }

    return (
        <>
            {title === 'full' ? (<NameHeader name={name} />) : (<h6>{name}</h6>)}
            <div id={`${index}`} ref={mermaidRef}></div>
            <Tooltip id={`${name}-obstacle-tooltip`}>
                <ObstacleDisplay obstacle={obstacleInTooltip} skillSkulls={skillSkulls} />
            </Tooltip>
        </>
    )
}
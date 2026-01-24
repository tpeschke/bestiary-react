import './ChallengeDisplay.css'
import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";
import ObstacleDisplay from "./ObstacleDisplay";
import NameHeader from "../../pages/bestiary/beast/components/UI/nameHeader/nameHeader";
import HTMLDisplay from "../../pages/bestiary/beast/components/UI/htmlDisplay/htmlDisplay";
import { Challenge, Obstacle } from '@bestiary/common/interfaces/obstacles/obstacleCatalog';

interface Props {
    title?: 'full',
    challenge: Challenge,
    index: number
}

mermaid.initialize({ theme: "neutral" });

export function ChallengeDisplay({ challenge, index, title }: Props) {
    const [obstacleInTooltip, setObstacleInTooltip] = useState<Obstacle | null>(null);

    const { name, flowchart, obstacles, notes } = challenge
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
        return (_: any) => setObstacleInTooltip(obstacles[obstacleName])
    }

    return (
        <>
            {title === 'full' ? (<NameHeader name={name} />) : (<h6>{name}</h6>)}
            <div className={title === 'full' ? "full-float" : ""} id={`${index}`} ref={mermaidRef}></div>
            <div className={title === 'full' ? "notes-margin" : ""}>
                {title === 'full' && <h2 className="border">Notes</h2>}
                <HTMLDisplay html={notes} />
            </div>
            <Tooltip id={`${name}-obstacle-tooltip`}>
                <ObstacleDisplay obstacle={obstacleInTooltip} />
            </Tooltip>
        </>
    )
}
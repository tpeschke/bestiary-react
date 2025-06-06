import mermaid from "mermaid";
import { Challenge } from "../../../../../../../../../interfaces/infoInterfaces/skillInfoInterfaces"
import { useEffect, useRef } from "react";

interface Props {
    challenge: Challenge,
    index: number
}

mermaid.initialize({theme: "neutral"});

export function ChallengeDisplay({ challenge, index }: Props) {
    const { name, flowchart } = challenge
    const mermaidRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initializeMermaid = async () => {
            if (mermaidRef.current) {
                mermaidRef.current.innerHTML = flowchart;
                const { svg, bindFunctions } = await mermaid.render(`mermaid-diagram-${index}`, flowchart);
                mermaidRef.current.innerHTML = svg;
                bindFunctions?.(mermaidRef.current);
            }
        };

        initializeMermaid();
    }, [flowchart]);

    return (
        <>
            <h6>{name}</h6>
            <div id={`${index}`} ref={mermaidRef}></div>
        </>
    )
}
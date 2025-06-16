import './ArchetypeDisplay.css'

import Body from "../../../../../../../../components/UI/body/Body";
import { ArchetypeInfo } from "../../../../../../../../interfaces/infoInterfaces/socialInfo";

interface Props {
    archetypeInfo: ArchetypeInfo,
    points: number
}

export default function ArchetypeDisplay({ archetypeInfo, points }: Props) {
    const { hasarchetypes, hasmonsterarchetypes, normalArchetypes, monsterArchetypes } = archetypeInfo

    let archetypeElements;
    if (hasarchetypes) {
        // TODO: Deviation and reversal notation
        archetypeElements = <p>{normalArchetypes.archetype}</p>
    } else if (hasmonsterarchetypes) {
        archetypeElements = <>{monsterArchetypes.archetype.map((archetype, index) => <p key={index}>{archetype}</p>)}</>
    }

    // TODO: the difficulty die display

    return (
        <>
            {archetypeElements &&
            <div className='archetype-display-shell'>
                <h3>Archetype Info</h3>
                <Body>
                    {archetypeElements}
                </Body>
            </div>
            }
        </>
    )
}
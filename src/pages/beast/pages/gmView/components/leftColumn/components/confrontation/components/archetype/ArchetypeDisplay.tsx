import './ArchetypeDisplay.css'

import Body from "../../../../../../../../components/UI/body/Body";
import { ArchetypeInfo } from "../../../../../../../../interfaces/infoInterfaces/socialInfo";
import Pair from '../../../../../../../../components/UI/pair/Pair';

interface Props {
    archetypeInfo: ArchetypeInfo,
    points: number
}

export default function ArchetypeDisplay({ archetypeInfo }: Props) {
    const { hasarchetypes, hasmonsterarchetypes, normalArchetypes, monsterArchetypes, difficultyDie } = archetypeInfo

    let archetypeElements;
    if (hasarchetypes) {
        // TODO: display reversal and deviation
        archetypeElements = <Pair title={normalArchetypes.archetype} info={difficultyDie} format={{ title: 'none', position: 'opposite', titleJustified: 'left' }} />
    } else if (hasmonsterarchetypes) {
        archetypeElements = (
            <div className='monster-archetype-shell'>
                <div>
                    {monsterArchetypes.archetype.map((archetype, index) => <p key={index}>{archetype}</p>)}
                </div>
                <p>{difficultyDie}</p>
            </div>
        )
    }

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
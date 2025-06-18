import './ArchetypeDisplay.css'

import Body from "../../../../../../../../components/UI/body/Body";
import { ArchetypeInfo } from "../../../../../../../../interfaces/infoInterfaces/socialInfo";
import Pair from '../../../../../../../../components/UI/pair/Pair';
import Icon, { IconName } from '../../../../../../../../../../components/icon/Icon';

interface Props {
    archetypeInfo: ArchetypeInfo,
    points: number,
    setHasArchetypes: Function
}

export default function ArchetypeDisplay({ archetypeInfo, setHasArchetypes }: Props) {
    const { hasarchetypes, hasmonsterarchetypes, normalArchetypes, monsterArchetypes, difficultyDie } = archetypeInfo

    let archetypeElements;
    if (hasarchetypes) {
        let tooltip = ''
        let iconName: IconName = 'd20'
        if (normalArchetypes.reverse) {
            tooltip = "Completely reverse this Archetype.\nExample: 'Rogue with a heart of gold' > 'A nice guy with a vile heart'"
            iconName = 'reversal'
        } else if (normalArchetypes.deviation) {
            tooltip = "Change one thing about this Archetype.\nExample: 'Rogue with a heart of gold' > 'A rogue with a vile heart'"
            iconName = 'deviation'
        }

        archetypeElements = (
            <span>
                <Icon iconName={iconName} margin='right' float='left' tooltip={tooltip} />
                <Pair title={normalArchetypes.archetype} info={difficultyDie} format={{ title: 'none', position: 'opposite', titleJustified: 'left' }} />
            </span>
        )
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

    console.log(archetypeElements)
    setHasArchetypes(!!archetypeElements)

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
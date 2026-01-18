import './ArchetypeDisplay.css'
import { ArchetypeInfo } from '@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces';
import Icon, { IconName } from '../../../../../../../../../../../../components/icon/Icon';
import Body from '../../../../../../../../../components/UI/body/Body';
import Pair from '../../../../../../../../../components/UI/pair/Pair';

import { useEffect, useState } from 'react';

interface Props {
    archetypeInfo: ArchetypeInfo,
    points: number,
    setHasArchetypes: Function
}

export default function ArchetypeDisplay({ archetypeInfo, setHasArchetypes }: Props) {
    const { hasArchetypes, hasMonsterArchetypes, normalArchetypes, monsterArchetypes, baseRank } = archetypeInfo

    const [currentHasMonsterArchetype, setCurrentHasMonsterArchetypes] = useState(false)
    const [currentHasArchetype, setCurrentHasArchetypes] = useState(false)

    useEffect(() => {
        if (currentHasMonsterArchetype !== hasMonsterArchetypes) {
            setCurrentHasMonsterArchetypes(hasMonsterArchetypes)
            setHasArchetypes(hasMonsterArchetypes)
        } else if (currentHasArchetype !== hasArchetypes) {
            setCurrentHasArchetypes(hasArchetypes)
            setHasArchetypes(hasArchetypes)
        }
    })

    let tooltip = ''
    let iconName: IconName = 'd20'
    if (hasArchetypes) {
        if (normalArchetypes?.reverse) {
            tooltip = "Completely reverse this Archetype.\nExample: 'Rogue with a heart of gold' > 'A nice guy with a vile heart'"
            iconName = 'reversal'
        } else if (normalArchetypes?.deviation) {
            tooltip = "Change one thing about this Archetype.\nExample: 'Rogue with a heart of gold' > 'A rogue with a vile heart'"
            iconName = 'deviation'
        }
    }

    const hasSomethingToDisplay = hasMonsterArchetypes || hasArchetypes

    return (
        <>
            {hasSomethingToDisplay &&
                <div className='archetype-display-shell'>
                    <h3>Archetype Info</h3>
                    <Body>
                        <>
                            {hasMonsterArchetypes &&
                                <div className='monster-archetype-shell'>
                                    <div>
                                        {monsterArchetypes?.archetype.map((archetype, index) => <p key={index}>{archetype}</p>)}
                                    </div>
                                    <p>{baseRank}</p>
                                </div>
                            }
                            {(hasArchetypes && normalArchetypes) &&
                                <span>
                                    {tooltip && <Icon iconName={iconName} margin='right' float='left' tooltip={tooltip} />}
                                    <Pair title={normalArchetypes?.archetype} info={baseRank} format={{ title: 'none', position: 'opposite', titleJustified: 'left' }} />
                                </span>
                            }
                        </>
                    </Body>
                </div>
            }
        </>
    )
}
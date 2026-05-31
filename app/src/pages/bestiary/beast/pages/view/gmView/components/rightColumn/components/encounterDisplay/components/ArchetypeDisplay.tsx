import './ArchetypeDisplay.css'
import Icon, { IconName } from '../../../../../../../../../../../components/icon/Icon';
import Body from '../../../../../../../../components/UI/body/Body';
import Pair from '../../../../../../../../components/UI/pair/Pair';

import { useEffect, useState } from 'react';
import { ArchetypeInfo } from '@bestiary/common/interfaces/encounterInterfaces';

interface Props {
    archetypeInfo: ArchetypeInfo | undefined,
}

export default function ArchetypeDisplay({ archetypeInfo }: Props) {
    if (!archetypeInfo) { return <></> }

    const { type, archetype } = archetypeInfo

    if (type === 'monster') {
        const [first, second] = archetype
        return (
            <div className='number-appearing-shell'>
                <h3>Archetype </h3>
                <p>{first} & {second}</p>
            </div>
        )
    }

    const { reverse, deviation } = archetypeInfo

    let tooltip = ''
    let iconName: IconName = 'd20'

    if (reverse) {
        tooltip = "Completely reverse this Archetype.\nExample: 'Rogue with a heart of gold' > 'A nice guy with a vile heart'"
        iconName = 'reversal'
    } else if (deviation) {
        tooltip = "Change one thing about this Archetype.\nExample: 'Rogue with a heart of gold' > 'A rogue with a vile heart'"
        iconName = 'deviation'
    }

    return (
        <div className='number-appearing-shell'>
            <h3>Archetype </h3>
            <span>
                <p>{archetype}</p>
                {tooltip && <Icon iconName={iconName} margin='left' tooltip={tooltip} />}
            </span>
        </div>
    )
}
import './SpellsDisplay.css'

import Body from '../../../../../../../components/UI/body/Body'
import SpellDisplay from './spell/SpellDisplay'
import { Spell } from '@bestiary/common/interfaces/beast/infoInterfaces/castingInfo'

interface Props {
    spells: Spell[],
    systemPreference: 0 | 1 | 2 | undefined
}

export default function SpellsDisplay({ spells, systemPreference }: Props) {
    return (
        <Body>
            <div className='spells-display-shell'>
                {spells.map((spell, index) => <SpellDisplay key={index} spell={spell} systemPreference={systemPreference} />)}
            </div>
        </Body>
    )
}
import './SpellsDisplay.css'

import Body from '../../../../../../../components/UI/body/Body'
import SpellDisplay from './spell/SpellDisplay'
import { Spell } from '@bestiary/common/interfaces/beast/infoInterfaces/castingInfo'

interface Props {
    spells: Spell[]
}

export default function SpellsDisplay({ spells }: Props) {
    return (
        <Body>
            <div className='spells-display-shell'>
                {spells.map((spell, index) => <SpellDisplay key={index} spell={spell} />)}
            </div>
        </Body>
    )
}
import './SpellDisplay.css'

import { Spell } from '../../../../../../../interfaces/infoInterfaces.ts/castingInfo'

interface Props {
    spell: Spell
}

export default function SpellDisplay({ spell }: Props) {
    const { name } = spell
    return (
        <div className='spell-display-shell'>
            {name}
        </div>
    )
}
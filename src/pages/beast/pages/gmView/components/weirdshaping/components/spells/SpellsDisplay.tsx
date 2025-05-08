import { Spell } from '../../../../../../interfaces/infoInterfaces.ts/castingInfo'
import SpellDisplay from './spell/SpellDisplay'
import './SpellsDisplay.css'

interface Props {
    spells: Spell[]
}

export default function SpellsDisplay({ spells }: Props) {
    return (
        <div className='spells-display-shell'>
            {spells.map((spell, index) => <SpellDisplay key={index} spell={spell} />)}
        </div>
    )
}
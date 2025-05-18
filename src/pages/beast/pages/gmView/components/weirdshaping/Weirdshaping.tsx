import './Weirdshaping.css'

import CastingClass from './models/CastingClass'
import CastingTypeSelect from './components/casting/CastingTypeSelect'
import { Spell } from '../../../../interfaces/infoInterfaces.ts/castingInfo'
import SpellsDisplay from './components/spells/SpellsDisplay'

interface Props {
    castingTypes: CastingClass,
    spells: Spell[]
}

export default function Weirdshaping({ castingTypes, spells }: Props) {
    return (
        <>
            <h2 className='border'>Weirdshaping</h2>
            <CastingTypeSelect castingTypes={castingTypes} />
            <SpellsDisplay spells={spells} />
        </>
    )
}
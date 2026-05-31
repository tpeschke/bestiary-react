import './Weirdshaping.css'

import CastingClass from './models/CastingClass'
import CastingTypeSelect from './components/casting/CastingTypeSelect'
import SpellsDisplay from './components/spells/SpellsDisplay'
import { Spell } from '@bestiary/common/interfaces/beast/infoInterfaces/castingInfo'
import { useSelector } from 'react-redux'
import { getSystemPreference } from '../../../../../../../../redux/slices/userSlice'
import { BONFIRE } from '@bestiary/common/utilities/get/getSystemString'

interface Props {
    castingTypes: CastingClass,
    spells: Spell[],
}

export default function Weirdshaping({ castingTypes, spells }: Props) {
    const systemPreference = useSelector(getSystemPreference) as 0 | 1 | 2 | undefined
    
    return (
        <>
            {spells?.length > 0 && (
                <>
                    <h2 className='border'>{systemPreference === BONFIRE ? 'Weirdshaping' : 'Spell Casting'}</h2>
                    <CastingTypeSelect castingTypes={castingTypes} systemPreference={systemPreference} />
                    <SpellsDisplay spells={spells} systemPreference={systemPreference} />
                </>
            )}
        </>
    )
}
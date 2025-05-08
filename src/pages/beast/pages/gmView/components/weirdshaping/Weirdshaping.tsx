import './Weirdshaping.css'

import CastingTypeSelect from './components/CastingTypeSelect'
import CastingClass from '../../../../models/casting/CastingClass'

interface Props {
    castingTypes: CastingClass
}

export default function Weirdshaping({ castingTypes }: Props) {
    return (
        <>
            <h2 className='border'>Weirdshaping</h2>
            <CastingTypeSelect castingTypes={castingTypes} />
        </>
    )
}
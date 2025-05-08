import { useEffect, useState } from 'react'
import CastingClass, { CastingDisplayType } from '../../../../../models/casting/CastingClass'
import '../Weirdshaping.css'

interface Props {
    castingTypes: CastingClass
}

export default function CastingTypeSelect({ castingTypes }: Props) {
    const [selected, setSelected] = useState<number>()

    useEffect(() => {
        if (!selected) {
            setSelected(castingTypes.getIntialSelected)
        }
     }, [])

    return (
        <>
            <div className='casting-selection-shell'>
                <select value={selected} onChange={event => setSelected(+event.target.value)}>
                    {castingTypes.castingOptions.map(({value, displayName}: CastingDisplayType, index) => {
                        return <option key={index} value={value}>{displayName}</option>
                    })}
                </select>
                {/* How to Use */}
            </div>
            <div className='casting-explanation-shell'>
                {/* How to Use */}
            </div>
            <div className='casting-info-shell'>
                {/* Casting Type Info */}
            </div>
        </>
    )
}
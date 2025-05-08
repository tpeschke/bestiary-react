import { useEffect, useState } from 'react'
import { Casting } from '../../../../../interfaces/infoInterfaces.ts/castingInfo'
import CastingClass, { CastingDisplayType } from '../models/CastingClass'
import '../Weirdshaping.css'

interface Props {
    castingTypes: Casting
}

export default function CastingTypeSelect({ castingTypes }: Props) {
    const castingInfo = new CastingClass(castingTypes)

    const [selected, setSelected] = useState<number>()

    useEffect(() => {
        if (!selected) {
            setSelected(castingInfo.getIntialSelected)
        }
     }, [])

    return (
        <>
            <div className='casting-selection-shell'>
                <select value={selected} onChange={event => setSelected(+event.target.value)}>
                    {castingInfo.castingOptions.map(({value, displayName}: CastingDisplayType, index) => {
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
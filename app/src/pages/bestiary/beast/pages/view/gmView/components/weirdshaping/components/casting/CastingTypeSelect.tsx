import '../../Weirdshaping.css'

import { useEffect, useState } from 'react'

import CastingClass, { CastingDisplayType } from '../../models/CastingClass'

import CastingRules from './CastingRules'
import Body from '../../../../../../../components/UI/body/Body'

interface Props {
    castingTypes: CastingClass
}

export default function CastingTypeSelect({ castingTypes }: Props) {
    const [selected, setSelected] = useState<number>()
    const [showExplanation, setShowExplanation] = useState(false)

    useEffect(() => {
        if (!selected) {
            setSelected(castingTypes.getIntialSelected)
        }
    }, [])

    return (
        <Body>
            <>
                <div className='casting-selection-shell'>
                    <select value={selected} onChange={event => setSelected(+event.target.value)}>
                        {castingTypes.castingOptions.map(({ value, displayName }: CastingDisplayType, index) => {
                            return <option key={index} value={value}>{displayName}</option>
                        })}
                    </select>
                    <button className='blue' onClick={_ => setShowExplanation(!showExplanation)}>{showExplanation ? 'Hide' : 'Show'} How to Use</button>
                </div>
                <div className={showExplanation ? 'casting-explanation-shell' : 'displayNone'}>
                    <h3>How To Use</h3>
                    <Body>
                        <>
                            <p className='bottom-margin'>These rules are to add variation and mimic different types of casting - giving an approximation of their strengths and weaknesses that players can use and plan around.</p>
                            <p className='bottom-margin'>Some casting types will give points. If you get points, you can add it to Range, Interval, or Effect - anywhere there’s a static number.</p>
                            <p>For the most part, this is just a simple addition (1 Hour becomes 2 Hours, a +1 becomes a +2).</p>
                        </>
                    </Body>
                </div>
                {selected &&
                    <div className='casting-info-shell'>
                        <Body>
                            <CastingRules index={selected} spellnumberdie={castingTypes.getSpellNumberDie} />
                        </Body>
                    </div>
                }
            </>
        </Body>
    )
}
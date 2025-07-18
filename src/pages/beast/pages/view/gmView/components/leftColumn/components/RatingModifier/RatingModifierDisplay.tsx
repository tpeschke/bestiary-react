import './RatingModifierDisplay.css'
import QuickLink from '../../../../../../../components/QuickLink'
import { UpdateRoleModifierFunction } from '../../../../../../../hooks/beastHooks'

interface Props {
    updateRoleModifier: UpdateRoleModifierFunction,
    modifierIndex: number,
    copyQuickLink: Function,
    hasModifier: boolean
}

export default function RatingModifierDisplay({ updateRoleModifier, modifierIndex, copyQuickLink, hasModifier }: Props) {
    const modifierDictionary = [
        'None',
        'Unique',
        'Greater',
        'Dread',
        'THE'
    ]

    return (
        <div className='rating-modifier-shell'>
            <h2>Skull Modifier</h2>
            <select value={modifierIndex} onChange={event => updateRoleModifier(+event.target.value)}>
                {modifierDictionary.map((modifier: string, index: number) => {
                    return <option key={index} value={index}>{modifier}</option>
                })}
            </select>
            {hasModifier && <QuickLink copyQuickLink={copyQuickLink} hasModifier={hasModifier} />}
        </div>
    )
}
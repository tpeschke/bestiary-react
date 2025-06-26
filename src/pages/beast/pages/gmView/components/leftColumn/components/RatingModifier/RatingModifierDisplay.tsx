import { UpdateRoleModifierFunction } from '../../../../../../hooks/beastHooks'
import './RatingModifierDisplay.css'

interface Props {
    updateRoleModifier: UpdateRoleModifierFunction
}

export default function RatingModifierDisplay({ updateRoleModifier }: Props) {
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
            <select onChange={event => updateRoleModifier(+event.target.value)}>
                {modifierDictionary.map((modifier: string, index: number) => {
                    return <option key={index} value={index}>{modifier}</option>
                })}
            </select>
        </div>
    )
}
import './RatingModifierDisplay.css'
import QuickLink from '../../../../../../../components/QuickLink'
import { UpdateRoleModifierFunction } from '../../../../../../../hooks/beastHooks'
import { SystemOption } from '@bestiary/common/interfaces/beast/beast'

interface Props {
    updateRoleModifier: UpdateRoleModifierFunction,
    modifierIndex: number,
    copyQuickLink: Function,
    hasModifier: boolean,
    system: SystemOption
}

export default function RatingModifierDisplay({ updateRoleModifier, modifierIndex, copyQuickLink, hasModifier, system }: Props) {
    const modifierDictionary = [
        'None',
        'Unique',
        'Greater',
        'Dread',
        'THE'
    ]

    return (
        <div className='rating-modifier-shell'>
            <h2>{system === 'Bonfire' ? 'Skull' : 'EP'} Modifier</h2>
            <select value={modifierIndex} onChange={event => updateRoleModifier(+event.target.value)}>
                {modifierDictionary.map((modifier: string, index: number) => {
                    return <option key={index} value={index}>{modifier}</option>
                })}
            </select>
            {hasModifier && <QuickLink copyQuickLink={copyQuickLink} hasModifier={hasModifier} />}
        </div>
    )
}
import Select from 'react-select'
import { AttackReference } from '../../../../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces'
import getSituationOptions from './utilities/situationOptions'
import { updateCombatInfoFunction } from '../../../../../../../../../hooks/beastHooks'


interface Props {
    attackReference: AttackReference,
    combatRoleType: string | null,
    updateAttackInfo: updateCombatInfoFunction,
}

export default function ReferenceEdit({ attackReference, combatRoleType, updateAttackInfo }: Props) {
    const { reference, overAllIndex } = attackReference

    return (
        <div className='attack-edit-select-shell'>
            <Select
                isSearchable
                value={{ value: reference, label: reference }}
                options={getSituationOptions(combatRoleType)}
                onChange={(event: any) => updateAttackInfo('reference', event.value, overAllIndex)}
            />
        </div>
    )
}
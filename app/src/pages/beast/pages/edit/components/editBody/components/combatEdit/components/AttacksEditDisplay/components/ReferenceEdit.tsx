import Select from 'react-select'
import { AttackReference } from '@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces'
import getSituationOptions from './utilities/situationOptions'
import { UpdateCombatInfoFunction } from '../../../../../../../../../hooks/beastHooks'
import { getTacticOptionsForEdit } from '../../../../../../../../../utilities/tacticOptions'

interface Props {
    attackReference: AttackReference,
    combatRoleType: string | null,
    updateAttackInfo: UpdateCombatInfoFunction,
}

export default function ReferenceEdit({ attackReference, combatRoleType, updateAttackInfo }: Props) {
    const { reference, overAllIndex, situation, tactic } = attackReference

    return (
        <div className='attack-edit-row'>
            <p></p>
            <p></p>
            <div className='attack-edit-select-shell'>
                <Select
                    isSearchable
                    value={{ value: situation, label: situation }}
                    options={getSituationOptions(combatRoleType)}
                    onChange={(event: any) => updateAttackInfo('situation', event.value, overAllIndex)}
                />
            </div>
            <div className='attack-edit-select-shell'>
                <Select
                    isSearchable
                    value={{ value: reference, label: reference }}
                    options={getSituationOptions(combatRoleType)}
                    onChange={(event: any) => updateAttackInfo('reference', event.value, overAllIndex)}
                />
            </div>
            <div className='attack-edit-select-shell'>
                <Select
                    isSearchable
                    value={{ value: tactic, label: tactic }}
                    options={getTacticOptionsForEdit()}
                    onChange={(event: any) => updateAttackInfo('tactic', event.value, overAllIndex)}
                />
            </div>
        </div>
    )
}
import Select from 'react-select'
import { AttackReference } from '@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces'
import getSituationOptions from './utilities/situationOptions'
import { getTacticOptionsForEdit } from '../../../../../../../../../utilities/tacticOptions'
import Icon from '../../../../../../../../../../../../components/icon/Icon'
import { UpdateAttackDefenseInfoFunction, RemoveCombatFunction } from '../../../../../../../../../hooks/updateUtilities/interfaces/updateInterfaces'

interface Props {
    attackReference: AttackReference,
    combatRoleType: string | null,
    updateAttackInfo: UpdateAttackDefenseInfoFunction,
    removeAttack: RemoveCombatFunction
}

export default function ReferenceEdit({ 
    attackReference, 
    combatRoleType, 
    updateAttackInfo,
    removeAttack 
}: Props) {
    const { reference, overAllIndex, situation, tactic } = attackReference

    return (
        <div className='attack-edit-row'>
            <p></p>
            <p></p>
            <p className='input-header'></p>
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
            <button className="orange" onClick={_ => removeAttack(overAllIndex)}>
                <Icon iconName='trash' color='white' />
            </button>
        </div>
    )
}
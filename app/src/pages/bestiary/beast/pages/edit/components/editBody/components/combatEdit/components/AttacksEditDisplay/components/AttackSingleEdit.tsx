import Select from 'react-select'
import { AllSpecificWeaponInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import getSituationOptions from "./utilities/situationOptions"
import { getTacticOptionsForEdit } from '../../../../../../../../../utilities/tacticOptions'
import Icon from '../../../../../../../../../../../../components/icon/Icon'
import getDamageTypeOptions, { getDamageTypeLabel, getDamageTypeValue } from './utilities/damageTypeOptions'
import { UpdateAttackDefenseStatsFunction, RemoveCombatFunction } from '../../../../../../../../../hooks/updateUtilities/interfaces/updateInterfaces'
import AttackInfoEdit from '../../../../components/info/AttackInfoEdit'

interface Props {
    attackInfo: AllSpecificWeaponInfo,
    updateAttackStats: UpdateAttackDefenseStatsFunction
    combatRoleType: string | null,
    removeAttack: RemoveCombatFunction
}

export default function AttackSingleEdit({
    attackInfo,
    updateAttackStats,
    combatRoleType,
    removeAttack
}: Props) {
    const { name, weapon, overAllIndex, situation, tactic, damageType, info } = attackInfo

    return (
        <div className='attack-edit-row-shell'>
            <div className='attack-edit-row'>
                <p>{name ? name : ''}</p>
                <p>{weapon ? weapon : ''}</p>
                <div className='attack-edit-select-shell'>
                    <Select
                        isSearchable
                        value={{ label: getDamageTypeLabel(damageType), value: getDamageTypeValue(damageType) }}
                        options={getDamageTypeOptions()}
                        onChange={(event: any) => updateAttackStats('damageType', event.value, overAllIndex)}
                    />
                </div>
                <div className='attack-edit-select-shell'>
                    <Select
                        isSearchable
                        value={{ value: situation, label: situation }}
                        options={getSituationOptions(combatRoleType)}
                        onChange={(event: any) => updateAttackStats('situation', event.value, overAllIndex)}
                    />
                </div>
                <p className='input-header'></p>
                <div className='attack-edit-select-shell'>
                    <Select
                        isSearchable
                        value={{ value: tactic, label: tactic }}
                        options={getTacticOptionsForEdit()}
                        onChange={(event: any) => updateAttackStats('tactic', event.value, overAllIndex)}
                    />
                </div>
                <button className="orange" onClick={_ => removeAttack(overAllIndex)}>
                    <Icon iconName='trash' color='white' />
                </button>
            </div>
            <div className='attack-edit-row info-edit-helper'>
                <em>Hover for Special Atk / Defense Info</em>
            </div>
            <div className='attack-edit-row info-edit'>
                <AttackInfoEdit attackInfo={info} statKey='info' updateAttackInfo={(key: string, value: any): void => {
                    updateAttackStats(key, value, overAllIndex)
                }} />
            </div>
        </div>
    )
}
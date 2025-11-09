import Select from 'react-select'
import { DamageType, WeaponInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { RemoveCombatFunction, UpdateCombatInfoFunction } from "../../../../../../../../../hooks/beastHooks"
import getSituationOptions from "./utilities/situationOptions"
import { getTacticOptionsForEdit } from '../../../../../../../../../utilities/tacticOptions'
import Icon from '../../../../../../../../../../../components/icon/Icon'
import getDamageTypeOptions, { getDamageTypeLabel, getDamageTypeValue } from './utilities/damageTypeOptions'
import { useEffect, useState } from 'react'

interface Props {
    attackInfo: WeaponInfo,
    updateAttackInfo: UpdateCombatInfoFunction
    combatRoleType: string | null,
    removeAttack: RemoveCombatFunction
}

export default function AttackSingleEdit({
    attackInfo,
    updateAttackInfo,
    combatRoleType,
    removeAttack
}: Props) {
    const { name, weapon, overAllIndex, situation, tactic, damageType } = attackInfo

    return (
        <div className='attack-edit-row'>
            <p>{name ? name : ''}</p>
            <p>{weapon ? weapon : ''}</p>
            <div className='attack-edit-select-shell'>
                <Select
                    isSearchable
                    value={{label: getDamageTypeLabel(damageType), value: getDamageTypeValue(damageType)}}
                    options={getDamageTypeOptions()}
                    onChange={(event: any) => updateAttackInfo('damageType', event.value, overAllIndex)}
                />
            </div>
            <div className='attack-edit-select-shell'>
                <Select
                    isSearchable
                    value={{ value: situation, label: situation }}
                    options={getSituationOptions(combatRoleType)}
                    onChange={(event: any) => updateAttackInfo('situation', event.value, overAllIndex)}
                />
            </div>
            <p className='input-header'></p>
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
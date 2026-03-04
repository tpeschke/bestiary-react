import Select from 'react-select'
import { SpellReference } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import Icon from "../../../../../../../../../../../../components/icon/Icon"
import { UpdateAttackDefenseInfoFunction, RemoveCombatFunction } from "../../../../../../../../../hooks/updateUtilities/interfaces/updateInterfaces"
import getSituationOptions from "./utilities/situationOptions"
import { Spell } from '../../../../../../../../../interfaces/infoInterfaces/castingInfo'
import getSpellOptions from './utilities/spellOptions'

interface Props {
    spellReference: SpellReference,
    combatRoleType: string | null,
    updateAttackInfo: UpdateAttackDefenseInfoFunction,
    removeAttack: RemoveCombatFunction,
    spells: Spell[]
}

export default function SpellEdit({ spellReference, combatRoleType, updateAttackInfo, removeAttack, spells }: Props) {
    const { spellid, overAllIndex, situation } = spellReference

    return (
        <div className='attack-edit-row'>
            <p></p>
            <div className='attack-edit-select-shell spell'>
                <Select
                    isSearchable
                    value={{ value: spellid, label: spells.filter(spell => spellid === spell.id)[0]?.name }}
                    options={getSpellOptions(spells)}
                    onChange={(event: any) => updateAttackInfo('spellid', event.value, overAllIndex)}
                />
            </div>
            <p className='input-header'></p>
            <div className='attack-edit-select-shell'>
                <Select
                    isSearchable
                    value={{ value: situation, label: situation }}
                    options={getSituationOptions(combatRoleType)}
                    onChange={(event: any) => updateAttackInfo('situation', event.value, overAllIndex)}
                />
            </div>
            <p className='input-header'></p>
            <p className='input-header'></p>
            <button className="orange" onClick={_ => removeAttack(overAllIndex)}>
                <Icon iconName='trash' color='white' />
            </button>
        </div>
    )
}
import Select from 'react-select'
import { WeaponInfo } from "../../../../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { UpdateCombatInfoFunction } from "../../../../../../../../../hooks/beastHooks"
import getSituationOptions from "./utilities/situationOptions"
import { getTacticOptionsForEdit } from '../../../../../../../../../utilities/tacticOptions'

interface Props {
    attackInfo: WeaponInfo,
    updateAttackInfo: UpdateCombatInfoFunction
    combatRoleType: string | null
}

export default function AttackSingleEdit({
    attackInfo,
    updateAttackInfo,
    combatRoleType
}: Props) {
    const { name, weapon, overAllIndex, situation, tactic } = attackInfo

    return (
        <>
            {name ? name : '_'}
            {weapon ? weapon : '_'}
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
                    value={{ value: tactic, label: tactic }}
                    options={getTacticOptionsForEdit()}
                    onChange={(event: any) => updateAttackInfo('tactic', event.value, overAllIndex)}
                />
            </div>
        </>
    )
}
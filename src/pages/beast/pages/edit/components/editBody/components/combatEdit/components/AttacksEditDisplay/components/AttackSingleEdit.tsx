import Select from 'react-select'
import { AttackInfo } from "../../../../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { UpdateOrderFunction, updateAttackInfoFunction } from "../../../../../../../../../hooks/beastHooks"
import getSituationOptions from "./utilities/situationOptions"
import MoveOrderButton from "./MoveOrderButton"
import { getTacticOptionsForEdit } from '../../../../../../../../../utilities/tacticOptions'

interface Props {
    attackInfo: AttackInfo,
    index: number,
    arrayLength: number,
    nextUp: number,
    nextDown: number,
    updateAttackOrder: UpdateOrderFunction,
    updateAttackInfo: updateAttackInfoFunction
    combatRoleType: string | null
}

export default function AttackSingleEdit({
    attackInfo,
    index,
    arrayLength,
    nextUp,
    nextDown,
    updateAttackOrder,
    updateAttackInfo,
    combatRoleType
}: Props) {
    const { name, weapon, overAllIndex, situation, tactic } = attackInfo

    return (
        <div className='attack-edit-shell'>
            {MoveOrderButton(index > 0, 'up', updateAttackOrder, overAllIndex, nextUp)}
            {MoveOrderButton(index < arrayLength - 1, 'down', updateAttackOrder, overAllIndex, nextDown)}
            {overAllIndex}
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
        </div>
    )
}
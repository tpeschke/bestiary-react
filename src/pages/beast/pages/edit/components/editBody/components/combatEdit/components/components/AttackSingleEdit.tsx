import Select from 'react-select'
import { AttackInfo } from "../../../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { UpdateOrderFunction, UpdateSituationFunction } from "../../../../../../../../hooks/beastHooks"
import getSituationOptions from "../utilities/situationOptions"
import MoveOrderButton from "./MoveOrderButton"

interface OptionProp {
    value: string,
    label: string,
}

interface Props {
    attackInfo: AttackInfo,
    index: number,
    arrayLength: number,
    nextUp: number,
    nextDown: number,
    updateAttackOrder: UpdateOrderFunction,
    updateSituation: UpdateSituationFunction
    combatRoleType: string | null
}

export default function AttackSingleEdit({
    attackInfo,
    index,
    arrayLength,
    nextUp,
    nextDown,
    updateAttackOrder,
    updateSituation,
    combatRoleType
}: Props) {
    const { name, weapon, overAllIndex, situation } = attackInfo

    console.log(combatRoleType)

    function getSituation(selectedOption: OptionProp, overAllIndex: number) {
        updateSituation(selectedOption.value, overAllIndex)
    }

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
                    onChange={(event: any) => getSituation(event, overAllIndex)}
                />
            </div>
        </div>
    )
}
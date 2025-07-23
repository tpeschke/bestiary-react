import { DefenseInfo } from "../../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import Icon from "../../../../../../../../../components/icon/Icon"
import Body from "../../../../../../../components/UI/body/Body"
import { RemoveDefenseFunction, updateCombatInfoFunction, UpdateOrderFunction } from "../../../../../../../hooks/beastHooks"
import MoveOrderButton from "./AttacksEditDisplay/components/MoveOrderButton"

interface Props {
    defenses: DefenseInfo[],
    updateDefenseInfo: updateCombatInfoFunction,
    updateDefenseOrder: UpdateOrderFunction,
    removeDefense: RemoveDefenseFunction,
}

export default function DefenseEditDisplay({ defenses, updateDefenseOrder, removeDefense, updateDefenseInfo }: Props) {
    return (
        <Body>
            <>
                <h2 className="border">Defenses</h2>
                {defenses.map((attack: DefenseInfo, index: number) => {
                    const nextUp = defenses[index - 1]?.overAllIndex
                    const nextDown = defenses[index + 1]?.overAllIndex

                    return DefenseEdit(attack, index, defenses.length, nextUp, nextDown, updateDefenseOrder, removeDefense, updateDefenseInfo)
                })}
            </>
        </Body>
    )
}

function DefenseEdit(
    { overAllIndex, defensename }: DefenseInfo,
    index: number,
    arrayLength: number,
    nextUp: number,
    nextDown: number,
    updateDefenseOrder: UpdateOrderFunction,
    removeDefense: RemoveDefenseFunction,
    updateDefenseInfo: updateCombatInfoFunction
) {
    return (
        <div key={index}>
            {MoveOrderButton(index > 0, 'up', updateDefenseOrder, overAllIndex, nextUp)}
            {MoveOrderButton(index < arrayLength - 1, 'down', updateDefenseOrder, overAllIndex, nextDown)}
            {overAllIndex} 
            <input placeholder="Defense Name" value={defensename} onBlur={event => updateDefenseInfo('defensename', event.target.value, overAllIndex)} />
            <button className="orange" onClick={_ => removeDefense(overAllIndex)}>
                <Icon iconName='trash' color='white' />
            </button>
        </div>
    )
}
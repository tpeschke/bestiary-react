import { DefenseInfo } from "../../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import Icon from "../../../../../../../../../components/icon/Icon"
import Body from "../../../../../../../components/UI/body/Body"
import { RemoveDefenseFunction, UpdateOrderFunction } from "../../../../../../../hooks/beastHooks"
import MoveOrderButton from "./components/MoveOrderButton"

interface Props {
    defenses: DefenseInfo[],
    updateDefenseOrder: UpdateOrderFunction,
    removeDefense: RemoveDefenseFunction
}

export default function DefenseEditDisplay({ defenses, updateDefenseOrder, removeDefense }: Props) {
    return (
        <Body>
            <>
                <h2 className="border">Defenses</h2>
                {defenses.map((attack: DefenseInfo, index: number) => {
                    const nextUp = defenses[index - 1]?.overAllIndex
                    const nextDown = defenses[index + 1]?.overAllIndex

                    return DefenseEdit(attack, index, defenses.length, nextUp, nextDown, updateDefenseOrder, removeDefense)
                })}
            </>
        </Body>
    )
}

function DefenseEdit(
    { name, overAllIndex }: DefenseInfo,
    index: number,
    arrayLength: number,
    nextUp: number,
    nextDown: number,
    updateDefenseOrder: UpdateOrderFunction,
    removeDefense: RemoveDefenseFunction
) {
    return (
        <div key={index}>
            {MoveOrderButton(index > 0, 'up', updateDefenseOrder, overAllIndex, nextUp)}
            {MoveOrderButton(index < arrayLength - 1, 'down', updateDefenseOrder, overAllIndex, nextDown)}
            {overAllIndex} {name ? name : '_'}
            <button className="orange" onClick={_ => removeDefense(overAllIndex)}>
                <Icon iconName='trash' color='white' />
            </button>
        </div>
    )
}
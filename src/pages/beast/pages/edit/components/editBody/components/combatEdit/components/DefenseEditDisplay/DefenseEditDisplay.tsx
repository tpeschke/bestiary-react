import './DefenseEditDisplay.css'
import { DefenseInfo } from "../../../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import Icon from "../../../../../../../../../../components/icon/Icon"
import Body from "../../../../../../../../components/UI/body/Body"
import { RemoveCombatFunction, UpdateCombatInfoFunction, UpdateOrderFunction } from "../../../../../../../../hooks/beastHooks"
import MoveOrderButton from "../AttacksEditDisplay/components/MoveOrderButton"

interface Props {
    defenses: DefenseInfo[],
    updateDefenseInfo: UpdateCombatInfoFunction,
    updateDefenseOrder: UpdateOrderFunction,
    removeDefense: RemoveCombatFunction,
}

export default function DefenseEditDisplay({ defenses, updateDefenseOrder, removeDefense, updateDefenseInfo }: Props) {
    return (
        <Body>
            <>
                <h2 className="border">Defenses</h2>
                <div className="defense-edit-header">
                    <div></div>
                    <p>Name</p>
                </div>
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
    removeDefense: RemoveCombatFunction,
    updateDefenseInfo: UpdateCombatInfoFunction
) {
    return (
        <div key={index} className="defense-edit-row">
            {MoveOrderButton(index > 0, 'up', updateDefenseOrder, overAllIndex, nextUp)}
            {MoveOrderButton(index < arrayLength - 1, 'down', updateDefenseOrder, overAllIndex, nextDown)}
            <input value={defensename} onChange={event => updateDefenseInfo('defensename', event.target.value, overAllIndex)} />
            <button className="orange" onClick={_ => removeDefense(overAllIndex)}>
                <Icon iconName='trash' color='white' />
            </button>
        </div>
    )
}
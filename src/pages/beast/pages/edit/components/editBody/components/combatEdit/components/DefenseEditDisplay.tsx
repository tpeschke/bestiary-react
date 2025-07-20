import { DefenseInfo } from "../../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import Icon from "../../../../../../../../../components/icon/Icon"
import Body from "../../../../../../../components/UI/body/Body"
import { updateOrderFunction } from "../../../../../../../hooks/beastHooks"

interface Props {
    defenses: DefenseInfo[],
    updateDefenseOrder: updateOrderFunction
}

export default function DefenseEditDisplay({ defenses, updateDefenseOrder }: Props) {
    return (
        <Body>
            <>
                <h2 className="border">Defenses</h2>
                {defenses.map((attack: DefenseInfo, index: number) => {
                    const nextUp = defenses[index - 1]?.overAllIndex
                    const nextDown = defenses[index + 1]?.overAllIndex

                    return DefenseEdit(attack, index, defenses.length, nextUp, nextDown, updateDefenseOrder)
                })}
            </>
        </Body>
    )
}

function DefenseEdit({ name, overAllIndex }: DefenseInfo, index: number, arrayLength: number, nextUp: number, nextDown: number, updateDefenseOrder: updateOrderFunction) {
    return (
        <div key={index}>
            {MoveOrderButton(index > 0, 'up', updateDefenseOrder, overAllIndex, nextUp)}
            {MoveOrderButton(index < arrayLength - 1, 'down', updateDefenseOrder, overAllIndex, nextDown)}
            {overAllIndex} {name ? name : '_'}
        </div>
    )
}

type DirectionOptions = 'down' | 'up'

function MoveOrderButton(active: boolean, direction: DirectionOptions, updateDefenseOrder: updateOrderFunction, overAllIndex: number, indexToMoveTo: number) {
    return (
        <>
            {active ? (
                <button onClick={_ => updateDefenseOrder(overAllIndex, indexToMoveTo)} >
                    <Icon iconName={direction} color='black' />
                </button>
            ) : (
                <button disabled={true}>
                    <Icon iconName={direction} color='white' />
                </button>
            )}
        </>
    )
}
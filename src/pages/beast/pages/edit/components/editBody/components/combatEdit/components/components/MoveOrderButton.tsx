import Icon from "../../../../../../../../../../components/icon/Icon"
import { UpdateOrderFunction } from "../../../../../../../../hooks/beastHooks"

export type DirectionOptions = 'down' | 'up'

export default function MoveOrderButton(active: boolean, direction: DirectionOptions, updateAttackOrder: UpdateOrderFunction, overAllIndex: number, indexToMoveTo: number) {
    return (
        <>
            {active ? (
                <button onClick={_ => updateAttackOrder(overAllIndex, indexToMoveTo)} >
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
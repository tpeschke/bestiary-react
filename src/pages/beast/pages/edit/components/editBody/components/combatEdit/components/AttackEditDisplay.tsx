import { AttackInfo } from "../../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import Icon from "../../../../../../../../../components/icon/Icon"
import Body from "../../../../../../../components/UI/body/Body"
import { updateAttackOrderFunction } from "../../../../../../../hooks/beastHooks"

interface Props {
    attacks: AttackInfo[],
    updateAttackOrder: updateAttackOrderFunction
}

export default function AttackEditDisplay({ attacks, updateAttackOrder }: Props) {
    return (
        <Body>
            <>
                <h1>Attacks</h1>
                {attacks.map((attack: AttackInfo, index: number) => {
                    const nextUp = attacks[index - 1]?.overAllIndex
                    const nextDown = attacks[index + 1]?.overAllIndex

                    return AttackEdit(attack, index, attacks.length, nextUp, nextDown, updateAttackOrder)
                })}
            </>
        </Body>
    )
}

function AttackEdit({ name, weapon, overAllIndex }: AttackInfo, index: number, arrayLength: number, nextUp: number, nextDown: number, updateAttackOrder: updateAttackOrderFunction) {
    return (
        <div key={index}>
            {MoveOrderButton(index > 0, 'up', updateAttackOrder, overAllIndex, nextUp)}
            {MoveOrderButton(index < arrayLength - 1, 'down', updateAttackOrder, overAllIndex, nextDown)}
            {index} {overAllIndex} {name ? name : '_'} {weapon ? weapon : '_'}
        </div>
    )
}

type DirectionOptions = 'down' | 'up'

function MoveOrderButton(active: boolean, direction: DirectionOptions, updateAttackOrder: updateAttackOrderFunction, overAllIndex: number, indexToMoveTo: number) {
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
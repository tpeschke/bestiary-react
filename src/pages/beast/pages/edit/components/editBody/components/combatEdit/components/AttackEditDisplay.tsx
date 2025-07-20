import { AttackInfo } from "../../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import Body from "../../../../../../../components/UI/body/Body"
import { UpdateOrderFunction } from "../../../../../../../hooks/beastHooks"
import MoveOrderButton from "./components/MoveOrderButton"

interface Props {
    attacks: AttackInfo[],
    updateAttackOrder: UpdateOrderFunction
}

export default function AttackEditDisplay({ attacks, updateAttackOrder }: Props) {
    return (
        <Body>
            <>
                <h2 className="border">Attacks</h2>
                {attacks.map((attack: AttackInfo, index: number) => {
                    const nextUp = attacks[index - 1]?.overAllIndex
                    const nextDown = attacks[index + 1]?.overAllIndex

                    return AttackEdit(attack, index, attacks.length, nextUp, nextDown, updateAttackOrder)
                })}
            </>
        </Body>
    )
}

function AttackEdit({ name, weapon, overAllIndex }: AttackInfo, index: number, arrayLength: number, nextUp: number, nextDown: number, updateAttackOrder: UpdateOrderFunction) {
    return (
        <div key={index}>
            {MoveOrderButton(index > 0, 'up', updateAttackOrder, overAllIndex, nextUp)}
            {MoveOrderButton(index < arrayLength - 1, 'down', updateAttackOrder, overAllIndex, nextDown)}
            {overAllIndex} {name ? name : '_'} {weapon ? weapon : '_'}
        </div>
    )
}
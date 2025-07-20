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
            {index > 0 ? (
                <button onClick={_ => updateAttackOrder(overAllIndex, nextUp)} >
                    <Icon iconName="up" color='black' />
                </button>
            ) : (
                <button disabled={true}>
                    <Icon iconName="up" color='gray' />
                </button>
            )
            }
            {index < arrayLength - 1 ? (
                <button onClick={_ => updateAttackOrder(overAllIndex, nextDown)} >
                    <Icon iconName="down" color='black' />
                </button>
            ) : (
                <button disabled={true}>
                    <Icon iconName="down" color='gray' />
                </button>
            )
            }
            {index} {overAllIndex} {name ? name : '_'} {weapon ? weapon : '_'}
        </div>
    )
}
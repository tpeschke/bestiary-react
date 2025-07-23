import './AttacksEditDisplay.css'
import { AttackInfo } from "../../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import Body from "../../../../../../../components/UI/body/Body"
import { UpdateOrderFunction, UpdateSituationFunction } from "../../../../../../../hooks/beastHooks"
import AttackSingleEdit from './components/AttackSingleEdit'

interface Props {
    attacks: AttackInfo[],
    updateAttackOrder: UpdateOrderFunction,
    updateSituation: UpdateSituationFunction,
    roleName: string | null
}


export default function AttacksEditDisplay({ attacks, updateAttackOrder, updateSituation, roleName }: Props) {
    return (
        <Body>
            <>
                <h2 className="border">Attacks</h2>
                {attacks.map((attack: AttackInfo, index: number) => {
                    const nextUp = attacks[index - 1]?.overAllIndex
                    const nextDown = attacks[index + 1]?.overAllIndex

                    return (
                        <AttackSingleEdit
                            attackInfo={attack}
                            index={index}
                            arrayLength={attacks.length}
                            nextUp={nextUp}
                            nextDown={nextDown}
                            updateAttackOrder={updateAttackOrder}
                            updateSituation={updateSituation}
                            roleName={roleName}
                        />
                    )
                })}
            </>
        </Body>
    )
}
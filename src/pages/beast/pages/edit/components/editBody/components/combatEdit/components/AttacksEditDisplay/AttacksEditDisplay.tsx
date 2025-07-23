import { AttackInfo } from '../../../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces'
import Body from '../../../../../../../../components/UI/body/Body'
import { UpdateOrderFunction, updateAttackInfoFunction } from '../../../../../../../../hooks/beastHooks'
import './AttacksEditDisplay.css'
import AttackSingleEdit from './components/AttackSingleEdit'

interface Props {
    attacks: AttackInfo[],
    updateAttackOrder: UpdateOrderFunction,
    updateAttackInfo: updateAttackInfoFunction,
    combatRoleType: string | null
}

export default function AttacksEditDisplay({ attacks, updateAttackOrder, updateAttackInfo, combatRoleType }: Props) {
    return (
        <Body>
            <>
                <h2 className="border">Attacks</h2>
                {attacks.map((attack: AttackInfo, index: number) => {
                    const nextUp = attacks[index - 1]?.overAllIndex
                    const nextDown = attacks[index + 1]?.overAllIndex

                    return (
                        <AttackSingleEdit
                            key={index}
                            attackInfo={attack}
                            index={index}
                            arrayLength={attacks.length}
                            nextUp={nextUp}
                            nextDown={nextDown}
                            updateAttackOrder={updateAttackOrder}
                            updateAttackInfo={updateAttackInfo}
                            combatRoleType={combatRoleType}
                        />
                    )
                })}
            </>
        </Body>
    )
}
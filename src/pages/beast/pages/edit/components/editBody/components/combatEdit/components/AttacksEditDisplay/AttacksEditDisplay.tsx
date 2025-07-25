import { AttackInfo } from '../../../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces'
import Body from '../../../../../../../../components/UI/body/Body'
import { UpdateOrderFunction, updateCombatInfoFunction } from '../../../../../../../../hooks/beastHooks'
import './AttacksEditDisplay.css'
import AttackSingleEdit from './components/AttackSingleEdit'
import MoveOrderButton from './components/MoveOrderButton'
import ReferenceEdit from './components/ReferenceEdit'

interface Props {
    attacks: AttackInfo[],
    updateAttackOrder: UpdateOrderFunction,
    updateAttackInfo: updateCombatInfoFunction,
    combatRoleType: string | null
}

export default function AttacksEditDisplay({ attacks, updateAttackOrder, updateAttackInfo, combatRoleType }: Props) {

    const getCorrectAttackEditOption = (key: number, attackInfo: AttackInfo, updateAttackInfo: updateCombatInfoFunction, combatRoleType: string | null) => {
        if (attackInfo.infoType === 'weapon') {
            return (
                <AttackSingleEdit
                    key={key}
                    attackInfo={attackInfo}
                    updateAttackInfo={updateAttackInfo}
                    combatRoleType={combatRoleType}
                />
            )
        } else if (attackInfo.infoType === 'reference') {
            return (
                <ReferenceEdit
                    key={key}
                    attackReference={attackInfo}
                    updateAttackInfo={updateAttackInfo}
                    combatRoleType={combatRoleType}
                />
            )
        }
    }

    return (
        <Body>
            <>
                <h2 className="border">Attacks</h2>
                {attacks.map((attack: AttackInfo, index: number) => {
                    const nextUp = attacks[index - 1]?.overAllIndex
                    const nextDown = attacks[index + 1]?.overAllIndex

                    return (
                        <div className='attack-edit-shell'>
                            {MoveOrderButton(index > 0, 'up', updateAttackOrder, attack.overAllIndex, nextUp)}
                            {MoveOrderButton(index < attacks.length - 1, 'down', updateAttackOrder, attack.overAllIndex, nextDown)}
                            {getCorrectAttackEditOption(index, attack, updateAttackInfo, combatRoleType)}
                        </div>
                    )
                })}
            </>
        </Body>
    )
}
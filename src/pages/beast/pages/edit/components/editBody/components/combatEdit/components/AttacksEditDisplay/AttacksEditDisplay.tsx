import { AttackInfo } from '../../../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces'
import Icon from '../../../../../../../../../../components/icon/Icon'
import Body from '../../../../../../../../components/UI/body/Body'
import { UpdateOrderFunction, UpdateCombatInfoFunction, AddAttackFunction } from '../../../../../../../../hooks/beastHooks'
import './AttacksEditDisplay.css'
import AttackSingleEdit from './components/AttackSingleEdit'
import MoveOrderButton from './components/MoveOrderButton'
import ReferenceEdit from './components/ReferenceEdit'

interface Props {
    attacks: AttackInfo[],
    updateAttackOrder: UpdateOrderFunction,
    updateAttackInfo: UpdateCombatInfoFunction,
    addAttack: AddAttackFunction,
    combatRoleType: string | null
}

export default function AttacksEditDisplay({ attacks, updateAttackOrder, updateAttackInfo, addAttack, combatRoleType }: Props) {

    const getCorrectAttackEditOption = (attackInfo: AttackInfo, updateAttackInfo: UpdateCombatInfoFunction, combatRoleType: string | null) => {
        if (attackInfo.infoType === 'weapon') {
            return (
                <AttackSingleEdit
                    attackInfo={attackInfo}
                    updateAttackInfo={updateAttackInfo}
                    combatRoleType={combatRoleType}
                />
            )
        } else if (attackInfo.infoType === 'reference') {
            return (
                <ReferenceEdit
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
                        <div key={index} className='attack-edit-shell'>
                            {MoveOrderButton(index > 0, 'up', updateAttackOrder, attack.overAllIndex, nextUp)}
                            {MoveOrderButton(index < attacks.length - 1, 'down', updateAttackOrder, attack.overAllIndex, nextDown)}
                            {getCorrectAttackEditOption(attack, updateAttackInfo, combatRoleType)}
                        </div>
                    )
                })}
                <div className='add-attack-button-shell'>
                    <button onClick={_ => addAttack({ infoType: 'reference', reference: '', overAllIndex: attacks.length })}><Icon iconName='plus' color='black' /> Reference</button>
                </div>
            </>
        </Body>
    )
}
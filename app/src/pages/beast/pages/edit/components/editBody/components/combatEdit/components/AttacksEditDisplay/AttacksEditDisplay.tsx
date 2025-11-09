import { AttackInfo } from '@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces'
import Icon from '../../../../../../../../../../components/icon/Icon'
import Body from '../../../../../../../../components/UI/body/Body'
import { UpdateOrderFunction, UpdateCombatInfoFunction, AddAttackFunction, RemoveCombatFunction } from '../../../../../../../../hooks/beastHooks'
import './AttacksEditDisplay.css'
import AttackSingleEdit from './components/AttackSingleEdit'
import MoveOrderButton from './components/MoveOrderButton'
import ReferenceEdit from './components/ReferenceEdit'

interface Props {
    attacks: AttackInfo[],
    updateAttackOrder: UpdateOrderFunction,
    updateAttackInfo: UpdateCombatInfoFunction,
    addAttack: AddAttackFunction,
    removeAttack: RemoveCombatFunction,
    combatRoleType: string | null
}

export default function AttacksEditDisplay({ attacks, updateAttackOrder, updateAttackInfo, addAttack, removeAttack, combatRoleType }: Props) {

    function getCorrectAttackEditOption(
        attackInfo: AttackInfo,
        updateAttackInfo: UpdateCombatInfoFunction,
        combatRoleType: string | null
    ) {
        if (attackInfo.infoType === 'weapon') {
            return (
                <AttackSingleEdit
                    attackInfo={attackInfo}
                    updateAttackInfo={updateAttackInfo}
                    combatRoleType={combatRoleType}
                    removeAttack={removeAttack}
                />
            )
        } else if (attackInfo.infoType === 'reference') {
            return (
                <ReferenceEdit
                    attackReference={attackInfo}
                    updateAttackInfo={updateAttackInfo}
                    combatRoleType={combatRoleType}
                    removeAttack={removeAttack}
                />
            )
        }
    }

    return (
        <Body>
            <>
                <h2 className="border">Attacks</h2>
                <div className='attack-edit-header'>
                    <div></div>
                    <p>Name</p>
                    <p>Weapon</p>
                    <p className='input-header'>Damage Type</p>
                    <p className='input-header'>Situation</p>
                    <p className='input-header'>Reference</p>
                    <p className='input-header'>Tactic</p>
                </div>

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
                    <button onClick={_ => addAttack({ infoType: 'reference', reference: '', overAllIndex: 0 })}><Icon iconName='plus' color='black' /> Reference</button>
                </div>
            </>
        </Body>
    )
}
import { AttackStats } from '@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces'
import Icon from '../../../../../../../../../../../components/icon/Icon'
import Body from '../../../../../../../../components/UI/body/Body'
import './AttacksEditDisplay.css'
import AttackSingleEdit from './components/AttackSingleEdit'
import MoveOrderButton from './components/MoveOrderButton'
import ReferenceEdit from './components/ReferenceEdit'
import { UpdateOrderFunction, UpdateAttackDefenseStatsFunction, AddAttackFunction, RemoveCombatFunction, UpdateFunction } from '../../../../../../../../hooks/updateUtilities/interfaces/updateInterfaces'
import SpellEdit from './components/SpellEdit'
import { Spell } from '@bestiary/common/interfaces/beast/infoInterfaces/castingInfo'
import AttackInfoEdit from '../../../components/info/AttackInfoEdit'
import { SystemInfoValue } from '@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces'

interface Props {
    attacks: AttackStats[],
    attackInfo: SystemInfoValue,
    roleAttackInfo?: SystemInfoValue,
    updateNonRoleInfo: UpdateFunction,
    updateAttackOrder: UpdateOrderFunction,
    updateAttackStats: UpdateAttackDefenseStatsFunction,
    addAttack: AddAttackFunction,
    removeAttack: RemoveCombatFunction,
    combatRoleType: string | null,
    spells: Spell[]
}

export default function AttacksEditDisplay({
    attacks, updateAttackOrder, attackInfo, roleAttackInfo, updateNonRoleInfo, updateAttackStats, addAttack, removeAttack, combatRoleType, spells
}: Props) {

    function getCorrectAttackEditOption(
        attackInfo: AttackStats,
        updateAttackStats: UpdateAttackDefenseStatsFunction,
        combatRoleType: string | null
    ) {
        if (attackInfo.infoType === 'weapon') {
            return (
                <AttackSingleEdit
                    attackInfo={attackInfo}
                    updateAttackStats={updateAttackStats}
                    combatRoleType={combatRoleType}
                    removeAttack={removeAttack}
                />
            )
        } else if (attackInfo.infoType === 'reference') {
            return (
                <ReferenceEdit
                    attackReference={attackInfo}
                    updateAttackStats={updateAttackStats}
                    combatRoleType={combatRoleType}
                    removeAttack={removeAttack}
                />
            )
        } else if (attackInfo.infoType === 'spell') {
            return (
                <SpellEdit
                    spellReference={attackInfo}
                    updateAttackStats={updateAttackStats}
                    combatRoleType={combatRoleType}
                    removeAttack={removeAttack}
                    spells={spells}
                />
            )
        }
    }

    return (
        <Body>
            <h2 className="border">Attacks</h2>

            <AttackInfoEdit
                attackInfo={attackInfo}
                roleAttackInfo={roleAttackInfo}
                updateAttackInfo={updateNonRoleInfo}
                noHeader={true}
            />
            <br/>
            
            <div className='attack-edit-header'>
                <div></div>
                <p>Name</p>
                <p>Weapon</p>
                <p className='input-header'>Damage Type</p>
                <p className='input-header'>Situation</p>
                <p className='input-header'>Reference</p>
                <p className='input-header'>Tactic</p>
            </div>

            <>
                {attacks.map((attack: AttackStats, index: number) => {
                    const nextUp = attacks[index - 1]?.overAllIndex
                    const nextDown = attacks[index + 1]?.overAllIndex

                    return (
                        <div key={index} className='attack-edit-shell'>
                            {MoveOrderButton(index > 0, 'up', updateAttackOrder, attack.overAllIndex, nextUp)}
                            {MoveOrderButton(index < attacks.length - 1, 'down', updateAttackOrder, attack.overAllIndex, nextDown)}
                            {getCorrectAttackEditOption(attack, updateAttackStats, combatRoleType)}
                        </div>
                    )
                })}
            </>

            <div className='add-attack-button-shell'>
                <button onClick={_ => addAttack({ infoType: 'reference', system: 'Bonfire', reference: '', overAllIndex: 0 })}><Icon iconName='plus' color='black' /> Reference</button>
                <button onClick={_ => addAttack({ infoType: 'spell', overAllIndex: 0 })}><Icon iconName='plus' color='black' /> Spell</button>
            </div>
        </Body>
    )
}
import './CombatTable.css'

import { AttackInfo, CombatStat } from '../../../../../../../../../interfaces/infoInterfaces.ts/combatInfoInterfaces'

interface Props {
    combatTable: CombatStat
}

export default function CombatTables({ combatTable }: Props) {
    const { name, attackInfo, defenseInfo } = combatTable
    const { defense, flanks, parry, parryDR, cover, dr } = defenseInfo
    
    return (
        <div className='combat-table-shell'>
            <h4>{name}</h4>
            <div className='combat-table'>
                {AttackInfoColumn(attackInfo)}
                <div className='combat-table-column'>
                    <h5>Defenses</h5>
                    <div>
                        <p>Def</p>
                        <p>{defense}</p>
                    </div>
                    <div>
                        <p>Flanks</p>
                        <p>{flanks}</p>
                    </div>
                    <div>
                        <p>Parry</p>
                        <p>{parry}</p>
                    </div>
                    <div>
                        <p>Cover</p>
                        <p>{cover}</p>
                    </div>
                    <div>
                        <p>Parry DR</p>
                        <p>{parryDR}</p>
                    </div>
                    <div>
                        <p>DR</p>
                        <p>{dr}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function AttackInfoColumn(attackInfo?: AttackInfo) {
    if (attackInfo) {
        const {measure, attack, damage, damageType, recovery, initiative} = attackInfo
        return (
            <div className='combat-table-column'>
                <h5>Attacks</h5>
                <div>
                    <p>Meas</p>
                    <p>{measure}</p>
                </div>
                <div>
                    <p>Atk</p>
                    <p>{attack}</p>
                </div>
                <div>
                    <p>Damage</p>
                    <p>{damage}</p>
                </div>
                <div>
                    <p>Type</p>
                    <p>{damageType}</p>
                </div>
                <div>
                    <p>Rec</p>
                    <p>{recovery}</p>
                </div>
                <div>
                    <p>Init</p>
                    <p>{initiative}</p>
                </div>
            </div>
        )
    }

    return <></>
}
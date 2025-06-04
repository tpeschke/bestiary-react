import './AttackStats.css'

import { AttackInfo } from '../../../../../../../../../interfaces/infoInterfaces/combatInfoInterfaces'

interface Props {
    attacksStats: AttackInfo
}

export default function AttackStats({ attacksStats }: Props) {
    const { name, measure, attack, damage, type, recovery } = attacksStats

    return (
        <div className='attack-stats-shell'>
            <span><h6></h6> <p>{name}</p></span>
            <div>
                <div className='attack-stats-left'>
                    <div>
                        <div>
                            <p>Meas</p>
                            <p>{measure}</p>
                        </div>
                        <div>
                            <p>Atk</p>
                            <p>{attack}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>Type</p>
                            <p>{type}</p>
                        </div>
                        <div>
                            <p>Rec</p>
                            <p>{recovery}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p>Damage</p>
                    <p>{damage}</p>
                </div>
            </div>
        </div>
    )
}
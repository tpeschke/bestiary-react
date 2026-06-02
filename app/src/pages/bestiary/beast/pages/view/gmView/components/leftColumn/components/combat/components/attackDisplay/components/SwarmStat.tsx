import { SwarmReference } from '@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces'
import { situationTooltip } from '../utilities/situationTooltip'
import './AttackStats.css'

interface Props {
    swarmStat: SwarmReference
}

export default function SwarmStat({ swarmStat }: Props) {
    const { system, name, damage } = swarmStat

    return (
        <div className='attack-stats-shell'>
            <span data-tooltip-id="my-tooltip" data-tooltip-content="The number represents the number of additional swarm members needed to gain this bonus. It is cumulative."><h6>{name}</h6></span>
            <div className='attack-stats-inner-shell'>
                <div className='swarm-stats'>
                    <div>
                        <p>Atk</p>
                        <p>{system === 'Bonfire' ? '+1 Pos' : '+2'}</p>
                    </div>
                    <div>
                        <p>Def</p>
                        <p>{system === 'Bonfire' ? '-1 Pos' : '+1'}</p>
                    </div>
                    <div data-tooltip-id="my-tooltip" data-tooltip-content="On an attack, this damage is dealt, regardless of whether the attack hits or not.">
                        <p>Auto Damage</p>
                        <p>+{damage}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

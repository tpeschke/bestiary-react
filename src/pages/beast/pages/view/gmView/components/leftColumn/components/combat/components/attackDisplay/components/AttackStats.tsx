import { WeaponInfo } from '../../../../../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces'
import Body from '../../../../../../../../../../components/UI/body/Body'
import HTMLDisplay from '../../../../../../../../../../components/UI/htmlDisplay/htmlDisplay'
import { getTacticInfo } from '../../../../../../../../../../utilities/tacticOptions'
import { situationTooltip, tacticTooltip } from '../utilities/situationTooltip'
import './AttackStats.css'

interface Props {
    attackStats: WeaponInfo
}

export default function AttackStats({ attackStats }: Props) {
    const { name, weaponName, measure, attack, damage, type, recovery, info, situation, tactic } = attackStats

    return (
        <div className='attack-stats-shell'>
            <span data-tooltip-id="my-tooltip" data-tooltip-content={situationTooltip}><h6>{situation}</h6> <p>{name ? name : weaponName ? weaponName : 'Default Attack'}</p></span>
            {info && <HTMLDisplay html={info} />}
            <div className='attack-stats-inner-shell'>
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
            {tactic &&
                <Body>
                    <p className='italic' data-tooltip-id="my-tooltip" data-tooltip-content={tacticTooltip}>
                        + {getTacticInfo(tactic)}
                    </p>
                </Body>
            }
        </div>
    )
}
import { DefenseInfo } from '../../../../../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces'
import Icon from '../../../../../../../../../../../../components/icon/Icon'
import HTMLDisplay from '../../../../../../../../../../components/UI/htmlDisplay/htmlDisplay'
import './DefenseStats.css'

interface Props {
    defenseStats: DefenseInfo
}

export default function DefenseStat({ defenseStats }: Props) {
    const { name, defense, flanks, parry, cover, parryDR, dr, info, tdr } = defenseStats
    const tooltip = 'Damage above DR is reduced to 1. Doubling the damage needed, increases it to 2 and so on. So, for 5 TDR, dealing 9 damage only deals 1; dealing 23 damage deals 3.'

    return (
        <div className='defense-stats-shell'>
            <h6>{name ? name : 'Default Defense'}</h6>
            {info && <HTMLDisplay html={info} />}
            <div className='defense-stats-inner-shell'>
                <div>
                    <p>Def</p>
                    <p>{defense} <span data-tooltip-id="my-tooltip" data-tooltip-content="Parry Information">(P: {parry} vs {flanks} flanks)</span></p>
                </div>
                <div>
                    <p>Cover</p>
                    <p>{cover}</p>
                </div>
            </div>
            <div className='defense-stats-inner-shell'>
                <div>
                    <p>Parry DR</p>
                    <p>{parryDR}</p>
                </div>
                <div>
                    <p>DR</p>
                    <p>{dr} {tdr && <Icon iconName='wall' color='black' tooltip={tooltip} />}</p>
                </div>
            </div>
        </div>
    )
}
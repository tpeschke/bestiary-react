import './DefenseStats.css'

import HTMLDisplay from '../../../../../../../../../components/UI/htmlDisplay/htmlDisplay'
import { DefenseInfo } from '../../../../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces'

interface Props {
    defenseStats: DefenseInfo
}

export default function DefenseStat({ defenseStats }: Props) {
    const { name, defense, flanks, parry, cover, parryDR, dr, info } = defenseStats

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
                    <p>{dr}</p>
                </div>
            </div>
        </div>
    )
}
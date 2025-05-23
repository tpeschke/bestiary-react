import './DefenseStats.css'

import { DefenseInfo } from "../../../../../../../../../interfaces/infoInterfaces/combatInfoInterfaces"

interface Props {
    defenseStats: DefenseInfo
}

export default function DefenseStat({ defenseStats }: Props) {
    const { name, defense, flanks, parry, cover, parryDR, dr } = defenseStats

    return (
        <div className='defense-stats-shell'>
            <h6>{name}</h6>
            <div>
                <div>
                    <p>Def</p>
                    <p>{defense} <span data-tooltip-id="my-tooltip" data-tooltip-content="Parry Information">(P: {parry} vs {flanks} flanks)</span></p>
                </div>
                <div>
                    <p>Cover</p>
                    <p>{cover}</p>
                </div>
            </div>
            <div>
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
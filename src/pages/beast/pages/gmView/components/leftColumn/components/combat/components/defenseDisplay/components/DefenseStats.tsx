import './DefenseStats.css'

import { DefenseInfo } from "../../../../../../../../../interfaces/infoInterfaces.ts/combatInfoInterfaces"

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
            </div>
            <div>
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
    )
}
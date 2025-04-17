import CombatInfo from "../../../../../../interfaces/infoInterfaces.ts/combatInfoInterfaces"

import RoleTitle from "../../../roleTitle/RoleTitle"
import SpecialInfo from "../specialInfo/specialInfo"

interface Props {
    combatInfo: CombatInfo
}

export default function CombatSection({ combatInfo }: Props) {
    const { combatrole, combatpoints, sp_atk, sp_def } = combatInfo
    const COMBAT = 'Combat'
    
    return (
        <>
            <RoleTitle title={COMBAT} points={combatpoints} role={combatrole} />

            <SpecialInfo section={COMBAT} type="Attack" info={sp_atk} />
            <SpecialInfo section={COMBAT} type="Defense" info={sp_def} />
        </>
    )
}
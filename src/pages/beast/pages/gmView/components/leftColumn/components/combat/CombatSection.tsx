import CombatInfo from "../../../../../../interfaces/infoInterfaces.ts/combatInfoInterfaces"

import RoleTitle from "../../../roleTitle/RoleTitle"
import SpecialInfo from "../specialInfo/specialInfo"

interface Props {
    combatInfo: CombatInfo
}

export default function CombatSection({ combatInfo }: Props) {
    const { combatrole, combatpoints, sp_atk, sp_def, combatsecondary } = combatInfo
    
    return (
        <>
            <RoleTitle title='Combat' points={combatpoints} role={combatrole} secondaryRole={combatsecondary} />

            <SpecialInfo type="Attack" info={sp_atk} />
            <SpecialInfo type="Defense" info={sp_def} />
        </>
    )
}
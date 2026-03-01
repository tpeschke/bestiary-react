import { useEffect, useState } from "react"

import RoleTitle from "../../../roleTitle/RoleTitle"
import SpecialInfo from "../specialInfo/specialInfo"
import ArchetypeDisplay from "./components/archetype/ArchetypeDisplay"
import CharacteristicsDisplay from "./components/CharacteristicsDisplay"
import SocialInfo from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import CapacityDisplay from "./components/CapacityDisplay"

interface Props {
    socialInfo: SocialInfo
}

export default function ConfrontationSection({ socialInfo }: Props) {
    const { socialRole, socialSkulls, conflicts, attackInfo, defenseInfo, socialSecondary, archetypeInfo, capacity } = socialInfo

    const showDefenseSection = !!(defenseInfo && defenseInfo !== '')
    const showAttackSection = !!(attackInfo && attackInfo !== '')

    if (socialRole === 'No Personality') {
        return <RoleTitle title='Confrontation' hasBottomBorder={true} skulls={socialSkulls} role={socialRole} />
    }

    return (
        <>
            <RoleTitle title='Confrontation' skulls={socialSkulls} role={socialRole} secondaryRole={socialSecondary} />
            {showDefenseSection &&
                <>
                    <h3>Defense Info</h3>
                    <SpecialInfo info={defenseInfo} />
                </>
            }
            {showAttackSection &&
                <>
                    <h3>Attack Info</h3>
                    <SpecialInfo info={attackInfo} />
                </>
            }
            <CapacityDisplay capacity={capacity} />
            <ArchetypeDisplay archetypeInfo={archetypeInfo} points={socialSkulls} />
            <CharacteristicsDisplay characteristicInfo={conflicts} />
        </>
    )
}
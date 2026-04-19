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
    const {type, socialRole, socialSkulls, epValue, conflicts, attackInfo, defenseInfo, socialSecondary, archetypeInfo, capacity } = socialInfo

    const showDefenseSection = !!(defenseInfo && defenseInfo !== '')
    const showAttackSection = !!(attackInfo && attackInfo !== '')

    if (socialRole === 'No Personality') {
        return <RoleTitle title={type === 'Bonfire' ? 'Confrontation' : 'Social'} hasBottomBorder={true} skulls={socialSkulls} role={socialRole} />
    }

    return (
        <>
            {type === 'Bonfire' ?
                <RoleTitle title='Confrontation' skulls={socialSkulls} role={socialRole} secondaryRole={socialSecondary} />
                :
                <RoleTitle title="Social" epValue={epValue} role={socialRole} secondaryRole={socialSecondary} />
            }
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
            {capacity.threshold && <CapacityDisplay capacity={capacity.threshold} />}
            <ArchetypeDisplay archetypeInfo={archetypeInfo} points={socialSkulls}/>
            <CharacteristicsDisplay characteristicInfo={conflicts} type={type} />
        </>
    )
}
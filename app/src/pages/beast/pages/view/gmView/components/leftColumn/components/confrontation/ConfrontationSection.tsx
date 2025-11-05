import { useEffect, useState } from "react"

import RoleTitle from "../../../roleTitle/RoleTitle"
import SpecialInfo from "../specialInfo/specialInfo"
import ArchetypeDisplay from "./components/archetype/ArchetypeDisplay"
import CharacteristicsDisplay from "./components/CharacteristicsDisplay"
import SocialInfo from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"

interface Props {
    socialInfo: SocialInfo
}

export default function ConfrontationSection({ socialInfo }: Props) {
    const [hasArchetypes, setHasArchetypes] = useState(false);
    const [hasCharacteristics, setHasCharacteristics] = useState(false);

    const { socialRole, socialSkulls, conflicts, attackInfo, defenseInfo, socialSecondary, archetypeInfo } = socialInfo

    useEffect(() => {
        const { conflicts } = socialInfo

        if (conflicts && !hasCharacteristics) {
            const { burdens, convictions, descriptions, relationships, flaws } = conflicts
            const hasDescriptions = descriptions.length > 0
            const hasConvictions = convictions.length > 0
            const hasRelationships = relationships.length > 0
            const hasFlaws = flaws.length > 0
            const hasBurdens = burdens.length > 0

            setHasCharacteristics(hasDescriptions || hasConvictions || hasRelationships || hasFlaws || hasBurdens)
        }

    }, [])

    const showDefenseSection = !!(defenseInfo && defenseInfo !== '')
    const showAttackSection = !!(attackInfo && attackInfo !== '')

    // When there is nothing to display in this section, this border helps visually separate it from the next section
    const hasBottomBorder = !(showDefenseSection || showAttackSection || hasCharacteristics || hasArchetypes)

    return (
        <>
            <RoleTitle title='Confrontation' skulls={socialSkulls} role={socialRole} secondaryRole={socialSecondary} hasBottomBorder={hasBottomBorder} />
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
            <ArchetypeDisplay archetypeInfo={archetypeInfo} points={socialSkulls} setHasArchetypes={setHasArchetypes} />
            {hasCharacteristics && <CharacteristicsDisplay characteristicInfo={conflicts} />}
        </>
    )
}
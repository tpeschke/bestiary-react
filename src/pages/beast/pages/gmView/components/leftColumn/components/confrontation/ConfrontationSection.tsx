import { useState } from "react"
import SocialInfo from "../../../../../../interfaces/infoInterfaces/socialInfo"

import RoleTitle from "../../../roleTitle/RoleTitle"
import SpecialInfo from "../specialInfo/specialInfo"
import ArchetypeDisplay from "./components/archetype/ArchetypeDisplay"
import CharacteristicsDisplay from "./components/CharacteristicsDisplay"

interface Props {
    socialInfo: SocialInfo
}

export default function ConfrontationSection({ socialInfo }: Props) {
    const [hasArchetypes, setHasArchetypes] = useState(false);
    const [hasCharacteristics, setHasCharacteristics] = useState(false);

    const { socialrole, socialpoints, conflicts, atk_conf, def_conf, socialsecondary, archetypeInfo } = socialInfo

    const showDefenseSection = def_conf && def_conf !== ''
    const showAttackSection = atk_conf && atk_conf !== ''

    // When there is nothing to display in this section, this border helps visually separate it from the next section
    const hasBottomBorder = !(showDefenseSection || showAttackSection || hasCharacteristics || hasArchetypes)

    return (
        <>
            <RoleTitle title='Confrontation' points={socialpoints} role={socialrole} secondaryRole={socialsecondary} hasBottomBorder={hasBottomBorder}/>
            {showDefenseSection &&
                <>
                    <h3>Defense Info</h3>
                    <SpecialInfo info={def_conf} />
                </>
            }
            {showAttackSection &&
                <>
                    <h3>Attack Info</h3>
                    <SpecialInfo info={atk_conf} />
                </>
            }
            <ArchetypeDisplay archetypeInfo={archetypeInfo} points={socialpoints} setHasArchetypes={setHasArchetypes}  />
            {conflicts && <CharacteristicsDisplay characteristicInfo={conflicts} setHasCharacteristics={setHasCharacteristics} />}
        </>
    )
}
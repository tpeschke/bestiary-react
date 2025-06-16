import SocialInfo from "../../../../../../interfaces/infoInterfaces/socialInfo"

import RoleTitle from "../../../roleTitle/RoleTitle"
import SpecialInfo from "../specialInfo/specialInfo"
import ArchetypeDisplay from "./components/archetype/ArchetypeDisplay"
import CharacteristicsDisplay from "./components/CharacteristicsDisplay"

interface Props {
    socialInfo: SocialInfo
}

export default function ConfrontationSection({ socialInfo }: Props) {
    const { socialrole, socialpoints, conflicts, atk_conf, def_conf, socialsecondary, archetypeInfo } = socialInfo

    return (
        <>
            <RoleTitle title='Confrontation' points={socialpoints} role={socialrole} secondaryRole={socialsecondary} />
            <h3>Defense Info</h3>
            <SpecialInfo info={def_conf} />
            <h3>Attack Info</h3>
            <SpecialInfo info={atk_conf} />
            <ArchetypeDisplay archetypeInfo={archetypeInfo} points={socialpoints} />
            {conflicts && <CharacteristicsDisplay characteristicInfo={conflicts} />}
        </>
    )
}
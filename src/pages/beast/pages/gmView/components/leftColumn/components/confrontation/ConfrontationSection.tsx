import SocialInfo from "../../../../../../interfaces/infoInterfaces.ts/socialInfo"

import RoleTitle from "../../../roleTitle/RoleTitle"
import SpecialInfo from "../specialInfo/specialInfo"
import CharacteristicsDisplay from "./components/CharacteristicsDisplay"

interface Props {
    socialInfo: SocialInfo
}

export default function ConfrontationSection({ socialInfo }: Props) {
    const { socialrole, socialpoints, conflicts, atk_conf, def_conf, socialsecondary } = socialInfo

    return (
        <>
            <RoleTitle title='Confrontation' points={socialpoints} role={socialrole} secondaryRole={socialsecondary} />
            {conflicts && <CharacteristicsDisplay characteristicInfo={conflicts} />}
            <h3>Defense Info</h3>
            <SpecialInfo info={def_conf} />
            <h3>Attack Info</h3>
            <SpecialInfo info={atk_conf} />
        </>
    )
}
import ImageInfo from "../../../../interfaces/infoInterfaces/ImageInfoInterfaces"
import SocialInfo from "../../../../interfaces/infoInterfaces/socialInfo"
import SkillInfo from "../../../../interfaces/infoInterfaces/skillInfoInterfaces"

import FullImage from "../../../../components/UI/fullImage/fullImage"
import ConfrontationSection from "./components/confrontation/ConfrontationSection"
import SkillSection from "./components/skills/SkillSection"
import CombatSection from "./components/combat/CombatSection"
import CombatInfo from "../../../../interfaces/infoInterfaces/combatInfoInterfaces"
import { Size } from "../../../../interfaces/infoInterfaces/generalInfoInterfaces"
import RoleInfo from "../../../../interfaces/infoInterfaces/roleInfoInterfaces"
import RoleSelect from "./components/roleSelect/RoleSelect"

interface Props {
    beastId: number,
    beastName: string,
    imageInfo: ImageInfo, 
    socialInfo: SocialInfo,
    skillInfo: SkillInfo,
    combatInfo: CombatInfo,
    size: Size,
    roleInfo: RoleInfo,
    updateSelectedRole: Function,
    selectedRoleId: string
}

export default function LeftColumn({ beastId, beastName, imageInfo, socialInfo, skillInfo, combatInfo, size, roleInfo, updateSelectedRole, selectedRoleId }: Props) {
    return (
        <>
            <FullImage imageParam={beastId} altText={beastName} artistInfo={imageInfo.artistInfo?.genericArtistInfo}/>
            <RoleSelect roleInfo={roleInfo} updateSelectedRole={updateSelectedRole} selectedRole={selectedRoleId} />
            <ConfrontationSection socialInfo={socialInfo} />
            <SkillSection skillInfo={skillInfo} />
            <CombatSection combatInfo={combatInfo} size={size} />
        </>
    )
}
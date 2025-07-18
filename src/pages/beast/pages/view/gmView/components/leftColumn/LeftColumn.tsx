import ConfrontationSection from "./components/confrontation/ConfrontationSection"
import SkillSection from "./components/skills/SkillSection"
import CombatSection from "./components/combat/CombatSection"
import RoleSelect from "./components/roleSelect/RoleSelect"
import RatingModifierDisplay from "./components/RatingModifier/RatingModifierDisplay"
import { Size } from "../../../../../../../../common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import RoleInfo from "../../../../../../../../common/interfaces/beast/infoInterfaces/roleInfoInterfaces"
import SkillInfo from "../../../../../../../../common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import FullImage from "../../../../../components/UI/fullImage/fullImage"
import { UpdateSelectedRoleFunction, UpdateRoleModifierFunction } from "../../../../../hooks/beastHooks"
import CombatInfo from "../../../../../interfaces/infoInterfaces/combatInfoInterfaces"
import ImageInfo from "../../../../../interfaces/infoInterfaces/ImageInfoInterfaces"
import SocialInfo from "../../../../../interfaces/infoInterfaces/socialInfo"

interface Props {
    beastId: number,
    beastName: string,
    imageInfo: ImageInfo,
    socialInfo: SocialInfo,
    skillInfo: SkillInfo,
    combatInfo: CombatInfo,
    size: Size,
    roleInfo: RoleInfo,
    selectedRoleIndex: number
    updateSelectedRole: UpdateSelectedRoleFunction,
    updateRoleModifier: UpdateRoleModifierFunction,
    modifierIndex: number,
    copyQuickLink: Function,
    hasModifier: boolean,
    selectedRoleID: string | null
}

export default function LeftColumn({ beastId, beastName, imageInfo, socialInfo, skillInfo, combatInfo, size, roleInfo, selectedRoleIndex,
    updateSelectedRole, updateRoleModifier, modifierIndex, copyQuickLink, hasModifier, selectedRoleID }: Props) {

    return (
        <>
            <FullImage imageParam={beastId} altText={beastName} artistInfo={imageInfo.artistInfo?.genericArtistInfo} roleID={selectedRoleID} />
            <RoleSelect roleInfo={roleInfo} updateSelectedRole={updateSelectedRole} selectedRoleIndex={selectedRoleIndex} copyQuickLink={copyQuickLink} hasModifier={hasModifier} />
            <ConfrontationSection socialInfo={socialInfo} />
            <SkillSection skillInfo={skillInfo} />
            <CombatSection combatInfo={combatInfo} size={size} />
            <RatingModifierDisplay updateRoleModifier={updateRoleModifier} modifierIndex={modifierIndex} copyQuickLink={copyQuickLink} hasModifier={hasModifier} />
        </>
    )
}
import ConfrontationSection from "./components/confrontation/ConfrontationSection"
import SkillSection from "./components/skills/SkillSection"
import CombatSection from "./components/combat/CombatSection"
import RoleSelect from "./components/roleSelect/RoleSelect"
import RatingModifierDisplay from "./components/RatingModifier/RatingModifierDisplay"
import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import RoleInfo from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces"
import SkillInfo from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import FullImage from "../../../../../components/UI/fullImage/fullImage"
import { UpdateSelectedRoleFunction, UpdateRoleModifierFunction } from "../../../../../hooks/beastHooks"
import ImageInfo from "../../../../../interfaces/infoInterfaces/ImageInfoInterfaces"
import CombatInfo from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import SocialInfo from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import Pair from "../../../../../components/UI/pair/Pair"
import StrategiesNLimits from "./components/StrategiesNLimits/StrategiesNLimits"
import StrategicOptionsDisplay from "./components/StrategicOptions"

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
    selectedRoleID: string | null,
    selfDoubtDie: string
}

export default function LeftColumn({ beastId, beastName, imageInfo, socialInfo, skillInfo, combatInfo, size, roleInfo, selectedRoleIndex,
    updateSelectedRole, updateRoleModifier, modifierIndex, copyQuickLink, hasModifier, selectedRoleID, selfDoubtDie }: Props) {
        const { baseConvictionRank } = socialInfo

    return (
        <>
            <FullImage imageParam={beastId} altText={beastName} artistInfo={imageInfo.artistInfo?.genericArtistInfo} roleID={selectedRoleID} />
            <RoleSelect roleInfo={roleInfo} updateSelectedRole={updateSelectedRole} selectedRoleIndex={selectedRoleIndex} copyQuickLink={copyQuickLink} hasModifier={hasModifier} />
            <Pair title={"Self-Doubt Die"} info={selfDoubtDie} format={{ heading: true, noBorder: true }} />
            <ConfrontationSection socialInfo={socialInfo} />
            <SkillSection skillInfo={skillInfo} />
            <CombatSection combatInfo={combatInfo} size={size} />
            <RatingModifierDisplay updateRoleModifier={updateRoleModifier} modifierIndex={modifierIndex} copyQuickLink={copyQuickLink} hasModifier={hasModifier} />
            <StrategiesNLimits strategiesNLimits={combatInfo.strategiesNLimits} limitNotes={combatInfo.limitNotes} />
            <StrategicOptionsDisplay options={combatInfo.options} skillSkulls={skillInfo.skillSkulls} baseConvictionRank={baseConvictionRank} />
        </>
    )
}
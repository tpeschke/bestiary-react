import ConfrontationSection from "./components/confrontation/ConfrontationSection"
import SkillSection from "./components/skills/SkillSection"
import CombatSection from "./components/combat/CombatSection"
import RoleSelect from "./components/roleSelect/RoleSelect"
import RatingModifierDisplay from "./components/RatingModifier/RatingModifierDisplay"
import { SaveObject, Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import FullImage from "../../../../../components/UI/fullImage/fullImage"
import { UpdateSelectedRoleFunction, UpdateRoleModifierFunction } from "../../../../../hooks/beastHooks"
import ImageInfo from "../../../../../interfaces/infoInterfaces/ImageInfoInterfaces"
import { SpecificCombatInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { SpecificSocialInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import Pair from "../../../../../components/UI/pair/Pair"
import StrategiesNLimits from "./components/StrategiesNLimits/StrategiesNLimits"
import StrategicOptionsDisplay from "./components/StrategiesNLimits/StrategicOptions"
import { SystemOption } from "@bestiary/common/interfaces/beast/beast"
import Saves from "./components/saves/Saves"
import { SpecificSkillInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import GeneralRoleInfo from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/roleInfoInterfaces"

interface Props {
    beastId: number,
    beastName: string,
    imageInfo: ImageInfo,
    socialInfo: SpecificSocialInfo,
    skillInfo: SpecificSkillInfo,
    combatInfo: SpecificCombatInfo,
    size: Size,
    roleInfo: GeneralRoleInfo,
    selectedRoleIndex: number
    updateSelectedRole: UpdateSelectedRoleFunction,
    updateRoleModifier: UpdateRoleModifierFunction,
    modifierIndex: number,
    copyQuickLink: Function,
    hasModifier: boolean,
    selectedRoleID: string | null,
    selfDoubtDie: string,
    system: SystemOption,
    saves: [SaveObject, SaveObject, SaveObject] | null
}

export default function LeftColumn({ 
    beastId, beastName, imageInfo, socialInfo, skillInfo, combatInfo, size, roleInfo, selectedRoleIndex, system, saves,
    updateSelectedRole, updateRoleModifier, modifierIndex, copyQuickLink, hasModifier, selectedRoleID, selfDoubtDie 
}: Props) {
        const { baseDescriptionRank } = socialInfo

    return (
        <>
            <FullImage imageParam={beastId} altText={beastName} artistInfo={imageInfo.artistInfo?.genericArtistInfo} roleID={selectedRoleID} />
            <RoleSelect roleInfo={roleInfo} updateSelectedRole={updateSelectedRole} selectedRoleIndex={selectedRoleIndex} copyQuickLink={copyQuickLink} hasModifier={hasModifier} />
            {system === 'Bonfire' && <Pair title={"Self-Doubt Die"} info={selfDoubtDie} format={{ heading: true, noBorder: true }} />}
            <Saves saves={saves} />
            <ConfrontationSection socialInfo={socialInfo} />
            <SkillSection skillInfo={skillInfo} />
            <CombatSection combatInfo={combatInfo} size={size} />
            <RatingModifierDisplay updateRoleModifier={updateRoleModifier} modifierIndex={modifierIndex} copyQuickLink={copyQuickLink} hasModifier={hasModifier} system={system} />
            <StrategiesNLimits strategiesNLimits={combatInfo.strategiesNLimits} limitNotes={combatInfo.limitNotes} />
            <StrategicOptionsDisplay options={combatInfo.options} skillSkulls={skillInfo.skillSkulls} baseDescriptionRank={baseDescriptionRank} />
        </>
    )
}
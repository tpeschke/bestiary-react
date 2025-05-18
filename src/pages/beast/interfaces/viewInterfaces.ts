import CastingInfo from "./infoInterfaces/castingInfo"
import CombatInfo from "./infoInterfaces/combatInfoInterfaces"
import GeneralInfo from "./infoInterfaces/generalInfoInterfaces"
import ImageInfo, { ArtistInfo } from "./infoInterfaces/ImageInfoInterfaces"
import LinkedInfo from "./infoInterfaces/linkedInfoInterfaces"
import LootInfo from "./infoInterfaces/lootInfoInterfaces"
import PlayerSpecificInfo from "./infoInterfaces/playerSpecificInfoInterfaces"
import RoleInfo from "./infoInterfaces/roleInfoInterfaces"
import SkillInfo from "./infoInterfaces/skillInfoInterfaces"
import SocialInfo from "./infoInterfaces/socialInfo"

export interface PlayerBeastInfo {
    id: number,
    name: string,
    notes: Notes,
    artistInfo: ArtistInfo
}

export interface Notes {
    id?: number,
    notes: string
}

export interface BeastInfo {
    id: number,
    patreon: number,
    canplayerview: boolean,
    generalInfo: GeneralInfo,
    playerSpecificInfo: PlayerSpecificInfo,
    imageInfo: ImageInfo,
    linkedInfo : LinkedInfo,
    roleInfo: RoleInfo,
    combatInfo: CombatInfo,
    skillInfo: SkillInfo,
    socialInfo: SocialInfo,
    lootInfo: LootInfo,
    castingInfo: CastingInfo,
}
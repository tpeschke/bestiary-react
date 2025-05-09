import CastingInfo from "./infoInterfaces.ts/castingInfo"
import CombatInfo from "./infoInterfaces.ts/combatInfoInterfaces"
import GeneralInfo from "./infoInterfaces.ts/generalInfoInterfaces"
import ImageInfo, { ArtistInfo } from "./infoInterfaces.ts/ImageInfoInterfaces"
import LinkedInfo from "./infoInterfaces.ts/linkedInfoInterfaces"
import LootInfo from "./infoInterfaces.ts/lootInfoInterfaces"
import PlayerSpecificInfo from "./infoInterfaces.ts/playerSpecificInfoInterfaces"
import RoleInfo from "./infoInterfaces.ts/roleInfoInterfaces"
import SkillInfo from "./infoInterfaces.ts/skillInfoInterfaces"
import SocialInfo from "./infoInterfaces.ts/socialInfo"

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
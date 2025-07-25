import CastingInfo from "./infoInterfaces/castingInfo"
import CombatInfo from "./infoInterfaces/combatInfoInterfaces"
import GeneralInfo from "./infoInterfaces/generalInfoInterfaces"
import ImageInfo, { ArtistInfo } from "./infoInterfaces/ImageInfoInterfaces"
import LinkedInfo from "./infoInterfaces/linkedInfoInterfaces"
import LootInfo from "./infoInterfaces/lootInfoInterfaces"
import PlayerSpecificInfo from "./infoInterfaces/playerSpecificInfoInterfaces"
import SocialInfo from "./infoInterfaces/socialInfo"

import RoleInfo from '../../../../common/interfaces/beast/infoInterfaces/roleInfoInterfaces'
import SkillInfo from "../../../../common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import { Notes } from "../../../../common/interfaces/beast/infoInterfaces/playerSpecificInfoInterfaces"

export interface PlayerBeastInfo {
    id: number,
    name: string,
    notes: Notes,
    artistInfo: ArtistInfo
}

export interface BeastInfo {
    id: number,
    patreon: number,
    canplayerview: boolean,
    roleModifier: number,
    generalInfo: GeneralInfo,
    playerInfo: PlayerSpecificInfo,
    imageInfo: ImageInfo,
    linkedInfo : LinkedInfo,
    roleInfo: RoleInfo,
    combatInfo: CombatInfo,
    skillInfo: SkillInfo,
    socialInfo: SocialInfo,
    lootInfo: LootInfo,
    castingInfo: CastingInfo,
}
import CastingInfo from "./infoInterfaces/castingInfo"
import ImageInfo, { ArtistInfo } from "./infoInterfaces/ImageInfoInterfaces"
import LootInfo from "./infoInterfaces/lootInfoInterfaces"
import PlayerSpecificInfo from "./infoInterfaces/playerSpecificInfoInterfaces"
import { Access } from "@bestiary/common/utilities/get/getAccessLevel"

import RoleInfo from '@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces'
import SkillInfo from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import { Notes } from "@bestiary/common/interfaces/beast/infoInterfaces/playerSpecificInfoInterfaces"
import GeneralInfo from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import SocialInfo from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import CombatInfo from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import LinkedInfo from "@bestiary/common/interfaces/beast/infoInterfaces/linkedInfoInterfaces"

export interface PlayerBeastInfo {
    id: number,
    name: string,
    notes: Notes,
    artistInfo: ArtistInfo
}

export interface BeastInfo {
    id: number,
    patreon: Access,
    canplayerview: boolean,
    roleModifier: number,
    generalInfo: GeneralInfo,
    playerInfo: PlayerSpecificInfo,
    imageInfo: ImageInfo,
    linkedInfo: LinkedInfo,
    roleInfo: RoleInfo,
    combatInfo: CombatInfo,
    skillInfo: SkillInfo,
    socialInfo: SocialInfo,
    lootInfo: LootInfo,
    castingInfo: CastingInfo,
}
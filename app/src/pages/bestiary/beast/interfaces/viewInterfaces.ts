import CastingInfo from "./infoInterfaces/castingInfo"
import ImageInfo, { ArtistInfo } from "./infoInterfaces/ImageInfoInterfaces"
import LootInfo from "./infoInterfaces/lootInfoInterfaces"
import PlayerSpecificInfo from "./infoInterfaces/playerSpecificInfoInterfaces"
import { Access } from "@bestiary/common/utilities/get/getAccessLevel"

import RoleInfo from '@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces'
import { NonspecificSkillInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import { Notes } from "@bestiary/common/interfaces/beast/infoInterfaces/playerSpecificInfoInterfaces"
import GeneralInfo from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { NonspecificSocialInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import { NonspecificCombatInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import LinkedInfo from "@bestiary/common/interfaces/beast/infoInterfaces/linkedInfoInterfaces"
import { SystemOption } from "@bestiary/common/interfaces/beast/beast"

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
    system: SystemOption,
    roleModifier: number,
    generalInfo: GeneralInfo,
    playerInfo: PlayerSpecificInfo,
    imageInfo: ImageInfo,
    linkedInfo: LinkedInfo,
    roleInfo: RoleInfo,
    combatInfo: NonspecificCombatInfo,
    skillInfo: NonspecificSkillInfo,
    socialInfo: NonspecificSocialInfo,
    lootInfo: LootInfo,
    castingInfo: CastingInfo,
}
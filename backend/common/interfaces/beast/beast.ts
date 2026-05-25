import GeneralInfo from './infoInterfaces/generalInfoInterfaces'
import { NonspecificSkillInfo } from './infoInterfaces/skillInfoInterfaces'
import ImageInfo from './infoInterfaces/ImageInfoInterfaces'
import LinkedInfo from './infoInterfaces/linkedInfoInterfaces'
import RoleInfo from './infoInterfaces/roleInterfaces/roleInfoInterfaces'
import LootInfo from './infoInterfaces/lootInfoInterfaces'
import CastingInfo from './infoInterfaces/castingInfo'
import { NonspecificSocialInfo } from './infoInterfaces/socialInfoInterfaces'
import PlayerSpecificInfo from './infoInterfaces/playerSpecificInfoInterfaces'
import { Access } from '../../utilities/get/getAccessLevel'
import { NonspecificCombatInfo } from './infoInterfaces/combatInfoInterfaces'

export interface Beast {
    id: number,
    patreon: Access,
    playerInfo: PlayerSpecificInfo,
    canplayerview: boolean,
    system: SystemOption,
    generalInfo: GeneralInfo,
    imageInfo: ImageInfo,
    linkedInfo: LinkedInfo,
    roleInfo: RoleInfo,
    combatInfo: NonspecificCombatInfo,
    skillInfo: NonspecificSkillInfo,
    socialInfo: NonspecificSocialInfo,
    lootInfo: LootInfo,
    castingInfo: CastingInfo
}

export type DiceOptions = null | 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20'

export type SystemOption = 'HackMaster' | 'Bonfire'
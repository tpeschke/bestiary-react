import CombatInfo from './infoInterfaces/combatInfoInterfaces'
import GeneralInfo from './infoInterfaces/generalInfoInterfaces'
import SkillInfo from './infoInterfaces/skillInfoInterfaces'
import ImageInfo from './infoInterfaces/ImageInfoInterfaces'
import LinkedInfo from './infoInterfaces/linkedInfoInterfaces'
import RoleInfo from './infoInterfaces/roleInfoInterfaces'
import LootInfo from './infoInterfaces/lootInfoInterfaces'
import CastingInfo from './infoInterfaces/castingInfo'
import SocialInfo from './infoInterfaces/socialInfoInterfaces'
import PlayerSpecificInfo from './infoInterfaces/playerSpecificInfoInterfaces'

export interface Beast {
    id: number,
    patreon: number,
    playerInfo: PlayerSpecificInfo,
    canplayerview: boolean,
    generalInfo: GeneralInfo,
    imageInfo: ImageInfo,
    linkedInfo : LinkedInfo,
    roleInfo: RoleInfo,
    combatInfo: CombatInfo,
    skillInfo: SkillInfo,
    socialInfo: SocialInfo,
    lootInfo: LootInfo,
    castingInfo: CastingInfo
}
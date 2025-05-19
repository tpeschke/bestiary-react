import { Spell } from "../interfaces/infoInterfaces/castingInfo";
import CombatInfo from "../interfaces/infoInterfaces/combatInfoInterfaces";
import GeneralInfo from "../interfaces/infoInterfaces/generalInfoInterfaces";
import ImageInfo from "../interfaces/infoInterfaces/ImageInfoInterfaces";
import LinkedInfo from "../interfaces/infoInterfaces/linkedInfoInterfaces";
import LootInfo from "../interfaces/infoInterfaces/lootInfoInterfaces";
import SkillInfo from "../interfaces/infoInterfaces/skillInfoInterfaces";
import SocialInfo from "../interfaces/infoInterfaces/socialInfo";
import { BeastInfo } from "../interfaces/viewInterfaces";
import CastingClass from "../pages/gmView/components/weirdshaping/models/CastingClass";

export default class GMBeastClass {
    private beastInfo: BeastInfo;

    private castingTypeInfo: CastingClass

    constructor(beastInfo: BeastInfo) {
        this.beastInfo = beastInfo;
        this.castingTypeInfo = new CastingClass(beastInfo.castingInfo.casting)
    }

    get id(): number {
        return this.beastInfo?.id ?? 0
    }

    get maxPoints(): number {
        const { combatpoints } = this.beastInfo.combatInfo
        const { skillpoints } = this.beastInfo.skillInfo
        const { socialpoints } = this.beastInfo.socialInfo
        return Math.max(combatpoints,  skillpoints, socialpoints)
    }

    get generalInfo(): GeneralInfo {
        return this.beastInfo.generalInfo
    }

    get imageInfo(): ImageInfo {
        return this.beastInfo.imageInfo
    }

    get socialInfo(): SocialInfo {
        return this.beastInfo.socialInfo
    }

    get skillInfo(): SkillInfo {
        return this.beastInfo.skillInfo
    }

    get combatInfo(): CombatInfo {
        return this.beastInfo.combatInfo
    }

    get linkedInfo(): LinkedInfo {
        return this.beastInfo.linkedInfo
    }

    get lootInfo(): LootInfo {
        return this.beastInfo.lootInfo
    }

    get castingInfo(): CastingClass { 
        return this.castingTypeInfo
    }

    get spells(): Spell[] {
        return this.beastInfo.castingInfo.spells
    }
 }
import { Spell } from "../interfaces/infoInterfaces.ts/castingInfo";
import CombatInfo from "../interfaces/infoInterfaces.ts/combatInfoInterfaces";
import GeneralInfo from "../interfaces/infoInterfaces.ts/generalInfoInterfaces";
import ImageInfo from "../interfaces/infoInterfaces.ts/ImageInfoInterfaces";
import LinkedInfo from "../interfaces/infoInterfaces.ts/linkedInfoInterfaces";
import LootInfo from "../interfaces/infoInterfaces.ts/lootInfoInterfaces";
import SkillInfo from "../interfaces/infoInterfaces.ts/skillInfoInterfaces";
import SocialInfo from "../interfaces/infoInterfaces.ts/socialInfo";
import { BeastInfo } from "../interfaces/viewInterfaces";
import CastingClass from "./casting/CastingClass";

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

    get castingTypesInfo(): CastingClass {
        return this.castingTypeInfo
    }

    get spells(): Spell[] {
        return this.beastInfo.castingInfo.spells
    }
 }
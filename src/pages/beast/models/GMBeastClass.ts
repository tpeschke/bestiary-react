import { Spell } from "../interfaces/infoInterfaces/castingInfo";
import CombatInfo, { AttackInfo, DefenseInfo, Movement } from "../interfaces/infoInterfaces/combatInfoInterfaces";
import GeneralInfo from "../interfaces/infoInterfaces/generalInfoInterfaces";
import ImageInfo from "../interfaces/infoInterfaces/ImageInfoInterfaces";
import LinkedInfo from "../interfaces/infoInterfaces/linkedInfoInterfaces";
import LootInfo from "../interfaces/infoInterfaces/lootInfoInterfaces";
import SkillInfo, { Skill } from "../interfaces/infoInterfaces/skillInfoInterfaces";
import SocialInfo, { Conflict } from "../interfaces/infoInterfaces/socialInfo";
import { BeastInfo } from "../interfaces/viewInterfaces";
import CastingClass from "../pages/gmView/components/weirdshaping/models/CastingClass";

export default class GMBeastClass {
    private beastInfo: BeastInfo;

    private castingTypeInfo: CastingClass;
    private selectRoleId: string

    constructor(beastInfo: BeastInfo) {
        this.beastInfo = beastInfo;
        this.castingTypeInfo = new CastingClass(beastInfo.castingInfo.casting)
        this.selectRoleId = beastInfo.roleInfo.defaultrole
    }

    get id(): number {
        return this.beastInfo?.id ?? 0
    }

    get maxPoints(): number {
        const { combatpoints } = this.beastInfo.combatInfo
        const { skillpoints } = this.beastInfo.skillInfo
        const { socialpoints } = this.beastInfo.socialInfo
        return Math.max(combatpoints, skillpoints, socialpoints)
    }

    get generalInfo(): GeneralInfo {
        return this.beastInfo.generalInfo
    }

    get imageInfo(): ImageInfo {
        return this.beastInfo.imageInfo
    }

    get socialInfo(): SocialInfo {
        const { conflicts } = this.beastInfo.socialInfo

        if (conflicts) {
            const { descriptions, convictions, relationships, flaws, burdens } = conflicts

            return {
                ...this.beastInfo.socialInfo,
                conflicts: {
                    descriptions: descriptions.filter((info: Conflict) => !info.socialroleid || info.socialroleid === this.selectRoleId),
                    convictions: convictions.filter((info: Conflict) => !info.socialroleid || info.socialroleid === this.selectRoleId),
                    relationships: relationships.filter((info: Conflict) => !info.socialroleid || info.socialroleid === this.selectRoleId),
                    flaws: flaws.filter((info: Conflict) => !info.socialroleid || info.socialroleid === this.selectRoleId),
                    burdens: burdens.filter((info: Conflict) => !info.socialroleid || info.socialroleid === this.selectRoleId)
                }
            }
        }

        return this.beastInfo.socialInfo
    }

    get skillInfo(): SkillInfo {
        const { skills } = this.beastInfo.skillInfo
        return {
            ...this.beastInfo.skillInfo,
            skills: skills?.filter((info: Skill) => !info.skillroleid || info.skillroleid === this.selectRoleId)
        }
    }

    get combatInfo(): CombatInfo {
        const { attacks, defenses, movements } = this.beastInfo.combatInfo
        return {
            ...this.beastInfo.combatInfo,
            attacks: attacks.filter((info: AttackInfo) => info.roleid === this.selectRoleId),
            defenses: defenses.filter((info: DefenseInfo) => info.roleid === this.selectRoleId),
            movements: movements.filter((info: Movement) => !info.roleid || info.roleid === this.selectRoleId)
        }
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
import { Spell } from "../interfaces/infoInterfaces/castingInfo";
import CombatInfo, { AttackInfo, DefenseInfo, Movement } from "../interfaces/infoInterfaces/combatInfoInterfaces";
import GeneralInfo from "../interfaces/infoInterfaces/generalInfoInterfaces";
import ImageInfo from "../interfaces/infoInterfaces/ImageInfoInterfaces";
import LinkedInfo from "../interfaces/infoInterfaces/linkedInfoInterfaces";
import LootInfo from "../interfaces/infoInterfaces/lootInfoInterfaces";
import PlayerSpecificInfo from "../interfaces/infoInterfaces/playerSpecificInfoInterfaces";
import RoleInfo from "../interfaces/infoInterfaces/roleInfoInterfaces";
import SkillInfo, { Skill } from "../interfaces/infoInterfaces/skillInfoInterfaces";
import SocialInfo, { Conflict } from "../interfaces/infoInterfaces/socialInfo";
import { BeastInfo } from "../interfaces/viewInterfaces";
import CastingClass from "../pages/gmView/components/weirdshaping/models/CastingClass";

export default class GMBeastClass {
    private beastInfo: BeastInfo;

    private entryID: number
    private patreon: number
    private canplayerview: boolean

    private entryGeneralInfo: GeneralInfo
    private playerSpecificInfo: PlayerSpecificInfo
    private entryImageInfo: ImageInfo
    private entryLinkedInfo: LinkedInfo
    private entryRoleInfo: RoleInfo
    private entryCombatInfo: CombatInfo
    private entrySkillInfo: SkillInfo
    private entrySocialInfo: SocialInfo
    private entryLootInfo: LootInfo

    private castingTypeInfo: CastingClass
    private entrySpells: Spell[]

    private selectRoleId: string

    constructor(beastInfo: BeastInfo) {
        const { id, patreon, canplayerview, generalInfo, playerSpecificInfo, imageInfo, linkedInfo, roleInfo, combatInfo, skillInfo, socialInfo, lootInfo, castingInfo } = beastInfo

        this.entryID = id
        this.patreon = patreon
        this.canplayerview = canplayerview
        this.entryGeneralInfo = generalInfo
        this.playerSpecificInfo = playerSpecificInfo
        this.entryImageInfo = imageInfo
        this.entryLinkedInfo = linkedInfo
        this.entryRoleInfo = roleInfo
        this.entryCombatInfo = combatInfo
        this.entrySkillInfo = skillInfo
        this.entrySocialInfo = socialInfo
        this.entryLootInfo = lootInfo

        this.castingTypeInfo = new CastingClass(castingInfo.casting)
        this.entrySpells = castingInfo.spells
        this.selectRoleId = roleInfo.defaultrole
    }

    get id(): number {
        return this.entryID ?? 0
    }

    get maxPoints(): number {
        const { combatpoints } = this.entryCombatInfo
        const { skillpoints } = this.entrySkillInfo
        const { socialpoints } = this.entrySocialInfo
        return Math.max(combatpoints, skillpoints, socialpoints)
    }

    get generalInfo(): GeneralInfo {
        return this.entryGeneralInfo
    }

    get imageInfo(): ImageInfo {
        return this.entryImageInfo
    }

    get socialInfo(): SocialInfo {
        const { conflicts } = this.entrySocialInfo

        if (conflicts) {
            const { descriptions, convictions, relationships, flaws, burdens } = conflicts

            return {
                ...this.entrySocialInfo,
                conflicts: {
                    descriptions: descriptions.filter((info: Conflict) => !info.socialroleid || info.socialroleid === this.selectRoleId),
                    convictions: convictions.filter((info: Conflict) => !info.socialroleid || info.socialroleid === this.selectRoleId),
                    relationships: relationships.filter((info: Conflict) => !info.socialroleid || info.socialroleid === this.selectRoleId),
                    flaws: flaws.filter((info: Conflict) => !info.socialroleid || info.socialroleid === this.selectRoleId),
                    burdens: burdens.filter((info: Conflict) => !info.socialroleid || info.socialroleid === this.selectRoleId)
                }
            }
        }

        return this.socialInfo
    }

    get skillInfo(): SkillInfo {
        const { skills } = this.entrySkillInfo
        return {
            ...this.entrySkillInfo,
            skills: skills?.filter((info: Skill) => !info.skillroleid || info.skillroleid === this.selectRoleId)
        }
    }

    get combatInfo(): CombatInfo {
        return this.formatCombatInfo(this.entryCombatInfo)
    }

    formatCombatInfo = (combatInfo: CombatInfo): CombatInfo => {
        const { attacks, defenses, movements } = combatInfo

        return {
            ...combatInfo,
            attacks: attacks.filter((info: AttackInfo) => info.roleid === this.selectRoleId),
            defenses: defenses.filter((info: DefenseInfo) => info.roleid === this.selectRoleId),
            movements: movements.filter((info: Movement) => !info.roleid || info.roleid === this.selectRoleId)
        }
    }

    get linkedInfo(): LinkedInfo {
        return this.entryLinkedInfo
    }

    get lootInfo(): LootInfo {
        return this.entryLootInfo
    }

    get castingInfo(): CastingClass {
        return this.castingTypeInfo
    }

    get spells(): Spell[] {
        return this.entrySpells
    }

    get roleInfo(): RoleInfo {
        return this.entryRoleInfo
    }

    get selectedRoleId(): string {
        return this.selectRoleId
    }

    set selectedRoleId(newRoleId: string) {
        this.selectRoleId = newRoleId
    }

    // Brody: How to reload info?
    public updateSelectedRole = (newRoleId: string) => {
        this.selectedRoleId = newRoleId

        this.entryCombatInfo = this.formatCombatInfo(this.entryCombatInfo)
    }
}
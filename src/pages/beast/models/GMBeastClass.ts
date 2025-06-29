import { Spell } from "../interfaces/infoInterfaces/castingInfo";
import CombatInfo, { Movement } from "../interfaces/infoInterfaces/combatInfoInterfaces";
import GeneralInfo from "../interfaces/infoInterfaces/generalInfoInterfaces";
import ImageInfo from "../interfaces/infoInterfaces/ImageInfoInterfaces";
import LinkedInfo from "../interfaces/infoInterfaces/linkedInfoInterfaces";
import LootInfo from "../interfaces/infoInterfaces/lootInfoInterfaces";
import PlayerSpecificInfo from "../interfaces/infoInterfaces/playerSpecificInfoInterfaces";
import SocialInfo from "../interfaces/infoInterfaces/socialInfo";
import { BeastInfo } from "../interfaces/viewInterfaces";

import { Conflict } from '../../../../common/interfaces/beast/infoInterfaces/socialInfoInterfaces'
import { Skill } from '../../../../common/interfaces/beast/infoInterfaces/skillInfoInterfaces'
import SkillInfo from '../../../../common/interfaces/beast/infoInterfaces/skillInfoInterfaces'
import RoleInfo from "../../../../common/interfaces/beast/infoInterfaces/roleInfoInterfaces";
import { VitalityInfo, AttackInfo, DefenseInfo } from '../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces'
import { calculateAttackInfo, calculateDefenseInfo } from '../../../../common/utilities/scalingAndBonus/combat/combatCalculation'
import { calculateVitalityFatigueAndTrauma } from '../../../../common/utilities/scalingAndBonus/combat/vitalityFatigueAndTraumaCalculator'
import { calculateRankForCharacteristic, CharacteristicWithRanks, getDifficultyDie } from '../../../../common/utilities/scalingAndBonus/confrontation/confrontationCalculator'
import { calculateStressAndPanic } from '../../../../common/utilities/scalingAndBonus/skill/stressAndPanicCalculator'
import { calculateRankForSkill } from '../../../../common/utilities/scalingAndBonus/skill/skillRankCalculator'

import CastingClass from "../pages/gmView/components/weirdshaping/models/CastingClass";
import { Size } from "../../../../common/interfaces/beast/infoInterfaces/generalInfoInterfaces";

export default class GMBeastClass {
    private entryID: number
    private patreon: number
    private canplayerview: boolean

    private entryGeneralInfo: GeneralInfo
    private entryPlayerSpecificInfo: PlayerSpecificInfo
    private entryImageInfo: ImageInfo
    private entryLinkedInfo: LinkedInfo
    private entryRoleInfo: RoleInfo
    private entryCombatInfo: CombatInfo
    private entrySkillInfo: SkillInfo
    private entrySocialInfo: SocialInfo
    private entryLootInfo: LootInfo

    private castingTypeInfo: CastingClass
    private entrySpells: Spell[]

    private selectRoleIndex: number

    private selectedRoleModifier: number

    constructor(beastInfo: BeastInfo) {
        const { id, patreon, canplayerview, generalInfo, playerSpecificInfo, imageInfo, linkedInfo, roleInfo, combatInfo, skillInfo, socialInfo, lootInfo, castingInfo, roleModifier } = beastInfo

        this.entryID = id
        this.patreon = patreon
        this.canplayerview = canplayerview
        this.entryGeneralInfo = generalInfo
        this.entryPlayerSpecificInfo = playerSpecificInfo
        this.entryImageInfo = imageInfo
        this.entryLinkedInfo = linkedInfo
        this.entryRoleInfo = roleInfo
        this.entryCombatInfo = combatInfo
        this.entrySkillInfo = skillInfo
        this.entrySocialInfo = socialInfo
        this.entryLootInfo = lootInfo

        this.selectedRoleModifier = roleModifier ? roleModifier : 0

        this.castingTypeInfo = new CastingClass(castingInfo.casting)
        this.entrySpells = castingInfo.spells
        this.selectRoleIndex = roleInfo.roles.findIndex(role => roleInfo.defaultrole === role.id)
    }

    get beastInfo(): BeastInfo {
        return {
            id: this.id,
            patreon: this.patreon,
            canplayerview: this.canplayerview,
            generalInfo: this.entryGeneralInfo,
            playerSpecificInfo: this.entryPlayerSpecificInfo,
            imageInfo: this.entryImageInfo,
            linkedInfo: this.entryLinkedInfo,
            roleInfo: this.entryRoleInfo,
            combatInfo: this.entryCombatInfo,
            skillInfo: this.entrySkillInfo,
            socialInfo: this.entrySocialInfo,
            lootInfo: this.entryLootInfo,
            castingInfo: {
                casting: {
                    castingTypesArray: this.castingTypeInfo.castingTypes,
                    spellnumberdie: this.castingTypeInfo.getSpellNumberDie,
                    defaulttype: this.castingTypeInfo.getDefaultType,
                    beastid: this.id
                },
                spells: this.entrySpells
            },
            roleModifier: this.selectedRoleModifier
        }
    }

    get id(): number {
        return this.entryID ?? 0
    }

    get maxPoints(): number {
        const { combatpoints } = this.entryCombatInfo
        const { skillpoints } = this.entrySkillInfo
        const { socialpoints } = this.entrySocialInfo
        return Math.max(combatpoints + this.selectedRoleModifier, skillpoints + this.selectedRoleModifier, socialpoints + this.selectedRoleModifier)
    }

    get generalInfo(): GeneralInfo {
        const { size: mainSize } = this.entryGeneralInfo

        const roleSelected = this.isRoleSelected()

        const size = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].generalInfo.size : mainSize

        return {
            ...this.entryGeneralInfo,
            // a Role's size can be null, in which case, it defaults to the default size, so this is what this is doing
            size: size ?? mainSize
        }
    }

    get imageInfo(): ImageInfo {
        return this.entryImageInfo
    }

    get socialInfo(): SocialInfo {
        const { conflicts, socialrole: role, socialsecondary: secondary, socialpoints: points, archetypeInfo } = this.entrySocialInfo
        const { hasarchetypes: mainHasArchetypes, hasmonsterarchetypes: mainHasMonsterarchetypes } = archetypeInfo

        if (conflicts) {
            const { descriptions, convictions, relationships, flaws, burdens } = conflicts
            const roleID = this.beastInfo.roleInfo.roles[this.selectRoleIndex]?.id

            const roleSelected = this.isRoleSelected()

            const socialrole = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.socialrole : role
            const socialsecondary = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.socialsecondary : secondary
            const socialpoints = (roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.socialpoints : points) + this.selectedRoleModifier

            const hasarchetypes = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.hasarchetypes : mainHasArchetypes
            const hasmonsterarchetypes = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.hasmonsterarchetypes : mainHasMonsterarchetypes

            return {
                ...this.entrySocialInfo,
                socialrole, socialsecondary, socialpoints,
                archetypeInfo: {
                    ...archetypeInfo,
                    hasarchetypes, hasmonsterarchetypes,
                    difficultyDie: getDifficultyDie(socialpoints)
                },
                conflicts: {
                    descriptions: descriptions.reduce(this.adjustCharacteristicRank('Descriptions', socialpoints, roleID), []),
                    convictions: convictions.reduce(this.adjustCharacteristicRank('Convictions', socialpoints, roleID), []),
                    relationships: relationships.reduce(this.adjustCharacteristicRank('Relationships', socialpoints, roleID), []),
                    flaws: flaws.filter((info: Conflict) => !info.socialroleid || info.socialroleid === roleID || info.allroles),
                    burdens: burdens.filter((info: Conflict) => !info.socialroleid || info.socialroleid === roleID || info.allroles)
                }
            }
        }

        return this.socialInfo
    }

    adjustCharacteristicRank = (type: CharacteristicWithRanks, points: number, roleID: string) => {
        return (characteristics: Conflict[], characteristic: Conflict): Conflict[] => {
            if (!characteristic.socialroleid || characteristic.socialroleid === roleID || characteristic.allroles) {
                characteristics.push({
                    ...characteristic,
                    rank: calculateRankForCharacteristic(type, points, characteristic.strength, characteristic.adjustment)
                })
            }
            return characteristics
        }
    }

    get skillInfo(): SkillInfo {
        const { skills, skillrole: role, skillsecondary: secondary, skillpoints: points, stressStrength: mainStressStrength, panicStrength: mainPanicStrength } = this.entrySkillInfo
        const roleID = this.beastInfo.roleInfo.roles[this.selectRoleIndex]?.id

        const roleSelected = this.isRoleSelected()

        const skillrole = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skillrole : role
        const skillsecondary = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skillsecondary : secondary
        const skillpoints = (roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skillpoints : points) + this.selectedRoleModifier

        const stressStrength = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.stressStrength : mainStressStrength
        const panicStrength = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.panicStrength : mainPanicStrength

        return {
            ...this.entrySkillInfo,
            ...calculateStressAndPanic(skillrole, skillsecondary, skillpoints, stressStrength, panicStrength),
            skillrole, skillsecondary, skillpoints,
            skills: skills?.reduce(this.adjustSkillRank(skillpoints, roleID), [])
        }
    }

    adjustSkillRank = (points: number, roleID: string) => {
        return (skills: Skill[], skill: Skill): Skill[] => {
            if (!skill.skillroleid || skill.skillroleid === roleID || skill.allroles) {
                skills.push({
                    ...skill,
                    rank: calculateRankForSkill(points, skill.strength, skill.adjustment)
                })
            }
            return skills
        }
    }


    get combatInfo(): CombatInfo {
        return this.formatCombatInfo(this.entryCombatInfo, this.generalInfo.size)
    }

    formatCombatInfo = (combatInfo: CombatInfo, size: Size): CombatInfo => {
        const { attacks, defenses, movements, combatrole: role, combatsecondary: secondary, combatpoints: points, vitalityInfo: mainVitalityInfo } = combatInfo
        const roleID = this.beastInfo.roleInfo.roles[this.selectRoleIndex]?.id

        const roleSelected = this.isRoleSelected()

        const combatrole = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].combatInfo.combatrole : role
        const combatsecondary = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].combatInfo.combatsecondary : secondary
        const combatpoints = (roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].combatInfo.combatpoints : points) + this.selectedRoleModifier

        const vitalityInfo = roleSelected ? this.populateVitalityInfo(mainVitalityInfo, this.entryRoleInfo.roles[this.selectRoleIndex].combatInfo.vitalityInfo) : mainVitalityInfo

        return {
            ...combatInfo,
            combatrole, combatsecondary, combatpoints, 
            vitalityInfo: {
                ...vitalityInfo,
                ...calculateVitalityFatigueAndTrauma(combatrole, combatsecondary, combatpoints, vitalityInfo.vitalityStrength, vitalityInfo.fatigueStrength)
            },
            attacks: attacks.reduce(this.adjustAttackInfo(combatpoints, roleID, combatrole), []),
            defenses: defenses.reduce(this.adjustDefenseInfo(combatpoints, roleID, combatrole, size), []),
            movements: movements.filter((info: Movement) => !info.roleid || info.roleid === roleID || info.allroles)
        }
    }

    adjustAttackInfo = (points: number, roleID: string, role: string) => {
        return (attackInfo: AttackInfo[], attack: AttackInfo): AttackInfo[] => {
            if (!attack.roleid || attack.roleid === roleID) {
                attackInfo.push(
                    calculateAttackInfo(attack.scalingInfo, points, role)
                )
            }
            return attackInfo
        }
    }

    adjustDefenseInfo = (points: number, roleID: string, role: string, size: Size) => {
        return (defenseInfo: DefenseInfo[], defense: DefenseInfo): DefenseInfo[] => {
            if (!defense.roleid || defense.roleid === roleID) {
                defenseInfo.push({
                    ...calculateDefenseInfo(defense.scalingInfo, points, role, defense.scalingInfo.addsizemod, size),
                    scalingInfo: defense.scalingInfo
                })
            }
            return defenseInfo
        }
    }

    populateVitalityInfo = (mainVitalityInfo: VitalityInfo, roleVitalityInfo: VitalityInfo): VitalityInfo => {
        // BRODY is this faster than just looping through the object
        return {
            locationalVitalities: roleVitalityInfo.locationalVitalities ?? mainVitalityInfo.locationalVitalities,
            fatigue: roleVitalityInfo.fatigue ?? mainVitalityInfo.fatigue,
            notrauma: roleVitalityInfo.notrauma ?? mainVitalityInfo.notrauma,
            knockback: roleVitalityInfo.knockback ?? mainVitalityInfo.knockback,
            singledievitality: roleVitalityInfo.singledievitality ?? mainVitalityInfo.singledievitality,
            noknockback: roleVitalityInfo.noknockback ?? mainVitalityInfo.noknockback,
            rollundertrauma: roleVitalityInfo.rollundertrauma ?? mainVitalityInfo.rollundertrauma,
            isincorporeal: roleVitalityInfo.isincorporeal ?? mainVitalityInfo.isincorporeal,
            weaponbreakagevitality: roleVitalityInfo.weaponbreakagevitality ?? mainVitalityInfo.weaponbreakagevitality,
            vitality: roleVitalityInfo.vitality ?? mainVitalityInfo.vitality,
            trauma: roleVitalityInfo.trauma ?? mainVitalityInfo.trauma,
            vitalityStrength: roleVitalityInfo.vitalityStrength ?? mainVitalityInfo.vitalityStrength,
            fatigueStrength: roleVitalityInfo.fatigueStrength ?? roleVitalityInfo.fatigueStrength
        }
    }

    isRoleSelected = (): boolean => {
        return this.selectRoleIndex >= 0
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

    get selectedRoleIndex(): number {
        return this.selectRoleIndex
    }

    set selectedRoleIndex(newIndex: number) {
        this.selectedRoleIndex = newIndex
    }
}
import { Spell } from "../interfaces/infoInterfaces/castingInfo";
import CombatInfo, { AttackInfo, DefenseInfo, Movement } from "../interfaces/infoInterfaces/combatInfoInterfaces";
import GeneralInfo from "../interfaces/infoInterfaces/generalInfoInterfaces";
import ImageInfo from "../interfaces/infoInterfaces/ImageInfoInterfaces";
import LinkedInfo from "../interfaces/infoInterfaces/linkedInfoInterfaces";
import LootInfo from "../interfaces/infoInterfaces/lootInfoInterfaces";
import PlayerSpecificInfo from "../interfaces/infoInterfaces/playerSpecificInfoInterfaces";
import RoleInfo from "../interfaces/infoInterfaces/roleInfoInterfaces";
import { Skill } from "../interfaces/infoInterfaces/skillInfoInterfaces";
import SocialInfo from "../interfaces/infoInterfaces/socialInfo";
import { BeastInfo } from "../interfaces/viewInterfaces";

import { Conflict } from '../../../../common/interfaces/beast/infoInterfaces/socialInfoInterfaces'
import SkillInfo from '../../../../common/interfaces/beast/infoInterfaces/skillInfoInterfaces'
import { calculateRankForCharacteristic, CharacteristicWithRanks, getDifficultyDie } from '../../../../common/utilities/scalingAndBonus/confrontation/confrontationCalculator'
import { calculateStressAndPanic } from '../../../../common/utilities/scalingAndBonus/skill/stressAndPanicCalculator'

import CastingClass from "../pages/gmView/components/weirdshaping/models/CastingClass";

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
        return this.entryGeneralInfo
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
            skills: skills?.filter((info: Skill) => !info.skillroleid || info.skillroleid === roleID || info.allroles)
        }
    }

    get combatInfo(): CombatInfo {
        return this.formatCombatInfo(this.entryCombatInfo)
    }

    formatCombatInfo = (combatInfo: CombatInfo): CombatInfo => {
        const { attacks, defenses, movements, combatrole: role, combatsecondary: secondary, combatpoints: points } = combatInfo
        const roleID = this.beastInfo.roleInfo.roles[this.selectRoleIndex]?.id

        const roleSelected = this.isRoleSelected()

        const combatrole = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].combatInfo.combatrole : role
        const combatsecondary = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].combatInfo.combatsecondary : secondary
        const combatpoints = (roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].combatInfo.combatpoints : points) + this.selectedRoleModifier

        return {
            ...combatInfo,
            combatrole, combatsecondary, combatpoints,
            attacks: attacks.filter((info: AttackInfo) => !info.roleid || info.roleid === roleID),
            defenses: defenses.filter((info: DefenseInfo) => !info.roleid || info.roleid === roleID),
            movements: movements.filter((info: Movement) => !info.roleid || info.roleid === roleID)
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
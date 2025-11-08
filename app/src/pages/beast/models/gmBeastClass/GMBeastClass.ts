import { Spell } from "../../interfaces/infoInterfaces/castingInfo";
import ImageInfo from "../../interfaces/infoInterfaces/ImageInfoInterfaces";
import LinkedInfo from "../../interfaces/infoInterfaces/linkedInfoInterfaces";
import LootInfo from "../../interfaces/infoInterfaces/lootInfoInterfaces";
import PlayerSpecificInfo from "../../interfaces/infoInterfaces/playerSpecificInfoInterfaces";
import { BeastInfo } from "../../interfaces/viewInterfaces";

import SocialInfo, { Conflict } from '@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces'
import { Skill } from '@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces'
import SkillInfo from '@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces'
import RoleInfo, { Role } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces";
import calculateStress from '@bestiary/common/utilities/scalingAndBonus/skill/calculateStress'
import { calculateRankForCharacteristic, CharacteristicWithRanks } from "@bestiary/common/utilities/scalingAndBonus/confrontation/calculateRankForCharacteristic"

import GeneralInfo from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces";
import { createSearchParams } from "react-router-dom";
import alertInfo from "../../../../components/alert/alerts";
import { Notes } from "@bestiary/common/interfaces/beast/infoInterfaces/playerSpecificInfoInterfaces";
import CastingClass from "../../pages/view/gmView/components/weirdshaping/models/CastingClass";
import CombatInfoClass from "./components/CombatInfoClass";
import CombatInfo from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import getCapacity from "@bestiary/common/utilities/scalingAndBonus/confrontation/getCapacity"
import getBaseSocialRank from "@bestiary/common/utilities/scalingAndBonus/confrontation/getBaseSocialRank"
import getSkillRank from "@bestiary/common/utilities/scalingAndBonus/skill/getSkillRank"

interface ModifierIndexDictionaryObject {
    [key: string]: number
}

export default class GMBeastClass {
    private entryID: number
    private patreon: number
    private canplayerview: boolean

    private entryGeneralInfo: GeneralInfo
    private entryPlayerSpecificInfo: PlayerSpecificInfo
    private entryImageInfo: ImageInfo
    private entryLinkedInfo: LinkedInfo
    private entryRoleInfo: RoleInfo
    private entryCombatInfo: CombatInfoClass
    private entrySkillInfo: SkillInfo
    private entrySocialInfo: SocialInfo
    private entryLootInfo: LootInfo

    private castingTypeInfo: CastingClass
    private entrySpells: Spell[]

    private selectRoleIndex: number

    private selectedModifier: number

    constructor(beastInfo: BeastInfo, roleId: string | null, modifier: string | null) {
        const { id, patreon, canplayerview, generalInfo, playerInfo, imageInfo, linkedInfo, roleInfo, combatInfo, skillInfo, socialInfo, lootInfo,
            castingInfo, roleModifier, } = beastInfo

        this.entryID = id
        this.patreon = patreon
        this.canplayerview = canplayerview
        this.entryGeneralInfo = generalInfo
        this.entryPlayerSpecificInfo = playerInfo
        this.entryImageInfo = imageInfo
        this.entryLinkedInfo = linkedInfo
        this.entryRoleInfo = roleInfo
        this.entryCombatInfo = new CombatInfoClass(combatInfo)
        this.entrySkillInfo = skillInfo
        this.entrySocialInfo = socialInfo
        this.entryLootInfo = lootInfo

        this.selectedModifier = this.getSelectedModifier(roleModifier, modifier)

        this.castingTypeInfo = new CastingClass(castingInfo.casting)
        this.entrySpells = castingInfo.spells

        this.selectRoleIndex = this.getRoleIndex(roleInfo.roles, roleInfo.defaultrole, roleId)
    }

    public getSelectedModifier = (modifier: number = 0, modifierFromParam: string | null): number => {
        if (modifierFromParam) {
            const modifierIndexDictionary: ModifierIndexDictionaryObject = {
                'NONE': 0,
                'UNIQUE': 5,
                'GREATER': 10,
                'DREAD': 15,
                'THE': 20
            }

            return modifierIndexDictionary[modifierFromParam.toUpperCase()]
        }

        return modifier
    }

    public getRoleIndex = (roles: Role[], defaultRole: string, roleFromParam: string | null) => {
        if (roleFromParam) {
            return roles.findIndex(role => roleFromParam === role.id)
        }

        return roles.findIndex(role => defaultRole === role.id)
    }

    get beastInfo(): BeastInfo {
        return {
            id: this.id,
            patreon: this.patreon,
            canplayerview: this.canplayerview,
            generalInfo: this.entryGeneralInfo,
            playerInfo: this.entryPlayerSpecificInfo,
            imageInfo: this.entryImageInfo,
            linkedInfo: this.entryLinkedInfo,
            roleInfo: this.entryRoleInfo,
            combatInfo: this.entryCombatInfo.rawCombatInfo,
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
            roleModifier: this.selectedModifier
        }
    }

    get id(): number {
        return this.entryID ?? 0
    }

    get maxPoints(): number {
        const { combatSkulls } = this.entryCombatInfo
        const { skillSkulls } = this.entrySkillInfo
        const { socialSkulls } = this.entrySocialInfo
        return Math.max(combatSkulls + this.selectedModifier, skillSkulls + this.selectedModifier, socialSkulls + this.selectedModifier)
    }

    get gritDie(): string {
        const { combatSkulls } = this.entryCombatInfo
        const { skillSkulls } = this.entrySkillInfo
        const { socialSkulls } = this.entrySocialInfo

        const average = Math.floor([combatSkulls, skillSkulls, socialSkulls].reduce((a, b) => a + b) / 3)

        const gritDieDictionary = ['', 'd20', 'd12', 'd10', 'd8', 'd6', 'd4', 'd0']

        return gritDieDictionary[average]
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
        const { conflicts, socialRole: role, socialSecondary: secondary, socialSkulls: skulls, archetypeInfo, skullIndex: mainSkullIndex } = this.entrySocialInfo
        const { hasArchetypes: mainHasArchetypes, hasMonsterArchetypes: mainHasMonsterarchetypes } = archetypeInfo

        if (conflicts) {
            const { descriptions, convictions, relationships, flaws, burdens } = conflicts
            const roleID = this.beastInfo.roleInfo.roles[this.selectRoleIndex]?.id

            const roleSelected = this.isRoleSelected()

            const socialRole = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.socialRole : role
            const socialSecondary = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.socialSecondary : secondary

            const socialSkulls = (roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.socialSkulls : skulls) + this.selectedModifier
            const skullIndex = (roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.skullIndex : mainSkullIndex) + this.selectedModifier

            const hasArchetypes = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.hasarchetypes : mainHasArchetypes
            const hasMonsterArchetypes = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.hasmonsterarchetypes : mainHasMonsterarchetypes

            return {
                ...this.entrySocialInfo,
                socialRole, socialSecondary,
                socialSkulls,
                capacity: getCapacity(skullIndex, socialRole, socialSecondary),
                archetypeInfo: {
                    ...archetypeInfo,
                    hasArchetypes, hasMonsterArchetypes,
                    baseRank: getBaseSocialRank(skullIndex)
                },
                conflicts: {
                    descriptions: descriptions.reduce(this.adjustCharacteristicRank('Descriptions', skullIndex, roleID, socialRole), []),
                    convictions: convictions.reduce(this.adjustCharacteristicRank('Convictions', skullIndex, roleID, socialRole), []),
                    relationships: relationships.reduce(this.adjustCharacteristicRank('Relationships', skullIndex, roleID, socialRole), []),
                    flaws: flaws.filter((info: Conflict) => !info.socialRoleID || info.socialRoleID === roleID || info.allRoles),
                    burdens: burdens.filter((info: Conflict) => !info.socialRoleID || info.socialRoleID === roleID || info.allRoles)
                }
            }
        }

        return this.socialInfo
    }

    private adjustCharacteristicRank = (type: CharacteristicWithRanks, skullIndex: number, roleID: string, role: string) => {
        return (characteristics: Conflict[], characteristic: Conflict): Conflict[] => {
            if (!characteristic.socialRoleID || characteristic.socialRoleID === roleID || characteristic.allRoles) {
                characteristics.push({
                    ...characteristic,
                    rank: calculateRankForCharacteristic(type, skullIndex, role)
                })
            }
            return characteristics
        }
    }

    get skillInfo(): SkillInfo {
        const { skills, skillRole: role, skillSecondary: secondary, skillSkulls: skulls, skullIndex: index } = this.entrySkillInfo
        const roleID = this.beastInfo.roleInfo.roles[this.selectRoleIndex]?.id

        const roleSelected = this.isRoleSelected()

        const skillRole = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skillRole : role
        const skillSecondary = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skillSecondary : secondary

        const skillSkulls = (roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skillSkulls : skulls) + this.selectedModifier
        const skullIndex = (roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skullIndex : index) + this.selectedModifier

        return {
            ...this.entrySkillInfo,
            stress: calculateStress(skillRole, skillSecondary, skullIndex),
            skillRole, skillSecondary, skillSkulls,
            skills: skills?.reduce(this.adjustSkillRank(skullIndex, roleID), [])
        }
    }

    private adjustSkillRank = (skullIndex: number, roleID: string) => {
        return (skills: Skill[], skill: Skill): Skill[] => {
            if (!skill.skillroleid || skill.skillroleid === roleID || skill.allroles) {
                skills.push({
                    ...skill,
                    rank: getSkillRank(skullIndex)
                })
            }
            return skills
        }
    }

    get combatInfo(): CombatInfo {
        const roleID: string = this.beastInfo.roleInfo.roles[this.selectRoleIndex]?.id
        const selectedRole: Role = this.entryRoleInfo.roles[this.selectRoleIndex]

        return this.entryCombatInfo.combatInfo(this.generalInfo.size, roleID, selectedRole, this.selectedModifier)
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
        return this.entrySpells.reduce(this.filterSpells(this.selectedRoleID), [])
    }

    private filterSpells(roleID: string | null) {
        return (spells: Spell[], spell: Spell) => {
            if (spell.allroles || spell.roleid === roleID) {
                spells.push(spell)
            }
            return spells
        }
    }

    get roleInfo(): RoleInfo {
        return this.entryRoleInfo
    }

    public isRoleSelected = (): boolean => {
        return this.selectRoleIndex >= 0
    }

    get selectedRoleID(): string | null {
        if (this.selectRoleIndex >= 0) {
            return this.roleInfo.roles[this.selectRoleIndex].id
        }

        return null
    }

    get selectedRoleIndex(): number {
        return this.selectRoleIndex
    }

    set selectedRoleIndex(newIndex: number) {
        this.selectedRoleIndex = newIndex
    }

    get roleName(): string | null {
        if (this.selectRoleIndex >= 0) {
            return this.roleInfo.roles[this.selectRoleIndex].generalInfo.name
        }

        return null
    }

    get combatRoleType(): string | null {
        if (this.selectRoleIndex >= 0) {
            return this.roleInfo.roles[this.selectRoleIndex].combatInfo.combatRole
        }

        return this.combatInfo.combatRole
    }

    get modifierIndex() {
        return this.selectedModifier
    }

    public copyQuickLink = (): void => {
        let textArea = this.getTextArea()
        const url = this.getURL()

        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            alertInfo({ color: "green", message: `${url} successfully copied`, type: 'message' })
        } catch (err) {
            alertInfo({ color: "red", message: `Unable to copy ${url}`, type: 'message' })
        }
        document.body.removeChild(textArea);
    }

    private getTextArea = () => {
        let textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';

        return textArea
    }

    private getURL = () => {
        const { origin, pathname } = window.location
        return `${origin}${pathname}?${createSearchParams(this.getQuickLinkParams()).toString()}`
    }

    private getQuickLinkParams = (): any => {
        const selectedRoleId: string = this.roleInfo.roles[this.selectRoleIndex].id

        if (selectedRoleId && this.selectedModifier) {
            return {
                roleId: selectedRoleId,
                modifier: `${this.selectedModifier}`
            }
        } else if (selectedRoleId) {
            return {
                roleId: selectedRoleId,
            }
        } else if (this.selectedModifier) {
            return {
                modifier: `${this.selectedModifier}`
            }
        }

        return {}
    }

    get hasModifier(): boolean {
        return !!this.modifierIndex
    }

    get notes(): Notes {
        return this.entryPlayerSpecificInfo.notes
    }

    get favorite(): boolean {
        return this.entryPlayerSpecificInfo.favorite
    }

    get playerInfo(): PlayerSpecificInfo {
        return this.entryPlayerSpecificInfo
    }
}
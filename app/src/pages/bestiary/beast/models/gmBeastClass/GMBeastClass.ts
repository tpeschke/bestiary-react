import ImageInfo from "../../interfaces/infoInterfaces/ImageInfoInterfaces";
import LootInfo from "../../interfaces/infoInterfaces/lootInfoInterfaces";
import PlayerSpecificInfo from "../../interfaces/infoInterfaces/playerSpecificInfoInterfaces";
import { BeastInfo } from "../../interfaces/viewInterfaces";

import { Conflict, NonspecificSocialInfo, SpecificSocialInfo } from '@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces'
import { NonspecificSkillInfo, SpecificSkillInfo } from '@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces'
import calculateStress from '@bestiary/common/utilities/scalingAndBonus/bonfire/skill/calculateStress'
import { calculateRankForCharacteristic, CharacteristicWithRanks } from "@bestiary/common/utilities/scalingAndBonus/bonfire/confrontation/calculateRankForCharacteristic"
import getSocialSkillSuites from "@bestiary/common/utilities/scalingAndBonus/bonfire/confrontation/utilities/getSocialSkillSuites"

import { NonspecificGeneralInfo, SaveObject, SpecificGeneralInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces";
import { createSearchParams } from "react-router-dom";
import alertInfo from "../../../../../components/alert/alerts";
import { Notes } from "@bestiary/common/interfaces/beast/infoInterfaces/playerSpecificInfoInterfaces";
import CastingClass from "../../pages/view/gmView/components/weirdshaping/models/CastingClass";
import CombatInfoClass from "./components/CombatInfoClass";
import getCapacity from "@bestiary/common/utilities/scalingAndBonus/bonfire/confrontation/getCapacity"
import getBaseSocialRank from "@bestiary/common/utilities/scalingAndBonus/bonfire/confrontation/getBaseSocialRank"
import getSkills from "@bestiary/common/utilities/scalingAndBonus/bonfire/skill/getSkills";
import { Spell } from "@bestiary/common/interfaces/beast/infoInterfaces/castingInfo";
import getDefenseNFlee from "@bestiary/common/utilities/scalingAndBonus/bonfire/getDefenseNFlee"
import LinkedInfo from "@bestiary/common/interfaces/beast/infoInterfaces/linkedInfoInterfaces";
import { Access } from "@bestiary/common/utilities/get/getAccessLevel";
import getSystemString, { BONFIRE, HACKMASTER } from "@bestiary/common/utilities/get/getSystemString";
import { SystemOption } from "@bestiary/common/interfaces/beast/beast";
import getPhysicalSave from "@bestiary/common/utilities/scalingAndBonus/hackMaster/saves/getPhysicalSave";
import getMentalSave from "@bestiary/common/utilities/scalingAndBonus/hackMaster/saves/getMentalSave";
import getDodgeSave from "@bestiary/common/utilities/scalingAndBonus/hackMaster/saves/getDodgeSave";
import { getRarity } from "@bestiary/common/utilities/get/getRarity"
import { NonspecificCombatInfo, SpecificCombatInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import GeneralRoleInfo, { Role } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/roleInfoInterfaces";

interface ModifierIndexDictionaryObject {
    [key: string]: number
}

export default class GMBeastClass {
    private entryID: number
    private patreon: Access
    private canplayerview: boolean
    public system: SystemOption

    private entryGeneralInfo: NonspecificGeneralInfo
    private entryPlayerSpecificInfo: PlayerSpecificInfo
    private entryImageInfo: ImageInfo
    private entryLinkedInfo: LinkedInfo
    private entryRoleInfo: GeneralRoleInfo
    private entryCombatInfo: CombatInfoClass
    private entrySkillInfo: NonspecificSkillInfo
    private entrySocialInfo: NonspecificSocialInfo
    private entryLootInfo: LootInfo

    private castingTypeInfo: CastingClass
    private entrySpells: Spell[]

    private selectRoleIndex: number

    private selectedModifier: number

    constructor(beastInfo: BeastInfo, roleId: string | null, modifier: string | null, newSystem?: 0 | 1 | 2) {
        const { id, patreon, canplayerview, generalInfo, playerInfo, imageInfo, linkedInfo, roleInfo, combatInfo, skillInfo, socialInfo, lootInfo,
            castingInfo, roleModifier, system } = beastInfo

        this.system = newSystem || newSystem === 0 ? getSystemString(newSystem) : system

        this.entryID = id
        this.patreon = patreon
        this.canplayerview = canplayerview
        this.entryGeneralInfo = generalInfo
        this.entryPlayerSpecificInfo = playerInfo
        this.entryImageInfo = imageInfo
        this.entryLinkedInfo = linkedInfo
        this.entryRoleInfo = roleInfo
        this.entryCombatInfo = new CombatInfoClass(combatInfo, this.system)
        this.entrySkillInfo = skillInfo
        this.entrySocialInfo = socialInfo
        this.entryLootInfo = lootInfo

        this.selectedModifier = this.getSelectedModifier(roleModifier, modifier)

        this.castingTypeInfo = new CastingClass(castingInfo?.casting)
        this.entrySpells = castingInfo?.spells ?? []

        this.selectRoleIndex = this.getRoleIndex(roleInfo.roles, roleInfo.defaultrole, roleId)
    }

    private modifierIndexDictionary: ModifierIndexDictionaryObject = {
        'NONE': 0,
        'UNIQUE': 5,
        'GREATER': 10,
        'DREAD': 15,
        'THE': 20
    }

    public getSelectedModifier = (modifier: number = 0, modifierFromParam: string | null): number => {
        if (modifierFromParam && this.modifierIndexDictionary[modifierFromParam.toUpperCase()]) {
            return this.modifierIndexDictionary[modifierFromParam.toUpperCase()]
        } else if (modifierFromParam) {
            return +modifierFromParam
        }

        return modifier
    }

    get specialModifier(): number {
        if (this.system === 'HackMaster') {
            return this.selectedModifier * 3
        }
        return this.selectedModifier
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
            system: this.system,
            generalInfo: this.entryGeneralInfo,
            playerInfo: this.entryPlayerSpecificInfo,
            imageInfo: this.entryImageInfo,
            linkedInfo: this.entryLinkedInfo,
            roleInfo: this.entryRoleInfo,
            combatInfo: this.entryCombatInfo.rawCombatInfo,
            skillInfo: this.entrySkillInfo,
            socialInfo: this.rawSocialInfo,
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
        return Math.max(combatSkulls + this.specialModifier, skillSkulls + this.specialModifier, socialSkulls + this.specialModifier)
    }

    get selfDoubtDie(): string {
        const { combatSkulls } = this.entryCombatInfo
        const { skillSkulls } = this.entrySkillInfo
        const { socialSkulls } = this.entrySocialInfo

        const average = Math.floor([combatSkulls, skillSkulls, socialSkulls].reduce((a, b) => a + b) / 3)

        const selfDoubtDieDictionary = ['d20', 'd12', 'd10', 'd8', 'd6', 'd4', 'd0']

        return selfDoubtDieDictionary[average]
    }

    get saves(): [SaveObject, SaveObject, SaveObject] | null {
        if (this.system === 'HackMaster') {
            const { epValueIndex: mainEpValueIndex } = this.entrySocialInfo
            const roleSelected = this.isRoleSelected()
            const epValueIndex = (roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.epValueIndex : mainEpValueIndex) + this.selectedModifier

            return [{
                label: 'Physical',
                rank: getPhysicalSave(epValueIndex)
            }, {
                label: 'Mental',
                rank: getMentalSave(epValueIndex)
            }, {
                label: 'Dodge',
                rank: getDodgeSave(epValueIndex)
            }]
        }

        return null
    }

    get generalInfo(): SpecificGeneralInfo {
        const { size: mainSize, rarity: baseRarity, appearance } = this.entryGeneralInfo

        const roleSelected = this.isRoleSelected()

        const size = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].generalInfo.size : mainSize

        const rarity = getRarity(baseRarity.rarityId, this.system)

        return {
            ...this.entryGeneralInfo,
            rarity,
            appearance: this.system === 'Bonfire' ? appearance[BONFIRE] : appearance[HACKMASTER],
            // a Role's size can be null, in which case, it defaults to the default size, so this is what this is doing
            size: size ?? mainSize
        }
    }

    get rawGeneralInfo(): NonspecificGeneralInfo {
        const { size: mainSize, rarity: baseRarity, appearance } = this.entryGeneralInfo

        const roleSelected = this.isRoleSelected()

        const size = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].generalInfo.size : mainSize

        const rarity = getRarity(baseRarity.rarityId, this.system)

        return {
            ...this.entryGeneralInfo,
            rarity,
            // a Role's size can be null, in which case, it defaults to the default size, so this is what this is doing
            size: size ?? mainSize
        }
    }

    get imageInfo(): ImageInfo {
        return this.entryImageInfo
    }

    get socialInfo(): SpecificSocialInfo {
        if (this.system === 'HackMaster') {
            return this.getHackMasterSocialInfo()
        }

        return this.getBonfireSocialInfo()
    }

    get rawSocialInfo(): NonspecificSocialInfo {
        return this.entrySocialInfo
    }

    private getBonfireSocialInfo(): SpecificSocialInfo {
        const { conflicts, socialRole: role, socialSecondary: secondary, socialSkulls: skulls, skullIndex: mainSkullIndex, capacity: mainCapacity } = this.entrySocialInfo

        if (conflicts) {
            const { convictions, relationships, flaws, burdens } = conflicts
            const roleID = this.beastInfo.roleInfo.roles[this.selectRoleIndex]?.id

            const roleSelected = this.isRoleSelected()

            const socialRole = roleSelected ? this.entryRoleInfo?.roles[this.selectRoleIndex].socialInfo.socialRole : role
            const socialSecondary = roleSelected ? this.entryRoleInfo?.roles[this.selectRoleIndex].socialInfo.socialSecondary : secondary

            const capacity = roleSelected ? this.entryRoleInfo?.roles[this.selectRoleIndex].socialInfo.capacity : mainCapacity

            const socialSkulls = (roleSelected ? this.entryRoleInfo?.roles[this.selectRoleIndex].socialInfo.socialSkulls : skulls) + this.specialModifier
            const skullIndex = (roleSelected ? this.entryRoleInfo?.roles[this.selectRoleIndex].socialInfo.skullIndex : mainSkullIndex) + this.specialModifier

            let attackInfo = this.entrySocialInfo.attackInfo[BONFIRE]
            let defenseInfo = this.entrySocialInfo.defenseInfo[BONFIRE]

            if (roleSelected) {
                const { attackInfo: attack, defenseInfo: defense } = this.entryRoleInfo?.roles[this.selectRoleIndex].socialInfo
                if (attack) { attackInfo += attack[BONFIRE] }
                if (defense) { defenseInfo += defense[BONFIRE] }
            }

            return {
                ...this.entrySocialInfo,
                type: 'Bonfire',
                socialRole, socialSecondary,
                attackInfo,
                defenseInfo,
                socialSkulls,
                capacity: {
                    threshold: getCapacity(skullIndex, socialRole, socialSecondary, capacity.strength, 'Bonfire'),
                    strength: capacity.strength
                },
                baseConvictionRank: calculateRankForCharacteristic('Convictions', skullIndex, socialRole),
                conflicts: {
                    socialSkillSuites: getSocialSkillSuites(socialRole, skullIndex),
                    convictions: convictions.reduce(this.adjustCharacteristicRank('Convictions', skullIndex, roleID, socialRole), []),
                    relationships: relationships.reduce(this.adjustCharacteristicRank('Relationships', skullIndex, roleID, socialRole), []),
                    flaws: flaws.filter((info: Conflict) => !info.socialRoleID || info.socialRoleID === roleID || info.allRoles),
                    burdens: burdens.filter((info: Conflict) => !info.socialRoleID || info.socialRoleID === roleID || info.allRoles)
                }
            }
        }

        return this.socialInfo
    }

    private getHackMasterSocialInfo(): SpecificSocialInfo {
        const { conflicts, socialRole: role, socialSecondary: secondary, socialEpValue: mainEpValue, socialRawEpValue: mainRawEpValue, epValueIndex: mainEpValueIndex, capacity: mainCapacity } = this.entrySocialInfo

        if (conflicts) {
            const { convictions, relationships, flaws, burdens } = conflicts
            const roleID = this.beastInfo.roleInfo.roles[this.selectRoleIndex]?.id

            const roleSelected = this.isRoleSelected()

            const socialRole = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.socialRole : role
            const socialSecondary = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.socialSecondary : secondary

            const capacity = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.capacity : mainCapacity

            const epPercentIncrease = (this.specialModifier / 10) + 1

            const epValue = +((roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.socialEpValue : mainEpValue) * epPercentIncrease).toFixed(0)
            const rawEpValue = (roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.socialRawEpValue : mainRawEpValue)
            const epValueIndex = (roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.epValueIndex : mainEpValueIndex) + this.specialModifier

            let attackInfo = this.entrySocialInfo.attackInfo[HACKMASTER]
            let defenseInfo = this.entrySocialInfo.defenseInfo[HACKMASTER]

            if (roleSelected) {
                const { attackInfo: attack, defenseInfo: defense } = this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo
                if (attack) { attackInfo += attack[HACKMASTER] }
                if (defense) { defenseInfo += defense[HACKMASTER] }
            }

            return {
                ...this.entrySocialInfo,
                type: 'HackMaster',
                attackInfo,
                defenseInfo,
                socialRole, socialSecondary,
                socialEpValue: epValue,
                socialRawEpValue: rawEpValue,
                epValueIndex,
                capacity: {
                    threshold: getCapacity(epValueIndex, socialRole, socialSecondary, capacity.strength, 'HackMaster'),
                    strength: capacity.strength
                },
                baseConvictionRank: 0,
                conflicts: {
                    socialSkillSuites: getSocialSkillSuites(socialRole, epValueIndex, 'HackMaster'),
                    convictions: convictions.reduce(this.adjustCharacteristicRank('Convictions', epValueIndex, roleID, socialRole), []),
                    relationships: relationships.reduce(this.adjustCharacteristicRank('Relationships', epValueIndex, roleID, socialRole), []),
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

    get skillInfo(): SpecificSkillInfo {
        if (this.system === 'HackMaster') {
            return this.getHackMasterSkillInfo()
        }

        return this.getBonfireSkillInfo()
    }

    get rawSkillInfo(): NonspecificSkillInfo {
        const { skillRole: role, skillSecondary: secondary, skillSkulls: skulls, skullIndex: index, stress, skills: mainSkills } = this.entrySkillInfo

        const roleSelected = this.isRoleSelected()

        const skillRole = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skillRole : role
        const skillSecondary = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skillSecondary : secondary

        const skillSkulls = (roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skillSkulls : skulls) + this.specialModifier
        const skullIndex = (roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skullIndex : index) + this.specialModifier

        const skills = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skills : mainSkills

        return {
            ...this.entrySkillInfo,
            stress: {
                threshold: calculateStress(skillSecondary, skullIndex, stress.strength),
                strength: stress.strength,
                defenseNFleeDice: getDefenseNFlee(skillRole, skullIndex)
            },
            skillRole, skillSecondary, skillSkulls, skullIndex,
            skills: getSkills(skillRole, skullIndex, skills?.everythingElseStrength, skills)
        }
    }

    get bonfireSkillInfo(): SpecificSkillInfo {
        return this.getBonfireSkillInfo()
    }

    private getBonfireSkillInfo(): SpecificSkillInfo {
        const { skillRole: role, skillSecondary: secondary, skillSkulls: skulls, skullIndex: index, stress, skills: mainSkills } = this.entrySkillInfo

        const roleSelected = this.isRoleSelected()

        const skillRole = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skillRole : role
        const skillSecondary = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skillSecondary : secondary

        const skillSkulls = (roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skillSkulls : skulls) + this.specialModifier
        const skullIndex = (roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skullIndex : index) + this.specialModifier

        const skills = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skills : mainSkills

        let attackInfo = this.entrySkillInfo.attackInfo[BONFIRE]
        let defenseInfo = this.entrySkillInfo.defenseInfo[BONFIRE]

        if (roleSelected) {
            const { attackInfo: attack, defenseInfo: defense } = this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo
            if (attack) { attackInfo += attack[BONFIRE] }
            if (defense) { defenseInfo += defense[BONFIRE] }
        }

        return {
            ...this.entrySkillInfo,
            type: 'Bonfire',
            attackInfo,
            defenseInfo,
            stress: {
                threshold: calculateStress(skillSecondary, skullIndex, stress.strength),
                strength: stress.strength,
                defenseNFleeDice: getDefenseNFlee(skillRole, skullIndex)
            },
            skillRole, skillSecondary, skillSkulls, skullIndex,
            skills: getSkills(skillRole, skullIndex, skills?.everythingElseStrength, skills)
        }
    }

    private getHackMasterSkillInfo(): SpecificSkillInfo {
        const { skillRole: role, skillSecondary: secondary, stress, skills: mainSkills, skillEpValue: mainEpValue, skillRawEpValue: mainRawEpValue, epValueIndex: mainEpValueIndex } = this.entrySkillInfo

        const roleSelected = this.isRoleSelected()

        const skillRole = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skillRole : role
        const skillSecondary = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skillSecondary : secondary

        const epPercentIncrease = (this.specialModifier / 10) + 1

        const epValue = +((roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skillEpValue : mainEpValue) * epPercentIncrease).toFixed(0)
        const rawEpValue = (roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skillRawEpValue : mainRawEpValue)
        const epValueIndex = (roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.epValueIndex : mainEpValueIndex) + this.specialModifier

        const skills = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skills : mainSkills

        let attackInfo = this.entrySkillInfo.attackInfo[HACKMASTER]
        let defenseInfo = this.entrySkillInfo.defenseInfo[HACKMASTER]

        if (roleSelected) {
            const { attackInfo: attack, defenseInfo: defense } = this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo
            if (attack) { attackInfo += attack[HACKMASTER] }
            if (defense) { defenseInfo += defense[HACKMASTER] }
        }

        return {
            ...this.entrySkillInfo,
            type: 'HackMaster',
            attackInfo,
            defenseInfo,
            stress: {
                threshold: calculateStress(skillSecondary, epValueIndex, stress.strength),
                strength: stress.strength,
                defenseNFleeDice: getDefenseNFlee(skillRole, epValueIndex)
            },
            skillRole, skillSecondary,
            skillEpValue: epValue,
            skillRawEpValue: rawEpValue, epValueIndex,
            skills: getSkills(skillRole, epValueIndex, skills?.everythingElseStrength, skills, 'HackMaster')
        }
    }

    get combatInfo(): SpecificCombatInfo {
        const roleID: string = this.beastInfo.roleInfo.roles[this.selectRoleIndex]?.id
        const selectedRole = this.entryRoleInfo.roles[this.selectRoleIndex]

        return this.entryCombatInfo.combatInfo(this.generalInfo.size, roleID, selectedRole, this.specialModifier, this.spells)
    }

    get rawCombatInfo(): NonspecificCombatInfo {
        const roleID: string = this.beastInfo.roleInfo.roles[this.selectRoleIndex]?.id
        const selectedRole = this.entryRoleInfo.roles[this.selectRoleIndex]

        return this.entryCombatInfo.rawCombatInfoByRole(this.generalInfo.size, roleID, selectedRole, this.spells)
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

    get selectedRole(): Role | null {
        if (this.selectRoleIndex >= 0) {
            return this.roleInfo.roles[this.selectRoleIndex]
        }

        return null
    }

    get roleInfo(): GeneralRoleInfo {
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
        const selectedRoleId: string = this.roleInfo.roles[this.selectRoleIndex]?.id

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
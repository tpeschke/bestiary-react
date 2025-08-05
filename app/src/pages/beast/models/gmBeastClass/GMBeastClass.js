import { calculateRankForCharacteristic, getDifficultyDie } from '@bestiary/common/utilities/scalingAndBonus/confrontation/confrontationCalculator';
import { calculateStressAndPanic } from '@bestiary/common/utilities/scalingAndBonus/skill/stressAndPanicCalculator';
import { calculateRankForSkill } from '@bestiary/common/utilities/scalingAndBonus/skill/skillRankCalculator';
import { createSearchParams } from "react-router-dom";
import alertInfo from "../../../../components/alert/alerts";
import CastingClass from "../../pages/view/gmView/components/weirdshaping/models/CastingClass";
import CombatInfoClass from "./components/CombatInfoClass";
export default class GMBeastClass {
    entryID;
    patreon;
    canplayerview;
    entryGeneralInfo;
    entryPlayerSpecificInfo;
    entryImageInfo;
    entryLinkedInfo;
    entryRoleInfo;
    entryCombatInfo;
    entrySkillInfo;
    entrySocialInfo;
    entryLootInfo;
    castingTypeInfo;
    entrySpells;
    selectRoleIndex;
    selectedModifier;
    constructor(beastInfo, roleId, modifier) {
        const { id, patreon, canplayerview, generalInfo, playerInfo, imageInfo, linkedInfo, roleInfo, combatInfo, skillInfo, socialInfo, lootInfo, castingInfo, roleModifier, } = beastInfo;
        this.entryID = id;
        this.patreon = patreon;
        this.canplayerview = canplayerview;
        this.entryGeneralInfo = generalInfo;
        this.entryPlayerSpecificInfo = playerInfo;
        this.entryImageInfo = imageInfo;
        this.entryLinkedInfo = linkedInfo;
        this.entryRoleInfo = roleInfo;
        this.entryCombatInfo = new CombatInfoClass(combatInfo);
        this.entrySkillInfo = skillInfo;
        this.entrySocialInfo = socialInfo;
        this.entryLootInfo = lootInfo;
        this.selectedModifier = this.getSelectedModifier(roleModifier, modifier);
        this.castingTypeInfo = new CastingClass(castingInfo.casting);
        this.entrySpells = castingInfo.spells;
        this.selectRoleIndex = this.getRoleIndex(roleInfo.roles, roleInfo.defaultrole, roleId);
    }
    getSelectedModifier = (modifier = 0, modifierFromParam) => {
        if (modifierFromParam) {
            const modifierIndexDictionary = {
                'NONE': 0,
                'UNIQUE': 5,
                'GREATER': 10,
                'DREAD': 15,
                'THE': 20
            };
            return modifierIndexDictionary[modifierFromParam.toUpperCase()];
        }
        return modifier;
    };
    getRoleIndex = (roles, defaultRole, roleFromParam) => {
        if (roleFromParam) {
            return roles.findIndex(role => roleFromParam === role.id);
        }
        return roles.findIndex(role => defaultRole === role.id);
    };
    get beastInfo() {
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
        };
    }
    get id() {
        return this.entryID ?? 0;
    }
    get maxPoints() {
        const { combatPoints } = this.entryCombatInfo;
        const { skillpoints } = this.entrySkillInfo;
        const { socialpoints } = this.entrySocialInfo;
        return Math.max(combatPoints + this.selectedModifier, skillpoints + this.selectedModifier, socialpoints + this.selectedModifier);
    }
    get generalInfo() {
        const { size: mainSize } = this.entryGeneralInfo;
        const roleSelected = this.isRoleSelected();
        const size = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].generalInfo.size : mainSize;
        return {
            ...this.entryGeneralInfo,
            // a Role's size can be null, in which case, it defaults to the default size, so this is what this is doing
            size: size ?? mainSize
        };
    }
    get imageInfo() {
        return this.entryImageInfo;
    }
    get socialInfo() {
        const { conflicts, socialrole: role, socialsecondary: secondary, socialpoints: points, archetypeInfo } = this.entrySocialInfo;
        const { hasarchetypes: mainHasArchetypes, hasmonsterarchetypes: mainHasMonsterarchetypes } = archetypeInfo;
        if (conflicts) {
            const { descriptions, convictions, relationships, flaws, burdens } = conflicts;
            const roleID = this.beastInfo.roleInfo.roles[this.selectRoleIndex]?.id;
            const roleSelected = this.isRoleSelected();
            const socialrole = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.socialrole : role;
            const socialsecondary = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.socialsecondary : secondary;
            const socialpoints = (roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.socialpoints : points) + this.selectedModifier;
            const hasarchetypes = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.hasarchetypes : mainHasArchetypes;
            const hasmonsterarchetypes = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].socialInfo.hasmonsterarchetypes : mainHasMonsterarchetypes;
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
                    flaws: flaws.filter((info) => !info.socialroleid || info.socialroleid === roleID || info.allroles),
                    burdens: burdens.filter((info) => !info.socialroleid || info.socialroleid === roleID || info.allroles)
                }
            };
        }
        return this.socialInfo;
    }
    adjustCharacteristicRank = (type, points, roleID) => {
        return (characteristics, characteristic) => {
            if (!characteristic.socialroleid || characteristic.socialroleid === roleID || characteristic.allroles) {
                characteristics.push({
                    ...characteristic,
                    rank: calculateRankForCharacteristic(type, points, characteristic.strength, characteristic.adjustment)
                });
            }
            return characteristics;
        };
    };
    get skillInfo() {
        const { skills, skillrole: role, skillsecondary: secondary, skillpoints: points, stressStrength: mainStressStrength, panicStrength: mainPanicStrength } = this.entrySkillInfo;
        const roleID = this.beastInfo.roleInfo.roles[this.selectRoleIndex]?.id;
        const roleSelected = this.isRoleSelected();
        const skillrole = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skillrole : role;
        const skillsecondary = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skillsecondary : secondary;
        const skillpoints = (roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.skillpoints : points) + this.selectedModifier;
        const stressStrength = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.stressStrength : mainStressStrength;
        const panicStrength = roleSelected ? this.entryRoleInfo.roles[this.selectRoleIndex].skillInfo.panicStrength : mainPanicStrength;
        return {
            ...this.entrySkillInfo,
            ...calculateStressAndPanic(skillrole, skillsecondary, skillpoints, stressStrength, panicStrength),
            skillrole, skillsecondary, skillpoints,
            skills: skills?.reduce(this.adjustSkillRank(skillpoints, roleID), [])
        };
    }
    adjustSkillRank = (points, roleID) => {
        return (skills, skill) => {
            if (!skill.skillroleid || skill.skillroleid === roleID || skill.allroles) {
                skills.push({
                    ...skill,
                    rank: calculateRankForSkill(points, skill.strength, skill.adjustment)
                });
            }
            return skills;
        };
    };
    get combatInfo() {
        const roleID = this.beastInfo.roleInfo.roles[this.selectRoleIndex]?.id;
        const selectedRole = this.entryRoleInfo.roles[this.selectRoleIndex];
        return this.entryCombatInfo.combatInfo(this.generalInfo.size, roleID, selectedRole, this.selectedModifier);
    }
    get linkedInfo() {
        return this.entryLinkedInfo;
    }
    get lootInfo() {
        return this.entryLootInfo;
    }
    get castingInfo() {
        return this.castingTypeInfo;
    }
    get spells() {
        return this.entrySpells.reduce(this.filterSpells(this.selectedRoleID), []);
    }
    filterSpells(roleID) {
        return (spells, spell) => {
            if (spell.allroles || spell.roleid === roleID) {
                spells.push(spell);
            }
            return spells;
        };
    }
    get roleInfo() {
        return this.entryRoleInfo;
    }
    isRoleSelected = () => {
        return this.selectRoleIndex >= 0;
    };
    get selectedRoleID() {
        if (this.selectRoleIndex >= 0) {
            return this.roleInfo.roles[this.selectRoleIndex].id;
        }
        return null;
    }
    get selectedRoleIndex() {
        return this.selectRoleIndex;
    }
    set selectedRoleIndex(newIndex) {
        this.selectedRoleIndex = newIndex;
    }
    get roleName() {
        if (this.selectRoleIndex >= 0) {
            return this.roleInfo.roles[this.selectRoleIndex].generalInfo.name;
        }
        return null;
    }
    get combatRoleType() {
        if (this.selectRoleIndex >= 0) {
            return this.roleInfo.roles[this.selectRoleIndex].combatInfo.combatrole;
        }
        return this.combatInfo.combatrole;
    }
    get modifierIndex() {
        return this.selectedModifier / 5;
    }
    copyQuickLink = () => {
        let textArea = this.getTextArea();
        const url = this.getURL();
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            alertInfo({ color: "green", message: `${url} successfully copied`, type: 'message' });
        }
        catch (err) {
            alertInfo({ color: "red", message: `Unable to copy ${url}`, type: 'message' });
        }
        document.body.removeChild(textArea);
    };
    getTextArea = () => {
        let textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        return textArea;
    };
    getURL = () => {
        const { origin, pathname } = window.location;
        return `${origin}${pathname}?${createSearchParams(this.getQuickLinkParams()).toString()}`;
    };
    getQuickLinkParams = () => {
        const selectedRoleId = this.roleInfo.roles[this.selectRoleIndex].id;
        if (selectedRoleId && this.selectedModifier) {
            return {
                roleId: selectedRoleId,
                modifier: `${this.selectedModifier}`
            };
        }
        else if (selectedRoleId) {
            return {
                roleId: selectedRoleId,
            };
        }
        else if (this.selectedModifier) {
            return {
                modifier: `${this.selectedModifier}`
            };
        }
        return {};
    };
    get hasModifier() {
        return !!this.modifierIndex;
    }
    get notes() {
        return this.entryPlayerSpecificInfo.notes;
    }
    get favorite() {
        return this.entryPlayerSpecificInfo.favorite;
    }
    get playerInfo() {
        return this.entryPlayerSpecificInfo;
    }
}

import { calculateAttackInfo, calculateDefenseInfo } from "@bestiary/common/utilities/scalingAndBonus/combat/combatCalculation";
import calculateMovement from "@bestiary/common/utilities/scalingAndBonus/combat/movement";
import { calculateVitalityFatigueAndTrauma } from "@bestiary/common/utilities/scalingAndBonus/combat/vitalityFatigueAndTraumaCalculator";
export default class CombatInfoClass {
    entryCombatInfo;
    constructor(combatInfo) {
        this.entryCombatInfo = combatInfo;
    }
    get rawCombatInfo() {
        return this.entryCombatInfo;
    }
    get combatPoints() {
        return this.entryCombatInfo.combatpoints;
    }
    combatInfo(size, roleID, selectedRole, selectedModifier) {
        return this.formatCombatInfo(size, roleID, selectedRole, selectedModifier);
    }
    formatCombatInfo = (size, roleID, selectedRole, selectedModifier) => {
        const { attacks, defenses, movements, combatrole: role, combatsecondary: secondary, combatpoints: points, vitalityInfo: mainVitalityInfo } = this.entryCombatInfo;
        const combatrole = selectedRole ? selectedRole.combatInfo.combatrole : role;
        const combatsecondary = selectedRole ? selectedRole.combatInfo.combatsecondary : secondary;
        const combatpoints = (selectedRole ? selectedRole.combatInfo.combatpoints : points) + selectedModifier;
        const vitalityInfo = selectedRole ? this.populateVitalityInfo(mainVitalityInfo, selectedRole.combatInfo.vitalityInfo) : mainVitalityInfo;
        let { sp_atk, sp_def } = this.entryCombatInfo;
        if (selectedRole) {
            const { attack, defense } = selectedRole.combatInfo;
            if (attack) {
                sp_atk += attack;
            }
            if (defense) {
                sp_def += defense;
            }
        }
        return {
            ...this.entryCombatInfo,
            combatrole, combatsecondary, combatpoints,
            sp_atk, sp_def,
            vitalityInfo: {
                ...vitalityInfo,
                ...calculateVitalityFatigueAndTrauma(combatrole, combatsecondary, combatpoints, vitalityInfo.vitalityStrength, vitalityInfo.fatigueStrength),
                locationalVitalities: vitalityInfo.locationalVitalities.filter((info) => !info.roleid || info.roleid === roleID || info.allroles)
            },
            attacks: attacks.reduce(this.adjustAttackInfo(combatpoints, roleID, combatrole), []),
            defenses: defenses.reduce(this.adjustDefenseInfo(combatpoints, roleID, combatrole, size), []),
            movements: movements.reduce(this.adjustMovementInfo(combatpoints, roleID, combatrole), [])
        };
    };
    adjustAttackInfo = (points, roleID, role) => {
        return (attackInfo, attack) => {
            if (!roleID || attack.roleid === roleID) {
                if (attack.infoType === 'weapon') {
                    attackInfo.push({
                        ...attack,
                        ...calculateAttackInfo({ ...attack.scalingInfo, weaponInfo: attack.weaponInfo }, points, role),
                        weaponName: attack.weaponName
                    });
                }
                else if (attack.infoType === 'reference') {
                    attackInfo.push({ ...attack });
                }
            }
            return attackInfo;
        };
    };
    adjustDefenseInfo = (points, roleID, role, size) => {
        return (defenseInfo, defense) => {
            if (!roleID || defense.roleid === roleID) {
                defenseInfo.push({
                    ...defense,
                    ...calculateDefenseInfo(defense.scalingInfo, points, role, defense.scalingInfo.addsizemod, size),
                    scalingInfo: defense.scalingInfo
                });
            }
            return defenseInfo;
        };
    };
    adjustMovementInfo = (points, roleID, role) => {
        return (movementInfo, movement) => {
            if (!movement?.roleid || movement?.roleid === roleID || movement?.allroles) {
                const calculatedMovement = calculateMovement(movement, points, role);
                if (calculatedMovement) {
                    movementInfo.push(calculatedMovement);
                }
            }
            return movementInfo;
        };
    };
    getDefault = (roleInfo, defaultInfo) => {
        return roleInfo ?? defaultInfo;
    };
    populateVitalityInfo = (mainVitalityInfo, roleVitalityInfo) => {
        return {
            locationalVitalities: mainVitalityInfo.locationalVitalities,
            fatigue: this.getDefault(roleVitalityInfo.fatigue, mainVitalityInfo.fatigue),
            notrauma: this.getDefault(roleVitalityInfo.notrauma, mainVitalityInfo.notrauma),
            knockback: this.getDefault(roleVitalityInfo.knockback, mainVitalityInfo.knockback),
            singledievitality: this.getDefault(roleVitalityInfo.singledievitality, mainVitalityInfo.singledievitality),
            noknockback: this.getDefault(roleVitalityInfo.noknockback, mainVitalityInfo.noknockback),
            rollundertrauma: this.getDefault(roleVitalityInfo.rollundertrauma, mainVitalityInfo.rollundertrauma),
            isincorporeal: this.getDefault(roleVitalityInfo.isincorporeal, mainVitalityInfo.isincorporeal),
            weaponbreakagevitality: this.getDefault(roleVitalityInfo.weaponbreakagevitality, mainVitalityInfo.weaponbreakagevitality),
            vitality: this.getDefault(roleVitalityInfo.vitality, mainVitalityInfo.vitality),
            trauma: this.getDefault(roleVitalityInfo.trauma, mainVitalityInfo.trauma),
            vitalityStrength: this.getDefault(roleVitalityInfo.vitalityStrength, mainVitalityInfo.vitalityStrength),
            fatigueStrength: this.getDefault(roleVitalityInfo.fatigueStrength, roleVitalityInfo.fatigueStrength)
        };
    };
}

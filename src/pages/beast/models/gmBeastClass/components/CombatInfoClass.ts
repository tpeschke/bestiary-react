import { LocationVitality, AttackInfo, DefenseInfo, Movement, VitalityInfo } from "../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import { Size } from "../../../../../../common/interfaces/beast/infoInterfaces/generalInfoInterfaces";
import { Role } from "../../../../../../common/interfaces/beast/infoInterfaces/roleInfoInterfaces";
import { Strength } from "../../../../../../common/interfaces/calculationInterfaces";
import { calculateAttackInfo, calculateDefenseInfo } from "../../../../../../common/utilities/scalingAndBonus/combat/combatCalculation";
import calculateMovement from "../../../../../../common/utilities/scalingAndBonus/combat/movement";
import { calculateVitalityFatigueAndTrauma } from "../../../../../../common/utilities/scalingAndBonus/combat/vitalityFatigueAndTraumaCalculator";
import CombatInfo from "../../../interfaces/infoInterfaces/combatInfoInterfaces";

export default class CombatInfoClass {
    private entryCombatInfo: CombatInfo

    constructor(combatInfo: CombatInfo) {
        this.entryCombatInfo = combatInfo
    }

    get rawCombatInfo(): CombatInfo {
        return this.entryCombatInfo
    }

    get combatPoints(): number {
        return this.entryCombatInfo.combatpoints
    }

    public combatInfo(size: Size, roleID: string | null, selectedRole: Role | null, selectedModifier: number): CombatInfo {
        return this.formatCombatInfo(size, roleID, selectedRole, selectedModifier)
    }

    private formatCombatInfo = (size: Size, roleID: string | null, selectedRole: Role | null, selectedModifier: number): CombatInfo => {
        const { attacks, defenses, movements, combatrole: role, combatsecondary: secondary, combatpoints: points, vitalityInfo: mainVitalityInfo } = this.entryCombatInfo
        
        const combatrole = selectedRole ? selectedRole.combatInfo.combatrole : role
        const combatsecondary = selectedRole ? selectedRole.combatInfo.combatsecondary : secondary
        const combatpoints = (selectedRole ? selectedRole.combatInfo.combatpoints : points) + selectedModifier
        
        const vitalityInfo = selectedRole ? this.populateVitalityInfo(mainVitalityInfo, selectedRole.combatInfo.vitalityInfo) : mainVitalityInfo
        
        let { sp_atk, sp_def} = this.entryCombatInfo
        if (selectedRole) {
            const { attack, defense } = selectedRole.combatInfo
            if (attack) {  sp_atk += attack }
            if (defense) { sp_def += defense }
        }

        return {
            ...this.entryCombatInfo,
            combatrole, combatsecondary, combatpoints,
            sp_atk, sp_def,
            vitalityInfo: {
                ...vitalityInfo,
                ...calculateVitalityFatigueAndTrauma(combatrole, combatsecondary, combatpoints, vitalityInfo.vitalityStrength, vitalityInfo.fatigueStrength),
                locationalVitalities: vitalityInfo.locationalVitalities.filter((info: LocationVitality) => !info.roleid || info.roleid === roleID || info.allroles)
            },
            attacks: attacks.reduce(this.adjustAttackInfo(combatpoints, roleID, combatrole), []),
            defenses: defenses.reduce(this.adjustDefenseInfo(combatpoints, roleID, combatrole, size), []),
            movements: movements.reduce(this.adjustMovementInfo(combatpoints, roleID, combatrole), [])
        }
    }

    private adjustAttackInfo = (points: number, roleID: string | null, role: string) => {
        return (attackInfo: AttackInfo[], attack: AttackInfo): AttackInfo[] => {
            if (!roleID || attack.roleid === roleID) {
                if (attack.infoType === 'weapon') {
                    attackInfo.push({
                        ...attack,
                        ...calculateAttackInfo({ ...attack.scalingInfo, weaponInfo: attack.weaponInfo }, points, role),
                        weaponName: attack.weaponName
                    })
                } else if (attack.infoType === 'reference') {
                    attackInfo.push({...attack})
                }
            }
            return attackInfo
        }
    }

    private adjustDefenseInfo = (points: number, roleID: string | null, role: string, size: Size) => {
        return (defenseInfo: DefenseInfo[], defense: DefenseInfo): DefenseInfo[] => {
            if (!roleID || defense.roleid === roleID) {
                defenseInfo.push({
                    ...defense,
                    ...calculateDefenseInfo(defense.scalingInfo, points, role, defense.scalingInfo.addsizemod, size),
                    scalingInfo: defense.scalingInfo
                })
            }
            return defenseInfo
        }
    }

    private adjustMovementInfo = (points: number, roleID: string | null, role: string) => {
        return (movementInfo: Movement[], movement: Movement): Movement[] => {
            if (!movement?.roleid || movement?.roleid === roleID || movement?.allroles) {
                const calculatedMovement = calculateMovement(movement, points, role)
                if (calculatedMovement) { movementInfo.push(calculatedMovement) }
            }
            return movementInfo
        }
    }

    private getDefault = <Type>(roleInfo: Type, defaultInfo: Type): Type => {
        return roleInfo ?? defaultInfo
    }

    private populateVitalityInfo = (mainVitalityInfo: VitalityInfo, roleVitalityInfo: VitalityInfo): VitalityInfo => {
        return {
            locationalVitalities: mainVitalityInfo.locationalVitalities,
            fatigue: this.getDefault<string | number | boolean>(roleVitalityInfo.fatigue, mainVitalityInfo.fatigue),
            notrauma: this.getDefault<boolean>(roleVitalityInfo.notrauma, mainVitalityInfo.notrauma),
            knockback: this.getDefault<number>(roleVitalityInfo.knockback, mainVitalityInfo.knockback),
            singledievitality: this.getDefault<boolean>(roleVitalityInfo.singledievitality, mainVitalityInfo.singledievitality),
            noknockback: this.getDefault<boolean>(roleVitalityInfo.noknockback, mainVitalityInfo.noknockback),
            rollundertrauma: this.getDefault<number>(roleVitalityInfo.rollundertrauma, mainVitalityInfo.rollundertrauma),
            isincorporeal: this.getDefault<boolean>(roleVitalityInfo.isincorporeal, mainVitalityInfo.isincorporeal),
            weaponbreakagevitality: this.getDefault<boolean>(roleVitalityInfo.weaponbreakagevitality, mainVitalityInfo.weaponbreakagevitality),
            vitality: this.getDefault<string | number>(roleVitalityInfo.vitality, mainVitalityInfo.vitality),
            trauma: this.getDefault<number | boolean>(roleVitalityInfo.trauma, mainVitalityInfo.trauma),
            vitalityStrength: this.getDefault<Strength>(roleVitalityInfo.vitalityStrength, mainVitalityInfo.vitalityStrength),
            fatigueStrength: this.getDefault<Strength>(roleVitalityInfo.fatigueStrength, roleVitalityInfo.fatigueStrength)
        }
    }
}
import CombatInfo, { LocationVitality, AttackInfo, DefenseInfo, Movement, VitalityInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces";
import { Role } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces";
import { calculateAttackInfo, calculateDefenseInfo } from "@bestiary/common/utilities/scalingAndBonus/combat/combatCalculation";
import calculateMovement from "@bestiary/common/utilities/scalingAndBonus/combat/movement";
import calculateVitalityAndTrauma from "@bestiary/common/utilities/scalingAndBonus/combat/vitalityAndTraumaCalculator"

export default class CombatInfoClass {
    private entryCombatInfo: CombatInfo

    constructor(combatInfo: CombatInfo) {
        this.entryCombatInfo = combatInfo
    }

    get rawCombatInfo(): CombatInfo {
        return this.entryCombatInfo
    }

    get combatSkulls(): number {
        return this.entryCombatInfo.combatSkulls
    }

    public combatInfo(size: Size, roleID: string | null, selectedRole: Role | null, selectedModifier: number): CombatInfo {
        return this.formatCombatInfo(size, roleID, selectedRole, selectedModifier)
    }

    private formatCombatInfo = (size: Size, roleID: string | null, selectedRole: Role | null, selectedModifier: number): CombatInfo => {
        const { attacks, defenses, movements, combatRole: role, combatSecondary: secondary, combatSkulls, skullIndex: combatSkullIndex, vitalityInfo: mainVitalityInfo } = this.entryCombatInfo

        const combatRole = selectedRole ? selectedRole.combatInfo.combatRole : role
        const combatSecondary = selectedRole ? selectedRole.combatInfo.combatSecondary : secondary

        const skulls = (selectedRole ? selectedRole.combatInfo.combatSkulls : combatSkulls) + selectedModifier
        const skullIndex = (selectedRole ? selectedRole.combatInfo.skullIndex : combatSkullIndex) + selectedModifier

        const vitalityInfo = selectedRole ? this.populateVitalityInfo(mainVitalityInfo, selectedRole.combatInfo.vitalityInfo) : mainVitalityInfo

        let { attackInfo, defenseInfo } = this.entryCombatInfo
        if (selectedRole) {
            const { attack, defense } = selectedRole.combatInfo
            if (attack) { attackInfo += attack }
            if (defense) { defenseInfo += defense }
        }

        return {
            ...this.entryCombatInfo,
            combatRole, combatSecondary,
            combatSkulls: skulls,
            skullIndex,
            attackInfo, defenseInfo,
            vitalityInfo: {
                ...vitalityInfo,
                ...calculateVitalityAndTrauma(combatRole, combatSecondary, skulls),
                locationalVitalities: vitalityInfo.locationalVitalities.filter((info: LocationVitality) => !info.roleid || info.roleid === roleID || info.allroles)
            },
            attacks: attacks.reduce(this.adjustAttackInfo(skulls, roleID, combatRole), []),
            defenses: defenses.reduce(this.adjustDefenseInfo(skulls, roleID, combatRole, size), []),
            movements: movements.reduce(this.adjustMovementInfo(skulls, roleID, combatRole), [])
        }
    }

    private adjustAttackInfo = (skulls: number, roleID: string | null, role: string) => {
        return (attackInfo: AttackInfo[], attack: AttackInfo): AttackInfo[] => {
            if (!roleID || attack.roleid === roleID) {
                if (attack.infoType === 'weapon') {
                    attackInfo.push({
                        ...attack,
                        ...calculateAttackInfo({ ...attack.scalingInfo, weaponInfo: attack.weaponInfo }, skulls, role),
                        weaponName: attack.weaponName
                    })
                } else if (attack.infoType === 'reference') {
                    attackInfo.push({ ...attack })
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
            if (!movement?.roleId || movement?.roleId === roleID || movement?.allRoles) {
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
            noTrauma: this.getDefault<boolean>(roleVitalityInfo.noTrauma, mainVitalityInfo.noTrauma),
            knockback: this.getDefault<number>(roleVitalityInfo.knockback, mainVitalityInfo.knockback),
            singleDieVitality: this.getDefault<boolean>(roleVitalityInfo.singleDieVitality, mainVitalityInfo.singleDieVitality),
            noKnockback: this.getDefault<boolean>(roleVitalityInfo.noKnockback, mainVitalityInfo.noKnockback),
            rollUnderTrauma: this.getDefault<number>(roleVitalityInfo.rollUnderTrauma, mainVitalityInfo.rollUnderTrauma),
            isIncorporeal: this.getDefault<boolean>(roleVitalityInfo.isIncorporeal, mainVitalityInfo.isIncorporeal),
            weaponBreakageVitality: this.getDefault<boolean>(roleVitalityInfo.weaponBreakageVitality, mainVitalityInfo.weaponBreakageVitality),
            vitality: this.getDefault<string | number>(roleVitalityInfo.vitality, mainVitalityInfo.vitality),
            trauma: this.getDefault<number | boolean>(roleVitalityInfo.trauma, mainVitalityInfo.trauma)
        }
    }
}
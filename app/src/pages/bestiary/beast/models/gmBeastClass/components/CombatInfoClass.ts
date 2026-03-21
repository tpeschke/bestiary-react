import { SystemOption } from "@bestiary/common/interfaces/beast/beast";
import { Spell } from "@bestiary/common/interfaces/beast/infoInterfaces/castingInfo";
import CombatInfo, { LocationVitality, AttackInfo, Movement, BonfireCombatInfo, HackMasterCombatInfo, VitalityInfo, BonfireDefenseInfo, HackMasterDefenseInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces";
import { BonfireRole, HackMasterRole, Role } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces";
import { calculateAttackInfo, calculateBonfireDefenseInfo, calculateHackMasterDefenseInfo } from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/combatCalculation";
import calculateMovement from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/movement";
import calculateVitalityAndTrauma from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/vitalityAndTraumaCalculator"
import calculateRollUnderTrauma from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/calculateRollUnderTrauma"
import getBonfireDefenseNFlee, { getHackMasterDefenseNFlee } from "@bestiary/common/utilities/scalingAndBonus/bonfire/getDefenseNFlee";
import getInitiative from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/getInitiative"

export default class CombatInfoClass {
    private entryCombatInfo: CombatInfo
    public selectedSystem: SystemOption

    constructor(combatInfo: CombatInfo, system: SystemOption) {
        this.entryCombatInfo = combatInfo
        this.selectedSystem = system
    }

    get rawCombatInfo(): CombatInfo {
        return this.entryCombatInfo
    }

    get combatSkulls(): number {
        if (this.entryCombatInfo.type === 'Bonfire') {
            return this.entryCombatInfo.combatSkulls
        } else {
            return 0
        }
    }

    public combatInfo(size: Size, roleID: string | null, selectedRole: Role | null, selectedModifier: number, spells: Spell[]): CombatInfo {
        if (this.selectedSystem === 'Bonfire') {
            return this.getBonfireCombatInfo(size, roleID, selectedRole as BonfireRole, selectedModifier, spells)
        } else {
            return this.getHackMasterCombatInfo(size, roleID, selectedRole as HackMasterRole, selectedModifier, spells)
        }
    }

    private getBonfireCombatInfo(size: Size, roleID: string | null, selectedRole: BonfireRole | null, selectedModifier: number, spells: Spell[]): BonfireCombatInfo {
        const { attacks, defenses, movements, combatRole: role, combatSecondary: secondary, combatSkulls, skullIndex: combatSkullIndex, vitalityInfo: mainVitalityInfo } = this.entryCombatInfo as BonfireCombatInfo

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
            type: 'Bonfire',
            combatRole, combatSecondary,
            combatSkulls: skulls,
            skullIndex,
            attackInfo, defenseInfo,
            initiative: getInitiative(combatRole, skullIndex, 'Bonfire'),
            vitalityInfo: {
                ...vitalityInfo,
                rollUnderTrauma: calculateRollUnderTrauma(skullIndex, 'Bonfire'),
                ...calculateVitalityAndTrauma(combatRole, combatSecondary, skullIndex, vitalityInfo.weaponBreakageVitality, vitalityInfo.singleDieVitality, size, 'Bonfire'),
                locationalVitalities: vitalityInfo.locationalVitalities.filter((info: LocationVitality) => !info.roleid || info.roleid === roleID || info.allroles),
                defenseNFleeDice: getBonfireDefenseNFlee(combatRole, skullIndex)
            },
            attacks: attacks.reduce(this.adjustAttackInfo(skullIndex, roleID, combatRole, size, spells), []),
            defenses: defenses.reduce(this.adjustBonfireDefenseInfo(skullIndex, roleID, combatRole, size), []),
            movements: movements.reduce(this.adjustMovementInfo(skullIndex, roleID, combatRole), [])
        }
    }

    private getHackMasterCombatInfo(size: Size, roleID: string | null, selectedRole: HackMasterRole | null, selectedModifier: number, spells: Spell[]): HackMasterCombatInfo {
        const { attacks, defenses, movements, combatRole: role, combatSecondary: secondary, epValue: mainEpValue, epValueIndex: mainEpValueIndex, vitalityInfo: mainVitalityInfo } = this.entryCombatInfo as HackMasterCombatInfo

        const combatRole = selectedRole ? selectedRole.combatInfo.combatRole : role
        const combatSecondary = selectedRole ? selectedRole.combatInfo.combatSecondary : secondary

        const epValue = (selectedRole ? selectedRole.combatInfo.combatEpValue : mainEpValue) + selectedModifier
        const epValueIndex = (selectedRole ? selectedRole.combatInfo.combatEpValueIndex : mainEpValueIndex) + selectedModifier

        const vitalityInfo = selectedRole ? this.populateVitalityInfo(mainVitalityInfo, selectedRole.combatInfo.vitalityInfo) : mainVitalityInfo

        let { attackInfo, defenseInfo } = this.entryCombatInfo
        if (selectedRole) {
            const { attack, defense } = selectedRole.combatInfo
            if (attack) { attackInfo += attack }
            if (defense) { defenseInfo += defense }
        }

        return {
            ...this.entryCombatInfo,
            type: 'HackMaster',
            combatRole, combatSecondary,
            epValue,
            epValueIndex,
            attackInfo, defenseInfo,
            initiative: getInitiative(combatRole, epValueIndex, 'HackMaster'),
            vitalityInfo: {
                ...vitalityInfo,
                rollUnderTrauma: calculateRollUnderTrauma(epValueIndex, 'HackMaster'),
                ...calculateVitalityAndTrauma(combatRole, combatSecondary, epValueIndex, vitalityInfo.weaponBreakageVitality, vitalityInfo.singleDieVitality, size, 'HackMaster'),
                locationalVitalities: vitalityInfo.locationalVitalities.filter((info: LocationVitality) => !info.roleid || info.roleid === roleID || info.allroles),
                defenseNFleeDice: getHackMasterDefenseNFlee(combatRole, epValueIndex)
            },
            attacks: attacks.reduce(this.adjustAttackInfo(epValueIndex, roleID, combatRole, size, spells), []),
            defenses: defenses.reduce(this.adjustHackMasterDefenseInfo(epValueIndex, roleID, combatRole, size), []),
            movements: movements.reduce(this.adjustMovementInfo(epValueIndex, roleID, combatRole), [])
        }
    }

    private adjustAttackInfo = (skulls: number, roleID: string | null, role: string, size: Size, spells: Spell[]) => {
        return (attackInfo: AttackInfo[], attack: AttackInfo): AttackInfo[] => {
            if (!roleID || attack.roleid === roleID) {
                if (attack.infoType === 'weapon') {
                    attackInfo.push({
                        ...attack,
                        ...calculateAttackInfo(attack, skulls, role, attack.scalingInfo.addsizemod, size, null),
                        weaponName: attack.weapon?.split(' (')[0]
                    })
                } else if (attack.infoType === 'spell') {
                    attackInfo.push({
                        ...attack,
                        spellInfo: spells.filter(spell => attack.spellid === spell.id)[0]
                    })
                } else {
                    attackInfo.push({ ...attack })
                }
            }
            return attackInfo
        }
    }

    private adjustBonfireDefenseInfo = (points: number, roleID: string | null, role: string, size: Size) => {
        return (defenseInfo: BonfireDefenseInfo[], defense: BonfireDefenseInfo): BonfireDefenseInfo[] => {
            if (!roleID || defense.roleid === roleID) {
                defenseInfo.push({
                    ...defense,
                    ...calculateBonfireDefenseInfo(defense.scalingInfo, points, role, defense.scalingInfo.addsizemod, size),
                    system: 'Bonfire',
                    scalingInfo: defense.scalingInfo
                })
            }
            return defenseInfo
        }
    }

    private adjustHackMasterDefenseInfo = (points: number, roleID: string | null, role: string, size: Size) => {
        return (defenseInfo: HackMasterDefenseInfo[], defense: HackMasterDefenseInfo): HackMasterDefenseInfo[] => {
            if (!roleID || defense.roleid === roleID) {
                defenseInfo.push({
                    ...defense,
                    ...calculateHackMasterDefenseInfo(defense.scalingInfo, points, role, defense.scalingInfo.addsizemod, size),
                    system: 'HackMaster',
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
            trauma: this.getDefault<number | boolean>(roleVitalityInfo.trauma, mainVitalityInfo.trauma),
        }
    }
}
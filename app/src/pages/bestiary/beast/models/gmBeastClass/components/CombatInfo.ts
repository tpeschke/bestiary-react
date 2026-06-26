import { SystemOption } from "@bestiary/common/interfaces/beast/beast";
import { Spell } from "@bestiary/common/interfaces/beast/infoInterfaces/castingInfo";
import { LocationVitality, AttackStats, Movement, BonfireCombatInfo, HackMasterCombatInfo, VitalityInfo, BonfireDefenseInfo, HackMasterDefenseInfo, NonspecificCombatInfo, SpecificCombatInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import { Size, SystemInfoArray } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces";
import { calculateBonfireAttackInfo, calculateBonfireDefenseInfo, calculateHackMasterAttackInfo, calculateHackMasterDefenseInfo } from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/combatCalculation";
import calculateMovement from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/movement";
import calculateVitalityAndTrauma from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/vitalityAndTraumaCalculator"
import calculateRollUnderTrauma from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/calculateRollUnderTrauma"
import getBonfireDefenseNFlee, { getHackMasterDefenseNFlee } from "@bestiary/common/utilities/scalingAndBonus/bonfire/getDefenseNFlee";
import getInitiative from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/getInitiative"
import { BONFIRE, HACKMASTER } from "@bestiary/common/utilities/get/getSystemString";
import { Role } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/roleInfoInterfaces";

export interface CombatInfoObject {
    entryCombatInfo: NonspecificCombatInfo
    selectedSystem: SystemOption
}

export function createCombatInfoObject(combatInfo: NonspecificCombatInfo, system: SystemOption): CombatInfoObject {
    return {
        entryCombatInfo: combatInfo,
        selectedSystem: system
    }
}

export function getRawCombatInfo(combatInfoObject: CombatInfoObject): NonspecificCombatInfo {
    return combatInfoObject.entryCombatInfo
}

export function getRawCombatInfoByRole(combatInfoObject: CombatInfoObject, size: Size, roleID: string | null, selectedRole: Role | null, spells: Spell[]): NonspecificCombatInfo {
    const { attacks, defenses, movements, combatRole: role, combatSecondary: secondary, combatSkulls, skullIndex: combatSkullIndex, vitalityInfo: mainVitalityInfo } = combatInfoObject.entryCombatInfo

    const combatRole = selectedRole ? selectedRole.combatInfo.combatRole : role
    const combatSecondary = selectedRole ? selectedRole.combatInfo.combatSecondary : secondary

    const skulls = (selectedRole ? selectedRole.combatInfo.combatSkulls : combatSkulls)
    const skullIndex = (selectedRole ? selectedRole.combatInfo.skullIndex : combatSkullIndex)

    const vitalityInfo = selectedRole ? populateVitalityInfo(mainVitalityInfo, selectedRole.combatInfo.vitalityInfo) : mainVitalityInfo

    let roleDefenseInfo: SystemInfoArray | undefined;
    let roleAttackInfo: SystemInfoArray | undefined;

    if (selectedRole) {
        const { defenseInfo: roleDefense, attackInfo: roleAttack } = selectedRole.combatInfo
        if (roleAttack) { roleAttackInfo = roleAttack }
        if (roleDefense) { roleDefenseInfo = roleDefense }
    }

    return {
        ...combatInfoObject.entryCombatInfo,
        combatRole, combatSecondary,
        combatSkulls: skulls,
        attackInfo: combatInfoObject.entryCombatInfo.attackInfo,
        roleAttackInfo,
        defenseInfo: combatInfoObject.entryCombatInfo.defenseInfo,
        roleDefenseInfo,
        skullIndex,
        initiative: getInitiative(combatRole, skullIndex, 'Bonfire'),
        vitalityInfo: {
            ...vitalityInfo,
            rollUnderTrauma: calculateRollUnderTrauma(skullIndex, 'Bonfire'),
            ...calculateVitalityAndTrauma(combatRole, combatSecondary, skullIndex, vitalityInfo.weaponBreakageVitality, vitalityInfo.singleDieVitality, size, vitalityInfo.hasNoVitality, 'Bonfire'),
            locationalVitalities: vitalityInfo.locationalVitalities.filter((info: LocationVitality) => !info.roleid || info.roleid === roleID || info.allroles),
            defenseNFleeDice: getBonfireDefenseNFlee(combatRole, skullIndex)
        },
        attacks: attacks.reduce(adjustAttackInfo(skullIndex, roleID, combatRole, size, spells, 'Bonfire'), []),
        defenses: (defenses as BonfireDefenseInfo[]).reduce(adjustBonfireDefenseInfo(skullIndex, roleID, combatRole, size), [] as BonfireDefenseInfo[]),
        movements: movements.reduce(adjustMovementInfo(skullIndex, roleID, combatRole), [])
    }
}

export function getCombatSkulls(combatInfoObject: CombatInfoObject): number {
    if (combatInfoObject.entryCombatInfo.type === 'Bonfire') {
        return combatInfoObject.entryCombatInfo.combatSkulls
    } else {
        return 0
    }
}

export function getSpecificCombatInfo(combatInfoObject: CombatInfoObject, size: Size, roleID: string | null, selectedRole: Role | null, specialModifier: number, spells: Spell[]): SpecificCombatInfo {
    if (combatInfoObject.selectedSystem === 'Bonfire') {
        return getBonfireCombatInfo(combatInfoObject, size, roleID, selectedRole, specialModifier, spells)
    } else {
        return getHackMasterCombatInfo(combatInfoObject, size, roleID, selectedRole, specialModifier, spells)
    }
}

function getBonfireCombatInfo(combatInfoObject: CombatInfoObject, size: Size, roleID: string | null, selectedRole: Role | null, selectedModifier: number, spells: Spell[]): BonfireCombatInfo {
    const { attacks, defenses, movements, combatRole: role, combatSecondary: secondary, combatSkulls, skullIndex: combatSkullIndex, vitalityInfo: mainVitalityInfo } = combatInfoObject.entryCombatInfo

    const combatRole = selectedRole ? selectedRole.combatInfo.combatRole : role
    const combatSecondary = selectedRole ? selectedRole.combatInfo.combatSecondary : secondary

    const skulls = (selectedRole ? selectedRole.combatInfo.combatSkulls : combatSkulls) + selectedModifier
    const skullIndex = (selectedRole ? selectedRole.combatInfo.skullIndex : combatSkullIndex) + selectedModifier

    const vitalityInfo = selectedRole ? populateVitalityInfo(mainVitalityInfo, selectedRole.combatInfo.vitalityInfo) : mainVitalityInfo

    let attackInfo = combatInfoObject.entryCombatInfo.attackInfo[BONFIRE]
    let defenseInfo = combatInfoObject.entryCombatInfo.defenseInfo[BONFIRE]

    if (selectedRole) {
        const { attackInfo: roleAttack, defenseInfo: roleDefense } = selectedRole.combatInfo
        if (roleAttack[BONFIRE]) { attackInfo += roleAttack[BONFIRE] }
        if (roleDefense[BONFIRE]) { defenseInfo += roleDefense[BONFIRE] }
    }

    return {
        ...combatInfoObject.entryCombatInfo,
        type: 'Bonfire',
        combatRole, combatSecondary,
        combatSkulls: skulls,
        skullIndex,
        attackInfo,
        defenseInfo,
        initiative: getInitiative(combatRole, skullIndex, 'Bonfire'),
        vitalityInfo: {
            ...vitalityInfo,
            rollUnderTrauma: calculateRollUnderTrauma(skullIndex, 'Bonfire'),
            ...calculateVitalityAndTrauma(combatRole, combatSecondary, skullIndex, vitalityInfo.weaponBreakageVitality, vitalityInfo.singleDieVitality, size, vitalityInfo.hasNoVitality, 'Bonfire'),
            locationalVitalities: vitalityInfo.locationalVitalities.filter((info: LocationVitality) => !info.roleid || info.roleid === roleID || info.allroles),
            defenseNFleeDice: getBonfireDefenseNFlee(combatRole, skullIndex)
        },
        attacks: attacks.reduce(adjustAttackInfo(skullIndex, roleID, combatRole, size, spells, 'Bonfire'), []),
        defenses: (defenses as BonfireDefenseInfo[]).reduce(adjustBonfireDefenseInfo(skullIndex, roleID, combatRole, size), [] as BonfireDefenseInfo[]),
        movements: movements.reduce(adjustMovementInfo(skullIndex, roleID, combatRole), [])
    }
}

function getHackMasterCombatInfo(combatInfoObject: CombatInfoObject, size: Size, roleID: string | null, selectedRole: Role | null, specialModifier: number, spells: Spell[]): HackMasterCombatInfo {
    const { attacks, defenses, movements, combatRole: role, combatSecondary: secondary, combatEpValue: mainEpValue, combatRawEpValue: mainRawEpValue, epValueIndex: mainEpValueIndex, vitalityInfo: mainVitalityInfo } = combatInfoObject.entryCombatInfo

    const combatRole = selectedRole ? selectedRole.combatInfo.combatRole : role
    const combatSecondary = selectedRole ? selectedRole.combatInfo.combatSecondary : secondary

    const epPercentIncrease = (specialModifier / 10) + 1

    const epValue = +((selectedRole ? selectedRole.combatInfo.combatEpValue : mainEpValue) * epPercentIncrease).toFixed(0)
    const rawEpValue = (selectedRole ? selectedRole.combatInfo.combatRawEpValue : mainRawEpValue)
    const epValueIndex = (selectedRole ? selectedRole.combatInfo.epValueIndex : mainEpValueIndex) + specialModifier

    const vitalityInfo = selectedRole ? populateVitalityInfo(mainVitalityInfo, selectedRole.combatInfo.vitalityInfo) : mainVitalityInfo

    let attackInfo = combatInfoObject.entryCombatInfo.attackInfo[HACKMASTER]
    let defenseInfo = combatInfoObject.entryCombatInfo.defenseInfo[HACKMASTER]

    if (selectedRole) {
        const { attackInfo: roleAttack, defenseInfo: roleDefense } = selectedRole.combatInfo
        if (roleAttack) { attackInfo += roleAttack[HACKMASTER] }
        if (roleDefense) { defenseInfo += roleDefense[HACKMASTER] }
    }

    return {
        ...combatInfoObject.entryCombatInfo,
        type: 'HackMaster',
        combatRole, combatSecondary,
        combatEpValue: epValue,
        combatRawEpValue: rawEpValue,
        epValueIndex: epValueIndex,
        attackInfo,
        defenseInfo,
        initiative: getInitiative(combatRole, epValueIndex, 'HackMaster'),
        vitalityInfo: {
            ...vitalityInfo,
            rollUnderTrauma: calculateRollUnderTrauma(epValueIndex, 'HackMaster'),
            ...calculateVitalityAndTrauma(combatRole, combatSecondary, epValueIndex, vitalityInfo.weaponBreakageVitality, vitalityInfo.singleDieVitality, size, vitalityInfo.hasNoVitality, 'HackMaster'),
            locationalVitalities: vitalityInfo.locationalVitalities.filter((info: LocationVitality) => !info.roleid || info.roleid === roleID || info.allroles),
            defenseNFleeDice: getHackMasterDefenseNFlee(combatRole, epValueIndex)
        },
        attacks: attacks.reduce(adjustAttackInfo(epValueIndex, roleID, combatRole, size, spells, 'HackMaster'), []),
        defenses: (defenses as HackMasterDefenseInfo[]).reduce(adjustHackMasterDefenseInfo(epValueIndex, roleID, combatRole, size), [] as HackMasterDefenseInfo[]),
        movements: movements.reduce(adjustMovementInfo(epValueIndex, roleID, combatRole), [])
    }
}

function adjustAttackInfo(skulls: number, roleID: string | null, role: string, size: Size, spells: Spell[], system: SystemOption) {
    return (attackInfo: AttackStats[], attack: AttackStats): AttackStats[] => {
        if (!roleID || attack.roleid === roleID) {
            if (attack.infoType === 'weapon' && system === 'HackMaster') {
                attackInfo.push({
                    ...attack,
                    ...calculateHackMasterAttackInfo(attack, skulls, role, attack.scalingInfo.addsizemod, size, null),
                    system: 'HackMaster',
                    weaponName: attack.weapon?.split(' (')[0]
                })
            } else if (attack.infoType === 'weapon' && system === "Bonfire") {
                attackInfo.push({
                    ...attack,
                    ...calculateBonfireAttackInfo(attack, skulls, role, attack.scalingInfo.addsizemod, size, null),
                    system: 'Bonfire',
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

function adjustBonfireDefenseInfo(points: number, roleID: string | null, role: string, size: Size) {
    return (defenseInfo: BonfireDefenseInfo[], defense: BonfireDefenseInfo): BonfireDefenseInfo[] => {
        if (!roleID || defense.roleid === roleID) {
            defenseInfo.push({
                ...defense,
                ...calculateBonfireDefenseInfo(defense.scalingInfo, points, role, defense.scalingInfo.addsizemod, size, defense.scalingInfo.drAdjust),
                system: 'Bonfire',
                scalingInfo: defense.scalingInfo
            })
        }
        return defenseInfo
    }
}

function adjustHackMasterDefenseInfo(points: number, roleID: string | null, role: string, size: Size) {
    return (defenseInfo: HackMasterDefenseInfo[], defense: HackMasterDefenseInfo): HackMasterDefenseInfo[] => {
        if (!roleID || defense.roleid === roleID) {
            defenseInfo.push({
                ...defense,
                ...calculateHackMasterDefenseInfo(defense.scalingInfo, points, role, defense.scalingInfo.addsizemod, size, defense.scalingInfo.drAdjust),
                system: 'HackMaster',
                scalingInfo: defense.scalingInfo
            })
        }
        return defenseInfo
    }
}

function adjustMovementInfo(points: number, roleID: string | null, role: string) {
    return (movementInfo: Movement[], movement: Movement): Movement[] => {
        if (!movement?.roleId || movement?.roleId === roleID || movement?.allRoles) {
            const calculatedMovement = calculateMovement(movement, points, role)
            if (calculatedMovement) { movementInfo.push(calculatedMovement) }
        }
        return movementInfo
    }
}

function getDefault<Type>(roleInfo: Type, defaultInfo: Type): Type {
    return roleInfo ?? defaultInfo
}

function populateVitalityInfo(mainVitalityInfo: VitalityInfo, roleVitalityInfo: VitalityInfo): VitalityInfo {
    return {
        isSwarm: roleVitalityInfo.isSwarm,
        locationalVitalities: mainVitalityInfo.locationalVitalities,
        hasNoVitality: getDefault<boolean>(roleVitalityInfo.hasNoVitality, mainVitalityInfo.hasNoVitality),
        noTrauma: getDefault<boolean>(roleVitalityInfo.noTrauma, mainVitalityInfo.noTrauma),
        knockback: getDefault<number>(roleVitalityInfo.knockback, mainVitalityInfo.knockback),
        singleDieVitality: getDefault<boolean>(roleVitalityInfo.singleDieVitality, mainVitalityInfo.singleDieVitality),
        noKnockback: getDefault<boolean>(roleVitalityInfo.noKnockback, mainVitalityInfo.noKnockback),
        rollUnderTrauma: getDefault<number>(roleVitalityInfo.rollUnderTrauma, mainVitalityInfo.rollUnderTrauma),
        isIncorporeal: getDefault<boolean>(roleVitalityInfo.isIncorporeal, mainVitalityInfo.isIncorporeal),
        weaponBreakageVitality: getDefault<boolean>(roleVitalityInfo.weaponBreakageVitality, mainVitalityInfo.weaponBreakageVitality),
        vitality: getDefault<string | number>(roleVitalityInfo.vitality, mainVitalityInfo.vitality),
        trauma: getDefault<number | boolean>(roleVitalityInfo.trauma, mainVitalityInfo.trauma),
    }
}

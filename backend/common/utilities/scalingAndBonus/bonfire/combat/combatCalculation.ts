import { Size } from "../../../../interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { AttackInfo, BonfireDefenseInfo, BonfireWeaponInfo, HackMasterWeaponInfo } from "../../../../interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { getDefenseName } from "../../../formatting/formatting"
import calculateAndFormatBonfireAttackInfo, { calculateAndFormatHackMasterAttackInfo } from "./attackCalculator"
import getDefense from "./defenseUtilities/getDefense"
import getFlanks from "./defenseUtilities/getFlanks"
import getParry from "./defenseUtilities/getParry"
import getCover, { getHackMasterCover } from "./defenseUtilities/getCover"
import { calculateParryDR } from "./defenseUtilities/getParryDR"
import { calculateDR, calculateHackMasterDR } from "./defenseUtilities/getDR"

export interface CalculateCombatStatsReturn {
    attacks: AttackInfo[],
    defenses: BonfireDefenseInfo[]
}

export function calculateBonfireDefenseInfo(defenseInfo: any, skullIndex: number, role: string, addSizeMod: boolean, size: Size) {
    const {
        beastid, roleid, swarmbonus, armor, shield, eua, tdr, name, info
    } = defenseInfo

    return {
        beastid, roleid, swarmbonus, armor, shield, eua, tdr, info,
        name: getDefenseName(name, shield, armor),
        chosenName: name,
        defense: getDefense(addSizeMod, size, role, skullIndex, 'Bonfire'),
        flanks: getFlanks(role, skullIndex),
        parry: getParry(role, skullIndex),
        cover: getCover(role, skullIndex),
        parryDR: calculateParryDR(role, skullIndex, eua),
        dr: calculateDR(role, skullIndex)
    }
}

export function calculateHackMasterDefenseInfo(defenseInfo: any, skullIndex: number, role: string, addSizeMod: boolean, size: Size) {
    const {
        beastid, roleid, armor, shield, eua, tdr, name, info
    } = defenseInfo

    return {
        beastid, roleid, armor, shield, eua, tdr, info,
        name: getDefenseName(name, shield, armor),
        chosenName: name,
        defense: getDefense(addSizeMod, size, role, skullIndex, 'HackMaster'),
        shieldCover: getHackMasterCover(shield),
        dr: calculateHackMasterDR(role, skullIndex)
    }
}

export function calculateBonfireAttackInfo(attackInfo: any, skullIndex: number, role: string, addSizeMod: boolean, size: Size = 'Medium', gearCache?: any): BonfireWeaponInfo {
    const { name, weapon, isSpecial, damageType, weaponType, weaponInfo } = attackInfo
    return {
        ...attackInfo,
        ...calculateAndFormatBonfireAttackInfo(skullIndex, role, name, weapon, weaponType, isSpecial, damageType, weaponInfo, addSizeMod, size, gearCache),
    }
}

export function calculateHackMasterAttackInfo(attackInfo: any, skullIndex: number, role: string, addSizeMod: boolean, size: Size = 'Medium', gearCache?: any): HackMasterWeaponInfo {
    const { name, weapon, isSpecial, damageType, weaponType, weaponInfo } = attackInfo
    return {
        ...attackInfo,
        ...calculateAndFormatHackMasterAttackInfo(skullIndex, role, name, weapon, weaponType, isSpecial, damageType, weaponInfo, addSizeMod, size, gearCache),
    }
}
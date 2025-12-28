import { Size } from "../../../interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { AttackInfo, DefenseInfo } from "../../../interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { getDefenseName } from "../../formatting/formatting"
import calculateAndFormatAttackInfo from "./attackCalculator"
import getDefense from "./defenseUtilities/getDefense"
import getFlanks from "./defenseUtilities/getFlanks"
import getParry from "./defenseUtilities/getParry"
import getCover from "./defenseUtilities/getCover"
import { calculateParryDR } from "./defenseUtilities/getParryDR"
import { calculateDR } from "./defenseUtilities/getDR"

export interface CalculateCombatStatsReturn {
    attacks: AttackInfo[],
    defenses: DefenseInfo[]
}

export interface CalculateCombatStatsReturn {
    attacks: AttackInfo[],
    defenses: DefenseInfo[]
}

export function calculateDefenseInfo(defenseInfo: any, skullIndex: number, role: string, addSizeMod: boolean, size: Size) {
    const {
        beastid, roleid, swarmbonus, armor, shield, eua, tdr, name, info
    } = defenseInfo

    return {
        beastid, roleid, swarmbonus, armor, shield, eua, tdr, info,
        name: getDefenseName(name, shield, armor),
        chosenName: name,
        defense: getDefense(addSizeMod, size, role, skullIndex),
        flanks: getFlanks(role, skullIndex),
        parry: getParry(role, skullIndex),
        cover: getCover(role, skullIndex),
        parryDR: calculateParryDR(role, skullIndex, eua),
        dr: calculateDR(role, skullIndex)
    }
}

export function calculateAttackInfo(attackInfo: any, skullIndex: number, role: string, addSizeMod: boolean, size: Size = 'Medium', gearCache?: any) {
    const { name, weapon, isSpecial, damageType, weaponType, weaponInfo } = attackInfo
    return {
        ...attackInfo,
        ...calculateAndFormatAttackInfo(skullIndex, role, name, weapon, weaponType, isSpecial, damageType, weaponInfo, addSizeMod, size, gearCache),
    }
}
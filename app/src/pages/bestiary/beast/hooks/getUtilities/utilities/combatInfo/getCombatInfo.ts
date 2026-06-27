import { SystemOption } from "@bestiary/common/interfaces/beast/beast";
import { Spell } from "@bestiary/common/interfaces/beast/infoInterfaces/castingInfo";
import { NonspecificCombatInfo, SpecificCombatInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces";
import { Role } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/roleInfoInterfaces";
import { BeastInfo } from "../../../../interfaces/viewInterfaces";
import { getGeneralInfo } from "../getGeneralInfo";
import { getSelectedRoleIndex } from "../getRoleInfo";
import { getSpecialModifier } from "../getSpecialModifier";
import { getSpells } from "../getWeirdingInfo";
import getBonfireCombatInfo from "./utilities/bonfireSpecific/getBonfireInfo";
import getHackMasterCombatInfo from "./utilities/hackMasterSpecific/getHackMasterInfo";

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

export function formatSpecificCombatInfo(beastInfo: BeastInfo, roleId: string | null): SpecificCombatInfo {
    const index = getSelectedRoleIndex(beastInfo, roleId)
    const roleID: string = beastInfo.roleInfo.roles[index]?.id
    const selectedRole = beastInfo.roleInfo.roles[index]

    const combatInfoObject = createCombatInfoObject(beastInfo.combatInfo, beastInfo.system)
    const size = getGeneralInfo(beastInfo, roleId).size

    const combatInfo = getSpecificCombatInfo(combatInfoObject, size, roleID, selectedRole, getSpecialModifier(beastInfo), getSpells(beastInfo, roleId)) as unknown as NonspecificCombatInfo
    combatInfo.vitalityInfo.isSwarm = !!combatInfo.attacks.find(attackInfo => attackInfo.infoType === 'swarm')
    return combatInfo as unknown as SpecificCombatInfo
}

export function getSpecificCombatInfo(combatInfoObject: CombatInfoObject, size: Size, roleID: string | null, selectedRole: Role | null, specialModifier: number, spells: Spell[]): SpecificCombatInfo {
    if (combatInfoObject.selectedSystem === 'Bonfire') {
        return getBonfireCombatInfo(combatInfoObject, size, roleID, selectedRole, specialModifier, spells)
    } else {
        return getHackMasterCombatInfo(combatInfoObject, size, roleID, selectedRole, specialModifier, spells)
    }
}

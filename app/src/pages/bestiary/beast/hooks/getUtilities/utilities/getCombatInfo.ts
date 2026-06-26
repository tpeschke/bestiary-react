import { SpecificCombatInfo, NonspecificCombatInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { BeastInfo } from "../../../interfaces/viewInterfaces"
import { createCombatInfoObject, getRawCombatInfoByRole as getModeledRawCombatInfoByRole, getSpecificCombatInfo } from "../../../models/gmBeastClass/components/CombatInfo"
import { getGeneralInfo } from "./getGeneralInfo"
import { getSelectedRoleIndex } from "./getRoleInfo"
import { getSpecialModifier } from "./getSpecialModifier"
import { getSpells } from "./getWeirdingInfo"

export function getCombatInfo(beastInfo: BeastInfo, roleId: string | null): SpecificCombatInfo {
    const index = getSelectedRoleIndex(beastInfo, roleId)
    const roleID: string = beastInfo.roleInfo.roles[index]?.id
    const selectedRole = beastInfo.roleInfo.roles[index]

    const combatInfoObject = createCombatInfoObject(beastInfo.combatInfo, beastInfo.system)
    const size = getGeneralInfo(beastInfo, roleId).size

    const combatInfo = getSpecificCombatInfo(combatInfoObject, size, roleID, selectedRole, getSpecialModifier(beastInfo), getSpells(beastInfo, roleId)) as unknown as NonspecificCombatInfo
    combatInfo.vitalityInfo.isSwarm = !!combatInfo.attacks.find(attackInfo => attackInfo.infoType === 'swarm')
    return combatInfo as unknown as SpecificCombatInfo
}

export function getRawCombatInfoByRole(beastInfo: BeastInfo, roleId: string | null): NonspecificCombatInfo {
    const index = getSelectedRoleIndex(beastInfo, roleId)
    const roleID: string = beastInfo.roleInfo.roles[index]?.id
    const selectedRole = beastInfo.roleInfo.roles[index]

    const combatInfoObject = createCombatInfoObject(beastInfo.combatInfo, beastInfo.system)
    const size = getGeneralInfo(beastInfo, roleId).size

    return getModeledRawCombatInfoByRole(combatInfoObject, size, roleID, selectedRole, getSpells(beastInfo, roleId))
}

export function getCombatRoleType(beastInfo: BeastInfo, roleId: string | null): string | null {
    const index = getSelectedRoleIndex(beastInfo, roleId)

    if (index >= 0) {
        return beastInfo.roleInfo.roles[index].combatInfo.combatRole
    }

    return getCombatInfo(beastInfo, roleId).combatRole
}
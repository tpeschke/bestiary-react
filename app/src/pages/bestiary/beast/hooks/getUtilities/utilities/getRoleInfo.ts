import { Role } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/roleInfoInterfaces"
import { BeastInfo } from "../../../interfaces/viewInterfaces"

function getRoleIndex(roles: Role[], defaultRole: string, roleId: string | null): number {
    if (roleId) {
        return roles.findIndex(role => roleId === role.id)
    }

    return roles.findIndex(role => defaultRole === role.id)
}

export function getSelectedRoleIndex(beastInfo: BeastInfo, roleId: string | null): number {
    return getRoleIndex(beastInfo.roleInfo.roles, beastInfo.roleInfo.defaultrole, roleId)
}

export function isRoleSelected(beastInfo: BeastInfo, roleId: string | null): boolean {
    return getSelectedRoleIndex(beastInfo, roleId) >= 0
}

export function getSelectedRole(beastInfo: BeastInfo, roleId: string | null): Role | null {
    const index = getSelectedRoleIndex(beastInfo, roleId)

    if (index >= 0) {
        return beastInfo.roleInfo.roles[index]
    }

    return null
}

export function getSelectedRoleID(beastInfo: BeastInfo, roleId: string | null): string | null {
    const index = getSelectedRoleIndex(beastInfo, roleId)

    if (index >= 0) {
        return beastInfo.roleInfo.roles[index].id
    }

    return null
}

export function getRoleName(beastInfo: BeastInfo, roleId: string | null): string | null {
    const index = getSelectedRoleIndex(beastInfo, roleId)

    if (index >= 0) {
        return beastInfo.roleInfo.roles[index].generalInfo.name
    }

    return null
}
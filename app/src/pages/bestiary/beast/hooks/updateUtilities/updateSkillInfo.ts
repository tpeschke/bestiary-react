import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex"
import { BeastInfo } from "../../interfaces/viewInterfaces"
import { UpdateFunction } from "./interfaces/updateInterfaces"
import { Role } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/roleInfoInterfaces"
import { AllRoleSkillInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/skillInfoInterfaces"
import { getSelectedRole, getSelectedRoleIndex } from "../getUtilities/utilities/getRoleInfo"

export type UpdateSkillInfoFunctionsObject = {
    updateSkillInfo: UpdateFunction
}

export default function getUpdateSkillInfoFunctions(
    beastInfo: BeastInfo | undefined, roleId: string | null, updateBeastInfo: Function
): UpdateSkillInfoFunctionsObject {
    const selectedRole = beastInfo ? getSelectedRole(beastInfo, roleId) : null
    const selectedRoleIndex = beastInfo ? getSelectedRoleIndex(beastInfo, roleId) : -1

    return {
        updateSkillInfo: (key: string, value: string | number) => {
            if (beastInfo && selectedRole) {
                let modifiedRoleSkillInfo: AllRoleSkillInfo = {
                    ...selectedRole.skillInfo,
                    [key]: value
                }

                let modifiedSkillInfo = {
                    ...beastInfo.skillInfo,
                    [key]: value
                }

                if (key === 'skillSkulls' && typeof value === 'number') {
                    modifiedSkillInfo.skullIndex = getSkullIndex(value)
                }

                const modifiedBeastInfo: any = {
                    ...beastInfo,
                    skillInfo: modifiedSkillInfo,
                    roleInfo: {
                        ...beastInfo.roleInfo,
                        roles: beastInfo.roleInfo.roles.map((role: Role, index: number) => {
                            if (index === selectedRoleIndex) {
                                return {
                                    ...role,
                                    skillInfo: modifiedRoleSkillInfo
                                }
                            }
                            return role
                        })
                    }
                }

                updateBeastInfo(modifiedBeastInfo)
            } else if (beastInfo) {
                let modifiedSkillInfo = {
                    ...beastInfo.skillInfo,
                    [key]: value
                }

                if (key === 'skillSkulls' && typeof value === 'number') {
                    modifiedSkillInfo.skullIndex = getSkullIndex(value)
                }

                const modifiedBeastInfo: any = {
                    ...beastInfo,
                    skillInfo: modifiedSkillInfo
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        }
    }
}

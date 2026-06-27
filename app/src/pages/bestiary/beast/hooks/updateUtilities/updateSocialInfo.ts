import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex"
import { UpdateFunction } from "./interfaces/updateInterfaces"
import { BeastInfo } from "../../interfaces/viewInterfaces"
import { Role } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/roleInfoInterfaces"
import { AllRoleSocialInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/socialInfoInterfaces"
import { getSelectedRole, getSelectedRoleIndex } from "../getUtilities/utilities/getRoleInfo"

export type UpdateSocialInfoFunctionsObject = {
    updateSocialInfo: UpdateFunction
}

export default function getUpdateSocialInfoFunctions(
    beastInfo: BeastInfo | undefined, roleId: string | null, updateBeastInfo: Function
): UpdateSocialInfoFunctionsObject {
    const selectedRole = beastInfo ? getSelectedRole(beastInfo, roleId) : null
    const selectedRoleIndex = beastInfo ? getSelectedRoleIndex(beastInfo, roleId) : -1

    return {
        updateSocialInfo: (key: string, value: string | number) => {
            if (beastInfo && selectedRole) {
                let modifiedRoleSocialInfo: AllRoleSocialInfo = {
                    ...selectedRole.socialInfo,
                    [key]: value
                }

                let modifiedSocialInfo = {
                    ...beastInfo.socialInfo,
                    [key]: value
                }

                if (key === 'socialSkulls' && typeof value === 'number') {
                    modifiedSocialInfo.skullIndex = getSkullIndex(value)
                    modifiedSocialInfo.skullIndex = getSkullIndex(value)
                }

                const modifiedBeastInfo: any = {
                    ...beastInfo,
                    socialInfo: modifiedSocialInfo,
                    roleInfo: {
                        ...beastInfo.roleInfo,
                        roles: beastInfo.roleInfo.roles.map((role: Role, index: number) => {
                            if (index === selectedRoleIndex) {
                                return {
                                    ...role,
                                    socialInfo: modifiedRoleSocialInfo
                                }
                            }
                            return role
                        })
                    }
                }

                updateBeastInfo(modifiedBeastInfo)
            } else if (beastInfo) {
                let modifiedSocialInfo = {
                    ...beastInfo.socialInfo,
                    [key]: value
                }

                if (key === 'socialSkulls' && typeof value === 'number') {
                    modifiedSocialInfo.skullIndex = getSkullIndex(value)
                }

                const modifiedBeastInfo: any = {
                    ...beastInfo,
                    socialInfo: modifiedSocialInfo
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        }
    }
}

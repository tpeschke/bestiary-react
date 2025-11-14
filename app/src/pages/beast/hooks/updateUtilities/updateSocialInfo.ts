import { RoleSocialInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces"
import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex"
import { UpdateFunction } from "./updateInterfaces"
import GMBeastClass from "../../models/gmBeastClass/GMBeastClass"

export type UpdateSocialInfoFunctionsObject = {
    updateSocialInfo: UpdateFunction
}

export default function getUpdateSocialInfoFunctions(
    beast: GMBeastClass | undefined, updateBeastInfo: Function
): UpdateSocialInfoFunctionsObject {
    return {
        updateSocialInfo: (key: string, value: string | number) => {
            if (beast && beast.selectedRole) {
                let modifiedSocialInfo: RoleSocialInfo = {
                    ...beast.selectedRole.socialInfo,
                    [key]: value
                }

                if (key === 'socialSkulls' && typeof value === 'number') {
                    modifiedSocialInfo.skullIndex = getSkullIndex(value)
                }

                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    roleInfo: {
                        ...beast.beastInfo.roleInfo,
                        roles: beast.beastInfo.roleInfo.roles.map((role, index) => {
                            if (index === beast.selectedRoleIndex) {
                                return {
                                    ...role,
                                    socialInfo: modifiedSocialInfo
                                }
                            }
                            return role
                        })
                    }
                }

                updateBeastInfo(modifiedBeastInfo)
            } else if (beast) {
                let modifiedSocialInfo = {
                    ...beast.beastInfo.socialInfo,
                    [key]: value
                }

                if (key === 'socialSkulls' && typeof value === 'number') {
                    modifiedSocialInfo.skullIndex = getSkullIndex(value)
                }

                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    socialInfo: modifiedSocialInfo
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        }
    }
}
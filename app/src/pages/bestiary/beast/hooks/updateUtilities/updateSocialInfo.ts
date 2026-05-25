import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex"
import { UpdateFunction } from "./interfaces/updateInterfaces"
import GMBeastClass from "../../models/gmBeastClass/GMBeastClass"
import { Role } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/roleInfoInterfaces"
import { AllRoleSocialInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/socialInfoInterfaces"

export type UpdateSocialInfoFunctionsObject = {
    updateSocialInfo: UpdateFunction
}

export default function getUpdateSocialInfoFunctions(
    beast: GMBeastClass | undefined, updateBeastInfo: Function
): UpdateSocialInfoFunctionsObject {
    return {
        updateSocialInfo: (key: string, value: string | number) => {
            if (beast && beast.selectedRole) {
                let modifiedRoleSocialInfo: AllRoleSocialInfo = {
                    ...beast.selectedRole.socialInfo,
                    [key]: value
                }

                let modifiedSocialInfo = {
                    ...beast.beastInfo.socialInfo,
                    [key]: value
                }

                if (key === 'socialSkulls' && typeof value === 'number') {
                    modifiedSocialInfo.skullIndex = getSkullIndex(value)
                    modifiedSocialInfo.skullIndex = getSkullIndex(value)
                }

                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    socialInfo: modifiedSocialInfo,
                    roleInfo: {
                        ...beast.beastInfo.roleInfo,
                        roles: beast.beastInfo.roleInfo.roles.map((role: Role, index: number) => {
                            if (index === beast.selectedRoleIndex) {
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
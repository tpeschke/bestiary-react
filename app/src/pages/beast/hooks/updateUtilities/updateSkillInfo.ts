import { RoleSkillInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces"
import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex"
import GMBeastClass from "../../models/gmBeastClass/GMBeastClass"
import { UpdateFunction } from "./interfaces/updateInterfaces"

export type UpdateSkillInfoFunctionsObject = {
    updateSkillInfo: UpdateFunction
}

export default function getUpdateSkillInfoFunctions(
    beast: GMBeastClass | undefined, updateBeastInfo: Function
): UpdateSkillInfoFunctionsObject {
    return {
        updateSkillInfo: (key: string, value: string | number) => {
            if (beast && beast.selectedRole) {
                let modifiedSkillInfo: RoleSkillInfo = {
                    ...beast.selectedRole.skillInfo,
                    [key]: value
                }

                if (key === 'skillSkulls' && typeof value === 'number') {
                    modifiedSkillInfo.skullIndex = getSkullIndex(value)
                }

                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    roleInfo: {
                        ...beast.beastInfo.roleInfo,
                        roles: beast.beastInfo.roleInfo.roles.map((role, index) => {
                            if (index === beast.selectedRoleIndex) {
                                return {
                                    ...role,
                                    skillInfo: modifiedSkillInfo
                                }
                            }
                            return role
                        })
                    }
                }

                updateBeastInfo(modifiedBeastInfo)
            } else if (beast) {
                let modifiedSkillInfo = {
                    ...beast.beastInfo.skillInfo,
                    [key]: value
                }

                if (key === 'skillSkulls' && typeof value === 'number') {
                    modifiedSkillInfo.skullIndex = getSkullIndex(value)
                }

                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    skillInfo: modifiedSkillInfo
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        }
    }
}
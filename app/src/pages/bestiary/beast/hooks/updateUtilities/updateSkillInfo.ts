import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex"
import GMBeastClass from "../../models/gmBeastClass/GMBeastClass"
import { UpdateFunction } from "./interfaces/updateInterfaces"
import { Role } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/roleInfoInterfaces"
import { AllRoleSkillInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/skillInfoInterfaces"

export type UpdateSkillInfoFunctionsObject = {
    updateSkillInfo: UpdateFunction
}

export default function getUpdateSkillInfoFunctions(
    beast: GMBeastClass | undefined, updateBeastInfo: Function
): UpdateSkillInfoFunctionsObject {
    return {
        updateSkillInfo: (key: string, value: string | number) => {
            if (beast && beast.selectedRole) {
                let modifiedRoleSkillInfo: AllRoleSkillInfo = {
                    ...beast.selectedRole.skillInfo,
                    [key]: value
                }

                let modifiedSkillInfo = {
                    ...beast.beastInfo.skillInfo,
                    [key]: value
                }

                if (key === 'skillSkulls' && typeof value === 'number') {
                    modifiedSkillInfo.skullIndex = getSkullIndex(value)
                }

                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    skillInfo: modifiedSkillInfo,
                    roleInfo: {
                        ...beast.beastInfo.roleInfo,
                        roles: beast.beastInfo.roleInfo.roles.map((role: Role, index: number) => {
                            if (index === beast.selectedRoleIndex) {
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
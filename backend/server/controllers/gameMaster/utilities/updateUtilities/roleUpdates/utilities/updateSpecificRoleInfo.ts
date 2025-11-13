import { Role } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces";
import updateBasicRoleSocialInfo from "./utilities/utilities/updateBasicRoleSocialInfo";
import updateBasicRoleCombatInfo from "./utilities/utilities/updateBasicRoleCombatInfo";
import updateBasicRoleSkillInfo from "./utilities/utilities/updateBasicRoleSkillInfo";

export default async function updateSpecificRoleInfo(beastID: number, role: Role) {
    const { id, socialInfo, combatInfo, skillInfo } = role

    let promiseArray: Promise<any>[] = [
        updateBasicRoleSocialInfo(beastID, id, socialInfo),
        updateBasicRoleCombatInfo(beastID, id, combatInfo),
        updateBasicRoleSkillInfo(beastID, id, skillInfo)
    ]

    return Promise.all(promiseArray)
}
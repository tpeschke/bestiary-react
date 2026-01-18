import RoleInfo from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces";
import updateRoles from "./utilities/utilities/updateRoles";

export default async function updateRoleInfo(beastID: number, roleInfo: RoleInfo) {
    const { roles } = roleInfo
    
    let promiseArray: Promise<any>[] = [
        updateRoles(beastID, roles)
    ]

    return Promise.all(promiseArray)
}
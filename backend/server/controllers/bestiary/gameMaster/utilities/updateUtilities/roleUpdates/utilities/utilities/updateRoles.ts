import { Role } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces";
import updateSpecificRoleInfo from "../updateSpecificRoleInfo";

export default async function updateRoles(beastID: number, roles: Role[]) {
    let promiseArray: Promise<any>[] = roles.map(role => updateSpecificRoleInfo(beastID, role))

    return Promise.all(promiseArray)
}
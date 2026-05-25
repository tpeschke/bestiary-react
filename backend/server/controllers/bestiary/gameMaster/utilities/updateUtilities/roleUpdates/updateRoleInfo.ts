import GeneralRoleInfo from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/roleInfoInterfaces";
import updateRoles from "./utilities/utilities/updateRoles";

export default async function updateRoleInfo(beastID: number, roleInfo: GeneralRoleInfo) {
    const { roles } = roleInfo
    
    let promiseArray: Promise<any>[] = [
        updateRoles(beastID, roles)
    ]

    return Promise.all(promiseArray)
}
import LinkedInfo from "@bestiary/common/interfaces/beast/infoInterfaces/linkedInfoInterfaces";
import updateTypes from "./utilities/updateTypes";

export default async function updateLinkedInfo(beastID: number, linkedInfo: LinkedInfo) {
    const { types } = linkedInfo

    return Promise.all([
        updateTypes(beastID, types)
    ])
}
import { NonspecificGeneralInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces";
import query from "../../../../../../../db/database";
import { BONFIRE } from "@bestiary/common/utilities/get/getSystemString";

const updateGeneralInfoSQL = `update bbIndividualBeast 
set ecology = $2
where id = $1`

export default async function updateBasicGeneralInfo(beastID: number, generalInfo: NonspecificGeneralInfo) {
    const { appearance } = generalInfo

    return query(updateGeneralInfoSQL, [beastID, appearance[BONFIRE]])
}
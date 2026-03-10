import GeneralInfo from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces";
import query from "../../../../../../../db/database";

const updateGeneralInfoSQL = `update bbIndividualBeast 
set ecology = $2
where id = $1`

export default async function updateBasicGeneralInfo(beastID: number, generalInfo: GeneralInfo) {
    const { appearance } = generalInfo

    return query(updateGeneralInfoSQL, [beastID, appearance])
}
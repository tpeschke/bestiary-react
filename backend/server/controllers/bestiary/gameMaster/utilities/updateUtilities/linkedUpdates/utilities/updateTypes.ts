import { BeastType } from "@bestiary/common/interfaces/beast/infoInterfaces/linkedInfoInterfaces";
import query from "../../../../../../../db/database";

const deleteTypesSQL = `delete from bbBeastType 
where beastID = $1 and Not (id = any($2))`

export default async function updateTypes(beastID: number, types: BeastType[]) {
    await query(deleteTypesSQL, [beastID, [0, ...types.map(type => type.id)]])

    return true
}


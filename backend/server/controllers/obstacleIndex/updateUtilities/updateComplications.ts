import { Complication } from "@bestiary/common/interfaces/obstacles/obstacleCatalog";
import query from "../../../db/database";

const updateComplicationsSQL = `update obComplications
set name = $3, index = $4, body = $5 
where stringId = $1 and id = $2`

export default async function updateComplications(stringId: string, complications: Complication[] | undefined) {
    if (complications) {
        return Promise.all(complications.map(({id, body}, index) => {
            return query(updateComplicationsSQL, [stringId, id, `${index}`, index, body])
        }))
    }

    return true
}
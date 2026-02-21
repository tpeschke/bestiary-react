import { Complication } from "@bestiary/common/interfaces/obstacles/obstacleCatalog";
import query from "../../../db/database";

const addComplicationsSQL = `insert into obComplications (stringId, name, index, body)
values ($1, $2, $3, $4)`

const updateComplicationsSQL = `update obComplications
set name = $3, index = $4, body = $5 
where stringId = $1 and id = $2`

export default async function updateComplications(stringId: string, complications: Complication[] | undefined) {
    if (complications) {
        return Promise.all(complications.map(({id, body}, index) => {
            if (id === 0) {
                return query(addComplicationsSQL, [stringId, `${index + 1}`, index, body])
            }
            return query(updateComplicationsSQL, [stringId, id, `${index + 1}`, index, body])
        }))
    }

    return true
}
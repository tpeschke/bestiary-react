import { SkullVariant } from "@bestiary/common/interfaces/obstacles/obstacleCatalog";
import query from "../../../db/database";

const addSkullVariantSQL = `insert into obSkullVariant (stringId, skullValue, body)
values ($1, $2, $3)`

const updateSkullVariantSQL = `update obComplications
set skullValue = $3, body = $4 
where stringId = $1 and id = $2`

export default async function updateSkullVariants(stringId: string, skullVariants: SkullVariant[] | undefined) {
    if (skullVariants) {
        return Promise.all(skullVariants.map(({id, skullValue, body}) => {
            if (id === 0) {
                return query(addSkullVariantSQL, [stringId, skullValue, body])
            }
            return query(updateSkullVariantSQL, [stringId, id, skullValue, body])
        }))
    }

    return true
}
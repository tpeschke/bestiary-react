import { OtherStrategicOption } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import query from "../../../../../../../../db/database"

const addStrategicOtherSQL = `insert into bbStrategicOther (beastID, label, tooltip)
values ($1, $2, $3)`

const updateStrategicOtherSQL = `update bbStrategicOther
set label = $3, tooltip = $4
where beastID = $1 and id = $2`

export default async function updateStrategicOther(beastID: number, others: OtherStrategicOption[]) {
    return others.map(others => {
        const { id, label, tooltip } = others

        if (id === 0) {
            return query(addStrategicOtherSQL, [beastID, label, tooltip])
        } else {
            return query(updateStrategicOtherSQL, [beastID, id, label, tooltip])
        }
    })
}
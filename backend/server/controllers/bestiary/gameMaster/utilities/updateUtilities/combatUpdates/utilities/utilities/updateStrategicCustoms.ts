import { Custom } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import query from "../../../../../../../../db/database"

const addStrategicCustomSQL = `insert into bbStrategicCustoms (beastID, label, attack, defense)
values ($1, $2, $3, $4)`

const updateStrategicCustomSQL = `update bbStrategicCustoms
set label = $3, attack = $4, defense = $5
where beastID = $1 and id = $2`

export default async function updateStrategicCustoms(beastID: number, customs: Custom[]) {
    return customs.map(custom => {
        const { id, label, attack, defense } = custom

        if (id === 0) {
            return query(addStrategicCustomSQL, [beastID, label, attack, defense])
        } else {
            return query(updateStrategicCustomSQL, [beastID, id, label, attack, defense])
        }
    })
}
import { Custom } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import query from "../../../../../../../../db/database";

const getStrategicCustomsSQL = `select * from bbStrategicCustoms
where beastid = $1
order by label`

export default async function getStrategicCustoms(beastID: number): Promise<Custom[]> {
    return query(getStrategicCustomsSQL, beastID)
}
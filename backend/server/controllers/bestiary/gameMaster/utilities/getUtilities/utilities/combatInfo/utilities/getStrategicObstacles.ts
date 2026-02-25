import { StrategicObstacles } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import query from "../../../../../../../../db/database";

const getStrategicObstaclesSQL = `select so.id, obstacleid, label, name as obstaclename from bbStrategicObstacles so
left join obbase b on b.id = so.obstacleid
where beastid = $1`

export default async function getStrategicObstacles(beastID: number): Promise<StrategicObstacles[]> {
    return query(getStrategicObstaclesSQL, beastID)
}
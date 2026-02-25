import { OtherStrategicOption } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import query from "../../../../../../../../db/database";

const getStrategicOtherSQL = `select * from bbStrategicOther
where beastid = $1
order by label`

export default async function getStrategicOther(beastID: number): Promise<OtherStrategicOption[]> {
    return query(getStrategicOtherSQL, beastID)
}
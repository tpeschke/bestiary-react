import { StrategyNLimits } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import query from "../../../../../../../db/database";

export default async function updateStrategiesNLimits(strategiesNLimits: StrategyNLimits[] | undefined) {
    if (!strategiesNLimits) {return true}

    const updateSQLQuery = `update bbStrategiesNLimits
    set chaos = $2, chaosNote = $3, diminish = $4, strategies = $5, strategiesNote = $6, baseLineStrategies = $7, treasure = $8
    where id = $1`

    const addSQLQuery = `insert into bbStrategiesNLimits (groupID, chaos, chaosNote, diminish, strategies, strategiesNote, baselineStrategies, treasure)
    values ( $1, $2, $3, $4, $5, $6, $7, $8 )`

    return Promise.all(
        strategiesNLimits.map(({id, groupID, chaos, chaosNote, diminish, strategies, strategiesNote, baselineStrategies, treasure}) => {
            if (id) {
                return query(updateSQLQuery, [id, chaos, chaosNote, diminish, strategies, strategiesNote, baselineStrategies, treasure])
            }
            return query(addSQLQuery, [groupID, chaos, chaosNote, diminish, strategies, strategiesNote, baselineStrategies, treasure])
        })
    )
}
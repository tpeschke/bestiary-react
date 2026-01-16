import { StrategyNLimits } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import query from "../../../../../../db/database";

const strategiesSQL = `select beastID, label as group, l.id as labelID, s.* from bbEncounterLabels l
left join bbStrategiesNLimits s on s.groupID = l.id
where beastID = $1
order by weight desc`

export default async function getStrategiesNLimits(beastID: number): Promise<StrategyNLimits[]> {
    const rawStrategies = await query(strategiesSQL, beastID)

    return rawStrategies.map(({beastid, group, id, labelid, chaos, chaosnote, diminish, strategies, strategiesnote, baselinestrategies, treasure, notes}) => {
        return {
            group, id, chaos, diminish, strategies, treasure, notes,
            baselineStrategies: baselinestrategies,
            strategiesNote: strategiesnote,
            chaosNote: chaosnote,
            groupID: labelid,
            beastID: beastid,
        }
    })
}
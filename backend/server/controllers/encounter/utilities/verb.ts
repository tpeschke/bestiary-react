import query from '../../../db/database'
import { getWeightedVerb } from '../../../db/encounter/verb'
import { Verb } from "../../../interfaces/encounterInterfaces"

export default async function getVerb(beastId: number): Promise<string> {
    const [verb]: Verb[] = await query(getWeightedVerb, beastId)
    if (verb) {
        return verb.verb
    }
    return 'N/A'
}
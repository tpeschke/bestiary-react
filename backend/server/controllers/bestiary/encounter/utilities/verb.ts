import { Verb } from '@bestiary/common/interfaces/encounterInterfaces'
import query from '../../../../db/database'
import { getWeightedVerb } from '../../../../db/encounter/verb'

export default async function getVerb(beastId: number): Promise<string> {
    const [verb]: Verb[] = await query(getWeightedVerb, beastId)
    if (verb) {
        return verb.verb
    }
    return 'N/A'
}
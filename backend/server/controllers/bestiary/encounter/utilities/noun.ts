import query from "../../../../db/database"
import { getWeightedNoun } from "../../../../db/encounter/noun"
import { Noun } from "../../../../interfaces/bestiary/encounterInterfaces"

export default async function getNoun(beastId: number): Promise<string> {
    const [noun]: Noun[] = await query(getWeightedNoun, beastId)
    if (noun) {
        return noun.noun
    }
    return 'N/A'
}
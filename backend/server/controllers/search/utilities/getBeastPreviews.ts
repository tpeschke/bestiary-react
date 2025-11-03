import { SearchResult } from "@bestiary/common/interfaces/search"
import { User } from "../../../interfaces/apiInterfaces"
import { getRarity } from "../../../utilities/rarity"
import query from "../../../db/database"
import { getGMPreview, getPlayerPreview } from "../../../db/search/preview"

export default async function getBeastPreviews(flattenedIDArray: number[], user: User | null | undefined): Promise<SearchResult[]> {
    let promiseArray: Promise<SearchResult>[] = []

    flattenedIDArray.slice(0, 25).forEach(async (beastID) => {
        if (user?.patreon && user?.patreon >= 3) {
            promiseArray.push(query(getGMPreview, [beastID, user?.id]).then(formatResult))
        } else {
            promiseArray.push(query(getPlayerPreview, beastID).then(formatResult))
        }
    })

    return Promise.all(promiseArray).then(populatedArray => {
        // the final filter removes null values for player search
        return populatedArray.filter(x => x)
    })
}

function formatResult(result: any[]): SearchResult {
    return { ...result[0], rarity: getRarity(result[0]?.rarity) }
}
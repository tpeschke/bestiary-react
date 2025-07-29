import { SearchResult } from "../../../../common/interfaces/search"
import { User } from "../../../interfaces/apiInterfaces"
import { getRarity } from "../../../utilities/rarity"

export default async function getBeastPreviews(databaseConnection: any, flattenedIDArray: number[], user: User | null | undefined): Promise<SearchResult[]> {
    let promiseArray: Promise<SearchResult>[] = []

    flattenedIDArray.slice(0, 25).forEach(async (beastID) => {
        if (user?.patreon && user?.patreon >= 3) {
            promiseArray.push(databaseConnection.search.preview.gm(beastID, user?.id).then(formatResult))
        } else {
            promiseArray.push(databaseConnection.search.preview.player(beastID).then(formatResult))
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
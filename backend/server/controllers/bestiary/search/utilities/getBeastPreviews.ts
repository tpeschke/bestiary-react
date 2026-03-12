import { SearchResult } from "@bestiary/common/interfaces/search"
import { getRarity } from "../../../../utilities/rarity"
import query from "../../../../db/database"
import { getGMPreview, getPlayerPreview } from "../../../../db/search/preview"
import { User } from "@bestiary/common/interfaces/userInterfaces"
import getAccessLevel, { PLAYER } from "@bestiary/common/utilities/get/getAccessLevel"

export default async function getBeastPreviews(flattenedIDArray: number[], user: User | null | undefined): Promise<SearchResult[]> {
    const patreon = getAccessLevel(user)
    let promiseArray: Promise<SearchResult | null>[] = []

    flattenedIDArray.slice(0, 25).forEach(async (beastID) => {
        if (patreon !== PLAYER) {
            promiseArray.push(query(getGMPreview, [beastID, user?.id]).then(formatResult))
        } else {
            promiseArray.push(query(getPlayerPreview, beastID).then(formatResult))
        }
    })

    return Promise.all(promiseArray).then(populatedArray => {
        // the final filter removes null values for player search
        return populatedArray.filter(x => x) as SearchResult[]
    })
}

function formatResult(result: any[]): SearchResult | null {
    if (result[0]) {
        return { ...result[0], rarity: getRarity(result[0]?.rarity) }
    }
    return null
}
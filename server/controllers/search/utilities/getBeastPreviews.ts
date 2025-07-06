import { SearchResult } from "../../../../common/interfaces/search"
import { User } from "../../../interfaces/apiInterfaces"
import { SearchReturn } from "../search"

export default async function getBeastPreviews(databaseConnection: any, flattenedIDArray: SearchReturn[], user: User | undefined): Promise<SearchResult[]> {
    let promiseArray: Promise<SearchResult>[] = []

    flattenedIDArray.forEach(async ({ id: beastID }) => {
        if (user?.patreon && user?.patreon >= 3) {
            promiseArray.push(databaseConnection.search.preview.gm(beastID, user?.id).then(result => result[0]))
        } else {
            promiseArray.push(databaseConnection.search.preview.player(beastID).then(result => result[0]))
        }
    })

    return Promise.all(promiseArray).then(populatedArray => {
        // the final filter removes null values for player search
        return populatedArray.filter(x => x)
    })
}
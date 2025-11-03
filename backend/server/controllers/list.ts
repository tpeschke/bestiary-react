import query from "../db/database"
import { getRandomMonsterEntryFromList } from "../db/list/random"
import { Request, Response } from "../interfaces/apiInterfaces"
import { checkForContentTypeBeforeSending } from "../utilities/sendingFunctions"

interface GetRandomRequest extends Request {
    params: GetRandomQuery
}

interface GetRandomQuery {
    listId: string
}

export async function getRandomMonsterFromList(request: GetRandomRequest, response: Response) {
    const { listId } = request.params

    const [randomBeast] = await query(getRandomMonsterEntryFromList, listId)
    checkForContentTypeBeforeSending(response, randomBeast)
}
import { Request, Response } from "../interfaces/apiInterfaces"
import getDatabaseConnection from "../utilities/databaseConnection"
import { checkForContentTypeBeforeSending } from "../utilities/sendingFunctions"

interface GetRandomRequest extends Request {
    params: GetRandomQuery
}

interface GetRandomQuery {
    listId: string
}

export async function getRandomMonsterFromList(request: GetRandomRequest, response: Response) {
    const databaseConnection = getDatabaseConnection(request)
    const { listId } = request.params

    const [randomBeast] = await databaseConnection.list.random.get(listId)
    checkForContentTypeBeforeSending(response, randomBeast)
}
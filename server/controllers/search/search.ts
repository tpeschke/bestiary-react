import getDatabaseConnection from "../../utilities/databaseConnection"
import { Request, Response, User } from '../../interfaces/apiInterfaces'
import getIDsFromQuery from "./utilities/getIDsFromQuery"
import flattenIDArray from "./utilities/flattenIDArray"
import { isOwner } from "../../utilities/ownerAccess"
import getBeastPreviews from "./utilities/getBeastPreviews"
import { checkForContentTypeBeforeSending } from "../../utilities/sendingFunctions"

interface SearchRequest extends Request {
    query: SearchQuery
}

export interface SearchQuery {
    [key: string]: string
}

export default async function search(request: SearchRequest, response: Response) {
    const databaseConnection = getDatabaseConnection(request)

    const idArray = await getIDsFromQuery(databaseConnection, request.query, request.user)
    const flattenedIDArray = flattenIDArray(idArray)
    const populatedArray = await getBeastPreviews(databaseConnection, flattenedIDArray, request.user)
    
    checkForContentTypeBeforeSending(response, populatedArray)
}




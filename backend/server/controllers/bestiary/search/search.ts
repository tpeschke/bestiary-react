import { Request, Response } from '../../../interfaces/apiInterfaces'
import getIDsFromQuery from "./utilities/getIDsFromQuery"
import flattenIDArray from "./utilities/flattenIDArray"
import getBeastPreviews from "./utilities/getBeastPreviews"
import { checkForContentTypeBeforeSending } from "../../../utilities/sendingFunctions"

interface SearchRequest extends Request {
    query: SearchQuery
}

export interface SearchQuery {
    name?: string,
    body?: string,
    minCombatRate?: string,
    minCombatEPs?: string,
    minChallengeRate?: string,
    minChallengeEPs?: string,
    minConfrontationRate?: string,
    minSocialEPs?: string,
    maxCombatRate?: string,
    maxCombatEPs?: string,
    maxChallengeRate?: string,
    maxChallengeEPs?: string,
    maxConfrontationRate?: string,
    maxSocialEPs?: string,
    size?: string,
    access?: string,
    rarity?: string
    anyAccess?: string,
    personalNotes?: string,
    types?: string | string[],
    climate?: string | string[],
    socialRoles?: string | string[],
    combatRoles?: string | string[],
    skillRoles?: string | string[],
}

export interface SearchReturn {
    id: number
}

export default async function search(request: SearchRequest, response: Response) {
    const idArray = await getIDsFromQuery(request.query, request.user)
    const flattenedIDArray = flattenIDArray(idArray)
    const populatedArray = await getBeastPreviews(flattenedIDArray, request.user)
    
    checkForContentTypeBeforeSending(response, populatedArray)
}

import { Response, BasicParamsRequest } from "../../interfaces/apiInterfaces"
import getDatabaseConnection from "../../utilities/databaseConnection"
import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../../utilities/sendingFunctions'
import { getGMVersionOfBeastFromDB } from "./utilities/getUtilities/getBeast"
import { Beast } from "../../../common/interfaces/beast/beast"

const sendErrorForward = sendErrorForwardNoFile('beast controller')

interface GetRequest extends BasicParamsRequest {
    query?: GetBeastQuery
}

interface GetBeastQuery {
    edit: string
}

export async function getGMVersionOfBeast(request: GetRequest, response: Response) {
    const databaseConnection = getDatabaseConnection(request)
    const beastId = +request.params.beastId
    const isEditing = request.query ? request.query.edit === 'true' : false
    const userID = request.user?.id

    const beast: Beast = await getGMVersionOfBeastFromDB(databaseConnection, beastId, {isEditing, userID})
    
    if (beast) {
        checkForContentTypeBeforeSending(response, beast)
    } else {
        sendErrorForward('404', { message: 'No Entry Found'}, response)
    }
}
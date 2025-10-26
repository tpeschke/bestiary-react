import { Response, BasicParamsRequest } from "../../interfaces/apiInterfaces"
import getDatabaseConnection from "../../utilities/databaseConnection"
import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../../utilities/sendingFunctions'
import { getGMVersionOfBeastFromDB } from "./utilities/getUtilities/getBeast"
import { Beast } from "@bestiary/common/interfaces/beast/beast"

const sendErrorForward = sendErrorForwardNoFile('beast controller')

interface GetRequest extends BasicParamsRequest {
    query?: GetBeastQuery
}

interface GetBeastQuery {
    edit: string
}

export async function getGMVersionOfBeast(request: GetRequest, response: Response) {
    const databaseConnection = getDatabaseConnection(request)
    const gearCache = request.app.get('gearCache')
    const beastID = +request.params.beastId
    const isEditing = request.query ? request.query.edit === 'true' : false
    const userID = request.user?.id

    const beast: Beast = await getGMVersionOfBeastFromDB(databaseConnection, beastID, {isEditing, userID, gearCache})
    
    if (beast) {
        checkForContentTypeBeforeSending(response, beast)
    } else {
        sendErrorForward('404', { status: 404, message: 'No Entry Found'}, response)
    }
}
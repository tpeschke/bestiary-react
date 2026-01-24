import query from "../../db/database";
import { Response, Request } from "../../interfaces/apiInterfaces"
import { getObstacleComplications, getObstaclePairs } from "../../db/skill/obstacle";
import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from "../../utilities/sendingFunctions";
import { Obstacle } from "@bestiary/common/interfaces/obstacles/obstacleCatalog";
import { isOwner } from "../../utilities/ownerAccess";
import updateSkull from "./updateUtilities/updateSkull";
import updateDifficulty from "./updateUtilities/updateDifficulty";

const sendErrorForward = sendErrorForwardNoFile('Single Obstacle by ID')

interface GetRequest extends Request {
    params: {
        obstacleId: string
    }
}

const getObstacles = `select * from obBase b where id = $1`

export async function getObstaclesById(request: GetRequest, response: Response) {
    const obstacleId: number = +request.params.obstacleId

    let [obstacle] = await query(getObstacles, obstacleId) as Obstacle[]

    if (obstacle) {
        await Promise.all([
            query(getObstacleComplications, obstacle.stringid).then((returnedComplications: any) => obstacle.complications = returnedComplications),
            query(getObstaclePairs, [obstacle.stringid, 'pairone']).then((returnedPairs: any) => obstacle.pairsOne = returnedPairs),
            query(getObstaclePairs, [obstacle.stringid, 'pairotwo']).then((returnedPairs: any) => obstacle.pairsTwo = returnedPairs)
        ])

        checkForContentTypeBeforeSending(response, obstacle)
    } else {
        sendErrorForward('404', { message: 'No Obstacle Found' }, response)
    }
}

interface saveRequest extends Request {
    body: Obstacle
}

export async function saveObstacle(request: saveRequest, response: Response) {
    const { body: obstacle, user } = request

    if (isOwner(user?.id)) {
        const {id: obstacleId, skull, difficulty} = obstacle

        await Promise.all([
            updateSkull(obstacleId, skull),
            updateDifficulty(obstacleId, difficulty)
        ])

        checkForContentTypeBeforeSending(response, { obstacleId })
    } else {
        checkForContentTypeBeforeSending(response, { color: 'red', message: "You don't own this entry so can't edit it", type: 'message' })
    }
}
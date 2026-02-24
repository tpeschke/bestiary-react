import query from "../../../db/database";
import { Response, Request } from "../../../interfaces/apiInterfaces"
import { getObstacleComplications, getObstaclePairs, getSkullVariants } from "../../../db/skill/obstacle";
import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from "../../../utilities/sendingFunctions";
import { Obstacle } from "@bestiary/common/interfaces/obstacles/obstacleCatalog";
import makeID from "../../../utilities/makeID";

const sendErrorForward = sendErrorForwardNoFile('Single Obstacle by ID')

interface GetRequest extends Request {
    params: {
        obstacleId: string
    }
}

const getObstacles = `select * from obBase b where id = $1`

export async function getObstaclesById(request: GetRequest, response: Response) {
    const patreon = request.user?.patreon
    const obstacleId = +request.params.obstacleId

    if (patreon && patreon < 5) {
        checkForContentTypeBeforeSending(response, { color: 'red', type: 'message', message: 'You Need to Upgrade Your Patreon to View Obstacles' })
    } else if (patreon && patreon >= 5 && obstacleId > 0) {

        let [obstacle] = await query(getObstacles, obstacleId) as Obstacle[]

        if (obstacle) {
            await Promise.all([
                query(getObstacleComplications, obstacle.stringid).then((returnedComplications: any) => obstacle.complications = returnedComplications),
                query(getSkullVariants, obstacle.stringid).then((returnedSkullVariants: any) => obstacle.skullVariants = returnedSkullVariants.map((variant: any) => ({
                    ...variant,
                    skullValue: variant.skullvalue
                }))),
                query(getObstaclePairs, [obstacle.stringid, 'pairone']).then((returnedPairs: any) => obstacle.pairsOne = returnedPairs),
                query(getObstaclePairs, [obstacle.stringid, 'pairotwo']).then((returnedPairs: any) => obstacle.pairsTwo = returnedPairs)
            ])

            checkForContentTypeBeforeSending(response, obstacle)
        } else {
            sendErrorForward('404', { message: 'No Obstacle Found' }, response)
        }
    } else if (patreon && patreon >= 5 && obstacleId === 0) {
        const newObstacle: Obstacle = {
            id: 0,
            obstacleid: 0,
            name: 'New Obstacle',
            skull: 0,
            difficulty: '',
            notes: '',
            complicationsingle: '',
            failure: '',
            information: '',
            success: '',
            threshold: '',
            time: '',
            type: 'obstacle',
            stringid: makeID(50)
        }

        checkForContentTypeBeforeSending(response, newObstacle)
    }
}
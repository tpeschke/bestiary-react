import query from "../../../db/database";
import { Response, Request } from "../../../interfaces/apiInterfaces"
import { getSkullVariants } from "../../../db/skill/obstacle";
import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from "../../../utilities/sendingFunctions";
import { Obstacle, RawComplication, RawObstacle } from "@bestiary/common/interfaces/obstacles/obstacleCatalog";
import makeID from "../../../utilities/makeID";
import { getObstacleComplications, getObstaclePairs } from "../../../db/skill/challenge";
import getAccessLevel, { PLAYER } from "@bestiary/common/utilities/get/getAccessLevel";
import getBaseEPValue from "@bestiary/common/utilities/scalingAndBonus/hackMaster/getEPValue";
import { buildSystemSpecificAppearance } from "../../bestiary/gameMaster/utilities/formatUtilities/getSystemSpecificTerminologies";

const sendErrorForward = sendErrorForwardNoFile('Single Obstacle by ID')

interface GetRequest extends Request {
    params: {
        obstacleId: string
    }
}

const getObstacles = `select * from obBase b where id = $1`

export async function getObstaclesById(request: GetRequest, response: Response) {
    const patreon = getAccessLevel(request.user)
    const obstacleId = +request.params.obstacleId

    if (patreon === PLAYER) {
        checkForContentTypeBeforeSending(response, { color: 'red', type: 'message', message: 'You Need to Upgrade Your Ko-Fi to View Obstacles' })
    } else if (obstacleId > 0) {

        let [rawObstacle] = await query(getObstacles, obstacleId) as RawObstacle[]

        if (rawObstacle) {
            const obstacle = await formatRawObstacle(rawObstacle)

            checkForContentTypeBeforeSending(response, obstacle)
        } else {
            sendErrorForward('404', { message: 'No Obstacle Found' }, response)
        }
    } else if (obstacleId === 0) {
        const newObstacle: Obstacle = {
            id: 0,
            obstacleid: 0,
            name: 'New Obstacle',
            skull: 0,
            ep: 10,
            prompt: null,
            difficulty: ['', undefined, ''],
            notes: '',
            complicationsingle: ['', undefined, ''],
            failure: ['', undefined, ''],
            success: ['', undefined, ''],
            information: '',
            threshold: '',
            time: '',
            type: 'obstacle',
            stringid: makeID(50)
        }

        checkForContentTypeBeforeSending(response, newObstacle)
    }
}

export async function formatRawObstacle(rawObstacle: RawObstacle): Promise<Obstacle> {
    const { id, beastid, obstacleid, name, skull, prompt, difficulty, notes, complicationsingle, failure, information, success, threshold, time, type, stringid } = rawObstacle

    let obstacle: Obstacle = {
        id, beastid, obstacleid, name, skull, prompt, notes, information, threshold, time, type, stringid,
        difficulty: buildSystemSpecificAppearance(difficulty),
        ep: getBaseEPValue(skull),
        failure: buildSystemSpecificAppearance(failure),
        success: buildSystemSpecificAppearance(success),
        complicationsingle: buildSystemSpecificAppearance(complicationsingle),
    }

    await Promise.all([
        query(getObstacleComplications, obstacle.stringid).then((returnedComplications: RawComplication[]) => {
            obstacle.complications = returnedComplications.map(complication => {
                return {
                    ...complication,
                    body: buildSystemSpecificAppearance(complication.body)
                }
            })
        }),
        query(getSkullVariants, obstacle.stringid).then((returnedSkullVariants: any) => obstacle.skullVariants = returnedSkullVariants.map((variant: any) => ({
            ...variant,
            skullValue: variant.skullvalue
        }))),
        query(getObstaclePairs, [obstacle.stringid, 'pairone']).then((returnedPairs: any) => obstacle.pairsOne = returnedPairs),
        query(getObstaclePairs, [obstacle.stringid, 'pairotwo']).then((returnedPairs: any) => obstacle.pairsTwo = returnedPairs)
    ])

    return obstacle
}
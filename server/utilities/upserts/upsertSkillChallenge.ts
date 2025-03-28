import { Response, Error } from '../../interfaces/apiInterfaces'
import { Obstacle, Challenge } from '../../interfaces/skillInterfaces'

import { sendErrorForwardNoFile } from "../sendingFunctions"

const sendErrorForward = sendErrorForwardNoFile('upsert skill challenge')

export default async function upsertSkillChallenge(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, obstacles: Obstacle[], challenges: Challenge[]) {
    upsertObstacles(promiseArray, databaseConnection, beastId, response, obstacles)
    upsertChallenges(promiseArray, databaseConnection, beastId, response, challenges)
}

async function upsertObstacles(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, obstacles: Obstacle[]) {
    await databaseConnection.skill.obstacle.delete([beastId, [0, ...obstacles.map(obstacles => obstacles.id)]]).catch(e => sendErrorForward('delete obstacles', e, response))

    obstacles.forEach((obstacle) => {
        const { id, obstacleid, notes } = obstacle
        if (!id) {
            promiseArray.push(databaseConnection.skill.obstacle.add(beastId, obstacleid, notes).catch(e => sendErrorForward('add obstacles', e, response)))
        }
    })
}

async function upsertChallenges(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, challenges: Challenge[]) {
    await databaseConnection.skill.challenge.delete([beastId, [0, ...challenges.map(challenges => challenges.id)]]).catch((error: Error) => sendErrorForward('delete challenges', error, response))

    challenges.forEach((challenge: Challenge) => {
        const { id, challengeid } = challenge
        if (!id) {
            promiseArray.push(databaseConnection.skill.challenge.add(beastId, challengeid).catch((error: Error) => sendErrorForward('add challenges', error, response)))
        }
    })
}
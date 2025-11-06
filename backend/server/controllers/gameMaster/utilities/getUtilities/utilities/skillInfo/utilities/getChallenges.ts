import query from "../../../../../../../db/database"
import { getMonsterChallenges } from "../../../../../../../db/skill/challenge"
import { getObstacleByName, getObstacleComplications, getObstaclePairs } from "../../../../../../../db/skill/obstacle"
import { Challenge, Obstacle, Complication, Pair } from "../../../../../../../interfaces/skillInterfaces"

export async function getChallenges(beastId: number): Promise<Challenge[]> {
    const challenges = await query(getMonsterChallenges, beastId)

    if (challenges.length > 0) {
        return Promise.all(challenges.map(async (challenge: Challenge) => {
            const obstacles = await getObstacleFromChallengeFlowchart(challenge.flowchart)
            return {
                ...challenge,
                obstacles
            }
        }))
    }

    return []
}

async function getObstacleFromChallengeFlowchart(flowchart: string) {
    let obstaclesArray: string[] = []

    let currentObstacleName = ""
    let isTracking = false

    flowchart.split('').forEach(letter => {
        if (letter === ')' || letter === ']' || letter === '}') {
            isTracking = false
            obstaclesArray.push(currentObstacleName)
            currentObstacleName = ""
        } else if (isTracking) {
            currentObstacleName += letter
        }
        if (letter === '(' || letter === '[' || letter === '{') {
            isTracking = true
        }
    })

    let obstacles: { [key: string]: Obstacle } = {}

    await Promise.all(obstaclesArray.map(async (obstacleName: string) => {
        let [obstacle]: Obstacle[] = await query(getObstacleByName, obstacleName)

        if (obstacle) {
            let promiseArray: any[] = []

            let complications: Complication[] | undefined;
            promiseArray.push(query(getObstacleComplications, obstacle.stringid).then((returnedComplications: any) => complications = returnedComplications))

            let pairsOne: Pair[] | undefined;
            promiseArray.push(query(getObstaclePairs, [obstacle.stringid, 'pairone']).then((returnedPairs: any) => pairsOne = returnedPairs))
            let pairsTwo: Pair[] | undefined;
            promiseArray.push(query(getObstaclePairs, [obstacle.stringid, 'pairtwo']).then((returnedPairs: any) => pairsTwo = returnedPairs))

            await Promise.all(promiseArray)
            obstacles[obstacleName] = {
                ...obstacle,
                pairsOne,
                pairsTwo,
                complications
            }
        }

        return true
    }))

    return obstacles
}
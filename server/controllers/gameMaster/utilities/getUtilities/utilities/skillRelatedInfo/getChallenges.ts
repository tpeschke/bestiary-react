import { Challenge, Obstacle, Complication, Pair } from "../../../../../../interfaces/skillInterfaces"

export async function getChallenges(databaseConnection: any, beastId: number): Promise<Challenge[]> {
    const challenges = await databaseConnection.skill.challenge.get(beastId)

    if (challenges.length > 0) {
        return Promise.all(challenges.map(async (challenge: Challenge) => {
            const obstacles = await getObstacleFromChallengeFlowchart(databaseConnection, challenge.flowchart)
            return {
                ...challenge,
                obstacles
            }
        }))
    }

    return []
}

async function getObstacleFromChallengeFlowchart(databaseConnection: any, flowchart: string) {
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
        let [obstacle]: Obstacle[] = await databaseConnection.skill.obstacle.getByName(obstacleName)

        if (obstacle) {
            let promiseArray: any[] = []

            let complications: Complication[] | undefined;
            promiseArray.push(databaseConnection.skill.obstacle.getComplications(obstacle.stringid).then((returnedComplications: any) => complications = returnedComplications))

            let pairsOne: Pair[] | undefined;
            promiseArray.push(databaseConnection.skill.obstacle.getPairs(obstacle.stringid, 'pairone').then((returnedPairs: any) => pairsOne = returnedPairs))
            let pairsTwo: Pair[] | undefined;
            promiseArray.push(databaseConnection.skill.obstacle.getPairs(obstacle.stringid, 'pairtwo').then((returnedPairs: any) => pairsTwo = returnedPairs))

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
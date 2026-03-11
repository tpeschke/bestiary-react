import { Challenge, Complication, Obstacle, Pair } from "@bestiary/common/interfaces/obstacles/obstacleCatalog"
import query from "../../../../../../../../db/database"
import { getMonsterChallenges } from "../../../../../../../../db/skill/challenge"
import getObstacleFromChallengeFlowchart from "@bestiary/common/utilities/get/getObstaclesFromChallengeFlowchart"

const getObstacleByName = `select * from obBase o
where name = $1`

const getObstacleComplications = `select * from obComplications
where stringID = $1
order by index asc`

const getObstaclePairs = `select * from obPairs
where stringID = $1 and type = $2
order by index asc`

export async function getChallenges(beastId: number): Promise<Challenge[]> {
    const challenges = await query(getMonsterChallenges, beastId)

    if (challenges.length > 0) {
        return Promise.all(challenges.map(async (challenge: Challenge) => {
            const obstaclesArray = getObstacleFromChallengeFlowchart(challenge.flowchart)
            const obstacles = await getObstaclesObject(obstaclesArray)
            return {
                ...challenge,
                obstacles
            }
        }))
    }

    return []
}

export async function getObstaclesObject(obstaclesArray: string[]) {
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
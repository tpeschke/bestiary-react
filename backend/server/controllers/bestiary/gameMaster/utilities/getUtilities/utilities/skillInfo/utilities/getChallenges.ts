import { Challenge, Complication, Obstacle, Pair } from "@bestiary/common/interfaces/obstacles/obstacleCatalog"
import query from "../../../../../../../../db/database"
import { getMonsterChallenges, getObstacleComplications, getObstaclePairs } from "../../../../../../../../db/skill/challenge"
import getObstacleFromChallengeFlowchart from "@bestiary/common/utilities/get/getObstaclesFromChallengeFlowchart"

const getObstacleByName = `select * from obBase o
where name = $1`

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
        let [obstacle]: Obstacle[] = await query(getObstacleByName, getObstacleName(obstacleName))

        if (obstacle) {
            let promiseArray: any[] = []

            let complications: Complication[] | undefined;
            promiseArray.push(query(getObstacleComplications, obstacle.stringid).then((returnedComplications: any) => complications = returnedComplications))

            let pairsOne: Pair[] | undefined;
            promiseArray.push(query(getObstaclePairs, [obstacle.stringid, 'pairone']).then((returnedPairs: any) => pairsOne = returnedPairs))
            let pairsTwo: Pair[] | undefined;
            promiseArray.push(query(getObstaclePairs, [obstacle.stringid, 'pairtwo']).then((returnedPairs: any) => pairsTwo = returnedPairs))

            await Promise.all(promiseArray)
            obstacles[getLabel(obstacleName)] = {
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

function getLabel(fullLabel: string) {
    if (fullLabel.includes('/')) {
        const [label, _] = fullLabel.split('/')
        return label
    }
    return fullLabel
}

function getObstacleName(name: string) {
    if (name.includes('/')) {
        const [_, obstacle] = name.split('/')
        return obstacle
    }
    return name
}
import { Challenge, Obstacle, RawObstacle } from "@bestiary/common/interfaces/obstacles/obstacleCatalog"
import query from "../../../../../../../../db/database"
import { getMonsterChallenges } from "../../../../../../../../db/skill/challenge"
import getObstacleFromChallengeFlowchart from "@bestiary/common/utilities/get/getObstaclesFromChallengeFlowchart"
import { formatRawObstacle } from "../../../../../../../obstacleIndex/obstacles/get"

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
        let [rawObstacle]: RawObstacle[] = await query(getObstacleByName, getObstacleName(obstacleName))

        if (rawObstacle) {
            const obstacle = await formatRawObstacle(rawObstacle)
            obstacles[getLabel(obstacleName)] = obstacle
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
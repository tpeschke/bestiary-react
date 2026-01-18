import query from "../../../../../../../../db/database";
import { getMonsterObstacles, getObstacleComplications, getObstaclePairs } from "../../../../../../../../db/skill/obstacle";
import { Obstacle, Complication, Pair } from "../../../../../../../../interfaces/skillInterfaces";


export async function getObstacles(beastId: number): Promise<Obstacle[]> {
    let obstacles: Obstacle[] = await query(getMonsterObstacles, beastId)

    return Promise.all(obstacles.map(async (obstacle: Obstacle): Promise<Obstacle> => {
        let promiseArray: any[] = []

        let complications: Complication[] | undefined;
        promiseArray.push(query(getObstacleComplications, obstacle.stringid).then((returnedComplications: any) => complications = returnedComplications))

        let pairsOne: Pair[] | undefined;
        promiseArray.push(query(getObstaclePairs, [obstacle.stringid, 'pairone']).then((returnedPairs: any) => pairsOne = returnedPairs))
        let pairsTwo: Pair[] | undefined;
        promiseArray.push(query(getObstaclePairs, [obstacle.stringid, 'pairotwo']).then((returnedPairs: any) => pairsTwo = returnedPairs))

        await Promise.all(promiseArray)
        return {
            ...obstacle,
            pairsOne,
            pairsTwo,
            complications
        }
    }))
}
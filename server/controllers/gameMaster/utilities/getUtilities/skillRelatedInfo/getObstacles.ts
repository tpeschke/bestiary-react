import { Obstacle, Complication, Pair } from "../../../../../interfaces/skillInterfaces";

export async function getObstacles(databaseConnection: any, beastId: number): Promise<Obstacle[]> {
    let obstacles: Obstacle[] = await databaseConnection.skill.obstacle.get(beastId)

    return Promise.all(obstacles.map(async (obstacle: Obstacle): Promise<Obstacle> => {
        let promiseArray: any[] = []

        let complications: Complication[] | undefined;
        promiseArray.push(databaseConnection.skill.obstacle.getComplications(obstacle.stringid).then(returnedComplications => complications = returnedComplications))

        let pairsOne: Pair[] | undefined;
        promiseArray.push(databaseConnection.skill.obstacle.getPairs(obstacle.stringid, 'pairone').then(returnedPairs => pairsOne = returnedPairs))
        let pairsTwo: Pair[] | undefined;
        promiseArray.push(databaseConnection.skill.obstacle.getPairs(obstacle.stringid, 'pairtwo').then(returnedPairs => pairsTwo = returnedPairs))

        await Promise.all(promiseArray)
        return {
            ...obstacle,
            pairsOne,
            pairsTwo,
            complications
        }
    }))
}
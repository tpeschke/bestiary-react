import query from "../../../db/database"

const updateDifficultySQL = `update obBase
set difficulty = $1
where id = $2`

export default async function updateDifficulty(obstacleId: number, difficulty: string) {
    return query(updateDifficultySQL, [difficulty, obstacleId])
}
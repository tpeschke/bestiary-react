import query from "../../../db/database"

const updateSkullSQL = `update obBase
set skull = $1
where id = $2`

export default async function updateSkull(obstacleId: number, skull: number) {
    return query(updateSkullSQL, [skull, obstacleId])
}
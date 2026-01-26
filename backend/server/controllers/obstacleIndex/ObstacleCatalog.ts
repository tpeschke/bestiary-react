import query from "../../db/database"
import { Request, Response } from "../../interfaces/apiInterfaces"
import { Obstacle, ObstacleTile } from '@bestiary/common/interfaces/obstacles/obstacleCatalog'

import { checkForContentTypeBeforeSending } from '../../utilities/sendingFunctions'
import { isOwner } from "../../utilities/ownerAccess"
import updateBasicObstacleInfo from "./updateUtilities/updateBasicObstacleInfo"
import updateComplications from "./updateUtilities/updateComplications"

let catalogCache: ObstacleTile[][] = []
let newCache: ObstacleTile[][] = []

export async function getObstacleCatalog(_: Request, response: Response) {
    checkForContentTypeBeforeSending(response, catalogCache)
}

export async function collectObstacleCatalog() {
    collectCache(0)
}

const getCatalogTileByLetter = `select 
	* 
from 
	(
		(select id as obstacleID, null as challengeID, name from obBase)
		union
		(select null as obstacleID, id as challengeID, name from obChallenges)
	) 
where 
	UPPER(name) like $1 ||'%'
order by name asc`

async function collectCache(index: number) {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (alphabet[index]) {
        let tiles: ObstacleTile[] = await query(getCatalogTileByLetter, alphabet[index])
        if (tiles.length > 0) { newCache.push(tiles) }

        collectCache(++index)
    } else {
        catalogCache = newCache
        newCache = []
        console.log('---------------------------------- ')
        console.log('--- Obstacle Catalog Collected --- ')
        console.log('---------------------------------- ')
    }
}

interface saveRequest extends Request {
    body: Obstacle
}

export async function saveObstacle(request: saveRequest, response: Response) {
    const { user } = request
    let { body: obstacle } = request

    if (isOwner(user?.id)) {
        const { id: obstacleId, complications, stringid } = obstacle

        await Promise.all([
            updateBasicObstacleInfo(obstacleId, obstacle),
            updateComplications(stringid, complications)
        ])

        collectObstacleCatalog()

        checkForContentTypeBeforeSending(response, { obstacleId })
    } else {
        checkForContentTypeBeforeSending(response, { color: 'red', message: "You Can't Edit Obstacles", type: 'message' })
    }
}
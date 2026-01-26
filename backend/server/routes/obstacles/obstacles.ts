// @ts-ignore
import express from 'express'
import { getObstaclesById } from '../../controllers/obstacleIndex/obstacles'
import { saveObstacle } from '../../controllers/obstacleIndex/ObstacleCatalog'

const obstacleRoutes = express.Router()

obstacleRoutes.get('/:obstacleId', getObstaclesById)
obstacleRoutes.post('/save', saveObstacle)

export default obstacleRoutes
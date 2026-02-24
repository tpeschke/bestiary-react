// @ts-ignore
import express from 'express'
import { getObstaclesById } from '../../controllers/obstacleIndex/obstacles/get'
import { saveObstacle } from '../../controllers/obstacleIndex/ObstacleCatalog'
import { searchObstacle } from '../../controllers/obstacleIndex/obstacles/search'

const obstacleRoutes = express.Router()

obstacleRoutes.get('/:obstacleId', getObstaclesById)
obstacleRoutes.get('/search/:searchString', searchObstacle)

obstacleRoutes.post('/save', saveObstacle)

export default obstacleRoutes
// @ts-ignore
import express from 'express'
import { getObstaclesById } from '../../controllers/obstacleIndex/obstacles/get'
import { saveObstacle } from '../../controllers/obstacleIndex/ObstacleCatalog'
import { searchObstacle } from '../../controllers/obstacleIndex/obstacles/search'
import { searchCatalog } from '../../controllers/obstacleIndex/searchCatalog'

const obstacleRoutes = express.Router()

obstacleRoutes.get('/search/:searchString', searchObstacle)
obstacleRoutes.get('/indexSearch', searchCatalog)
obstacleRoutes.get('/:obstacleId', getObstaclesById)

obstacleRoutes.post('/save', saveObstacle)

export default obstacleRoutes
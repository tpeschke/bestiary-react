// @ts-ignore
import express from 'express'
import { getObstaclesById, saveObstacle } from '../../controllers/obstacleIndex/obstacles'

const obstacleRoutes = express.Router()

obstacleRoutes.get('/:obstacleId', getObstaclesById)
obstacleRoutes.post('/save', saveObstacle)

export default obstacleRoutes
// @ts-ignore
import express from 'express'
import { getObstaclesById } from '../../controllers/obstacleIndex/obstacles'

const obstacleRoutes = express.Router()

obstacleRoutes.get('/:obstacleId', getObstaclesById)

export default obstacleRoutes
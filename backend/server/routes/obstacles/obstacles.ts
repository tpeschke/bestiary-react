// @ts-ignore
import express from 'express'
import { getObstaclesById } from '../../controllers/obstacleIndex/obstacles'

const obstacles = express.Router()

obstacles.get('/:obstacleId', getObstaclesById)

export default obstacles
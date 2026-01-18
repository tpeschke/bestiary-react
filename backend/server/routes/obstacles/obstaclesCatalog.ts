// @ts-ignore
import express from 'express'
import { getObstacleCatalog } from '../../controllers/obstacleIndex/ObstacleCatalog'

const obstaclesCatalog = express.Router()

obstaclesCatalog.get('/', getObstacleCatalog)

export default obstaclesCatalog
// @ts-ignore
import express from 'express'
import { getCatalog } from '../../controllers/bestiary/catalog'

const obstaclesCatalog = express.Router()

obstaclesCatalog.get('/all', getCatalog)

export default obstaclesCatalog
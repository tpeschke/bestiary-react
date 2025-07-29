// @ts-ignore
import express from 'express'
import { getRandomMonsterFromList } from '../controllers/list'

const listRoutes = express.Router()

listRoutes.get('/random/:listId', getRandomMonsterFromList)

export default listRoutes
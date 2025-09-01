// @ts-ignore
import express from 'express'
import { getLists } from '../controllers/gear/gear'

const gearRoutes = express.Router()

gearRoutes.get('/list', getLists)

export default gearRoutes
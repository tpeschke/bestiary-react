// @ts-ignore
import express from 'express'
import { getCatalog } from '../controllers/catalog'

const catalogRoutes = express.Router()

catalogRoutes.get('/', getCatalog)

export default catalogRoutes
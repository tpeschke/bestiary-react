// @ts-ignore
import express from 'express'
import search from '../controllers/search/search'

const searchRoutes = express.Router()

searchRoutes.get('', search)

export default searchRoutes
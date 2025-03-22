import express from 'express'
import { getPlayerVersionOfBeast } from '../controllers/playerController'

const playerRoutes = express.Router()

playerRoutes.get('/:beastid', getPlayerVersionOfBeast)

export default playerRoutes
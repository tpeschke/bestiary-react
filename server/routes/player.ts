import express from 'express'
import { getPlayerVersionOfBeast } from '../controllers/player'

const playerRoutes = express.Router()

playerRoutes.get('/:beastid', getPlayerVersionOfBeast)

export default playerRoutes
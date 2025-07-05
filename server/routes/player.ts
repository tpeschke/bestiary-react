import express from 'express'
import { getPlayerVersionOfBeast, addPlayerNotes, updateFavoriteStatus } from '../controllers/player'

const playerRoutes = express.Router()

playerRoutes.get('/:beastid', getPlayerVersionOfBeast)

playerRoutes.post('/notes', addPlayerNotes)
playerRoutes.post('/favorite', updateFavoriteStatus)

export default playerRoutes
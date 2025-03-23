import express from 'express'
import { getPlayerVersionOfBeast, addPlayerNotes } from '../controllers/player'

const playerRoutes = express.Router()

playerRoutes.get('/:beastid', getPlayerVersionOfBeast)

playerRoutes.post('/notes', addPlayerNotes)

export default playerRoutes
// @ts-ignore
import express from 'express'

import { checkIfPlayerView, canEditMonster, checkIfLoggedIn, updatePlayerPreference } from '../controllers/access'

const accessRoutes = express.Router()

accessRoutes.get('/isLoggedIn', checkIfLoggedIn)
accessRoutes.get('/playerCanView/:beastId', checkIfPlayerView)
accessRoutes.get('/canEdit/:beastId', canEditMonster)

accessRoutes.post('/updatePreference/:preference', updatePlayerPreference)

export default accessRoutes
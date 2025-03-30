import express from 'express'

import { checkIfPlayerView, canEditMonster, checkIfLoggedIn } from '../controllers/access'

const accessRoutes = express.Router()

accessRoutes.get('/isLoggedIn', checkIfLoggedIn)
accessRoutes.get('/playerCanView/:beastid', checkIfPlayerView)
accessRoutes.get('/canEdit/:beastid', canEditMonster)

export default accessRoutes
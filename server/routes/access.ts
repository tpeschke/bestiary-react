import express from 'express'

import { checkIfPlayerView, canEditMonster } from '../controllers/accessController'

const accessRoutes = express.Router()

accessRoutes.get('/playerCanView/:beastid', checkIfPlayerView)
accessRoutes.get('/canEdit/:beastid', canEditMonster)

export default accessRoutes
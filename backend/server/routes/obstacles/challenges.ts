// @ts-ignore
import express from 'express'
import getChallengesByID from '../../controllers/obstacleIndex/challenges'
import updateChallenge from '../../controllers/obstacleIndex/updateUtilities/updateChallenge'

const challengeRoutes = express.Router()

challengeRoutes.get('/:challengeId', getChallengesByID)

challengeRoutes.post('/save', updateChallenge)

export default challengeRoutes
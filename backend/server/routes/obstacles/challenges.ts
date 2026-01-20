// @ts-ignore
import express from 'express'
import getChallengesByID from '../../controllers/obstacleIndex/challenges'

const challengeRoutes = express.Router()

challengeRoutes.get('/:challengeId', getChallengesByID)

export default challengeRoutes
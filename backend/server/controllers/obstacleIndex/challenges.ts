import query from "../../db/database"
import { Response, Request } from "../../interfaces/apiInterfaces"
import { Challenge } from "../../interfaces/skillInterfaces"
import { sendErrorForwardNoFile, checkForContentTypeBeforeSending } from "../../utilities/sendingFunctions"
import { getObstacleFromChallengeFlowchart } from "../bestiary/gameMaster/utilities/getUtilities/utilities/skillInfo/utilities/getChallenges"

const sendErrorForward = sendErrorForwardNoFile('Single Challenge by ID')

const getChallengesByIdSQL = `select * from obChallenges c
where id = $1`

const getRelatedBeastsSQL = `select s.id, beastID, name from bbSkillBeast s
join bbIndividualBeast b on b.id = s.beastID
where s.challengeID = $1`

interface GetRequest extends Request {
    params: {
        challengeId: string
    }
}

export default async function getChallengesByID(request: GetRequest, response: Response) {
    const challengeId: number = +request.params.challengeId

    const [challenge]: Challenge[] = await query(getChallengesByIdSQL, challengeId)

    if (challenge) {
        await Promise.all([
            getObstacleFromChallengeFlowchart(challenge.flowchart).then(obstacles => challenge.obstacles = obstacles),
            query(getRelatedBeastsSQL, challengeId).then(relatedBeasts => challenge.relatedBeasts = relatedBeasts)
        ])

        checkForContentTypeBeforeSending(response, challenge)
    } else {
        sendErrorForward('404', { message: 'No Challenge Found' }, response)
    }
}
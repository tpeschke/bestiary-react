import { Challenge } from "@bestiary/common/interfaces/obstacles/obstacleCatalog"
import query from "../../db/database"
import { Response, Request } from "../../interfaces/apiInterfaces"
import { checkForContentTypeBeforeSending } from "../../utilities/sendingFunctions"
import { getObstacleFromChallengeFlowchart } from "../bestiary/gameMaster/utilities/getUtilities/utilities/skillInfo/utilities/getChallenges"

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
    const patreon = request.user?.patreon

    if (patreon && patreon < 5) {
        checkForContentTypeBeforeSending(response, { color: 'red', type: 'message', message: 'You Need to Upgrade Your Patreon to View Skill Challenges' })
    } else {
        const challengeId: number = +request.params.challengeId

        const [challenge]: Challenge[] = await query(getChallengesByIdSQL, challengeId)

        if (challenge) {
            await Promise.all([
                getObstacleFromChallengeFlowchart(challenge.flowchart).then(obstacles => challenge.obstacles = obstacles),
                query(getRelatedBeastsSQL, challengeId).then(relatedBeasts => challenge.relatedBeasts = relatedBeasts)
            ])

            checkForContentTypeBeforeSending(response, challenge)
        } else {
            checkForContentTypeBeforeSending(response, { color: 'red', type: 'message', message: 'No Challenge Found' })
        }

    }
}
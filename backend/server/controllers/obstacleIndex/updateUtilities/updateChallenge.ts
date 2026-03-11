import { Challenge } from "@bestiary/common/interfaces/obstacles/obstacleCatalog";
import { Response } from "../../../interfaces/apiInterfaces";
import { isOwner } from "../../../utilities/ownerAccess";
import getChallengesByID, { GetChallengeRequest } from "../challenges";
import { checkForContentTypeBeforeSending } from "../../../utilities/sendingFunctions";
import query from "../../../db/database";

interface ChallengeRequest extends GetChallengeRequest {
    body: {
        challengeInfo: Challenge,
    }
}

const updateChallengeSQL = `update obChallenges c
set flowchart = $2
where id = $1`

export default async function updateChallenge(request: ChallengeRequest, response: Response) {
    const { body, user } = request
    const { challengeInfo } = body

    if (isOwner(user?.id)) {
        await query(updateChallengeSQL, [challengeInfo.id, challengeInfo.flowchart])

        request.params.challengeId = `${challengeInfo.id}`
        getChallengesByID(request, response)
    } else {
        checkForContentTypeBeforeSending(response, { color: 'red', message: "You don't own this entry so can't edit it", type: 'message' })
    }
}
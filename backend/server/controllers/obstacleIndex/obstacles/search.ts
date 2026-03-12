import getAccessLevel, { PLAYER } from "@bestiary/common/utilities/get/getAccessLevel";
import query from "../../../db/database";
import { Response, Request } from "../../../interfaces/apiInterfaces"
import { checkForContentTypeBeforeSending } from "../../../utilities/sendingFunctions";

interface GetRequest extends Request {
    params: {
        searchString: string
    }
}

const searchObstaclesByName = `select b.id as obstacleID, name as obstacleName from obSkullVariant sk
right join obBase b on b.stringID = sk.stringID 
where Upper(body) like Upper(( '%' || $1 || '%' )) or Upper(name) like Upper(( '%' || $1 || '%' ))
group by b.id
order by name;`

export async function searchObstacle(request: GetRequest, response: Response) {
    const patreon = getAccessLevel(request.user)
    const searchString = request.params.searchString

    if (patreon === PLAYER) {
        checkForContentTypeBeforeSending(response, { color: 'red', type: 'message', message: 'You Need to Upgrade Your Ko-Fi to View Obstacles' })
    } else {
        checkForContentTypeBeforeSending(response, await query(searchObstaclesByName, searchString))
    }
}
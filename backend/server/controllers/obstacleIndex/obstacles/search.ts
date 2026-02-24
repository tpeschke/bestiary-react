import query from "../../../db/database";
import { Response, Request } from "../../../interfaces/apiInterfaces"
import { checkForContentTypeBeforeSending } from "../../../utilities/sendingFunctions";

interface GetRequest extends Request {
    params: {
        searchString: string
    }
}

const searchObstaclesByName = `select b.id as id, name as obstaclename from obskullvariant sk
join obbase b on b.stringid = sk.stringid 
where Upper(body) like Upper(( '%' || $1 || '%' )) or Upper(name) like Upper(( '%' || $1 || '%' ));`

export async function searchObstacle(request: GetRequest, response: Response) {
    const patreon = request.user?.patreon
    const searchString = +request.params.searchString

    if (patreon && patreon < 5) {
        checkForContentTypeBeforeSending(response, { color: 'red', type: 'message', message: 'You Need to Upgrade Your Patreon to View Obstacles' })
    } else if (patreon && patreon >= 5) {
        checkForContentTypeBeforeSending(response, await query(searchObstaclesByName, searchString))
    }
}
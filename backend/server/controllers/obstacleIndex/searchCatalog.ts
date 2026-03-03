import query from '../../db/database'
import { Request, Response } from '../../interfaces/apiInterfaces'
import { checkForContentTypeBeforeSending } from '../../utilities/sendingFunctions'

interface SearchRequest extends Request {
    query: SearchQuery
}

export interface SearchQuery {
    keyword?: string,
    type?: 'o' | 'c',
}

const searchJustObstaclesInCatalogSQL = `select b.id as obstacleID, b.name from obSkullVariant sk
full join obBase b on b.stringID = sk.stringID
full join obComplications c on c.stringID = b.stringID
where 
	Upper(sk.body) like Upper(( '%' || $1 || '%' )) 
	or Upper(b.name) like Upper(( '%' || $1 || '%' ))
	or Upper(c.body) like Upper(( '%' || $1 || '%' ))
group by b.id
order by b.name`

const searchJustChallengesInCatalogSQL = `select ch.id as challengeID, ch.name from obChallenges ch
where
	Upper(ch.name) like Upper(( '%' || $1 || '%' )) 
	or Upper(ch.notes) like Upper(( '%' || $1 || '%' ))
group by ch.id
order by ch.name`

const searchEntireCatalogSQL = `select * from
(
select b.id as obstacleID, 0 as challengeID, b.name from obSkullVariant sk
full join obBase b on b.stringID = sk.stringID
full join obComplications c on c.stringID = b.stringID
where 
	Upper(sk.body) like Upper(( '%' || $1 || '%' )) 
	or Upper(b.name) like Upper(( '%' || $1 || '%' ))
	or Upper(c.body) like Upper(( '%' || $1 || '%' ))
) union (
select 0 as obstacleID, ch.id as challengeID, ch.name from obChallenges ch
where
	Upper(ch.name) like Upper(( '%' || $1 || '%' )) 
	or Upper(ch.notes) like Upper(( '%' || $1 || '%' ))
)
order by name asc`

export async function searchCatalog(request: SearchRequest, response: Response) {
    const { keyword, type } = request.query

    if (!keyword) {
        checkForContentTypeBeforeSending(response, [])
    } else if (type === 'o') {
        checkForContentTypeBeforeSending(response, await query(searchJustObstaclesInCatalogSQL, keyword))
    } else if (type === 'c') {
        checkForContentTypeBeforeSending(response, await query(searchJustChallengesInCatalogSQL, keyword))
    } else {
        checkForContentTypeBeforeSending(response, await query(searchEntireCatalogSQL, keyword))
    }
}
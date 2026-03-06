import query from "../../../../../../../db/database"
import { EditReaction } from "../../../../../../../interfaces/bestiary/encounterInterfaces"

const updateReactionInfo = `update bbReaction set temperament = $2 where beastID = $1`

const addReactionInfo = 'insert into bbReaction (beastID, temperament) values ($1, $2)'

export default async function updateReaction(beastId: number, reaction: EditReaction): Promise<any> {
    if (reaction.id) {
        return query(updateReactionInfo, [beastId, reaction.temperament])
    }

    return query(addReactionInfo, [beastId, reaction.temperament])
}
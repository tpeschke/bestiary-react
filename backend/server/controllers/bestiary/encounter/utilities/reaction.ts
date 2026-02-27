import query from "../../../../db/database"
import { Reaction, ReactionTemperamentOptions } from "../../../../interfaces/bestiary/encounterInterfaces"
import rollDice from "../../../../utilities/diceRoller"

const getReactionInfo = `select *, '' as result from bbReaction where beastID = $1`

export default async function getReaction(beastId: number): Promise<Reaction> {
    const [reaction]: Reaction[] = await query(getReactionInfo, beastId)

    if (reaction) {
        return {
            temperament: reaction.temperament,
            result: getResult(reaction.temperament)
        }
    }
    return {
        temperament: 'Hostile',
        result: getResult('Hostile')
    }
}

function getResult(temperament: ReactionTemperamentOptions) {
    const result = getRoll(temperament)

    switch (result) {
        case 1:
        case 2:
            return 'Immediate fight'
        case 3:
            return 'Threaten, raise alarm'
        case 4:
            return 'Threaten, leaning towards fight'
        case 5:
            return 'Hostile, prepare to fight, deceive'
        case 6:
            return 'Suspicious, monitoring'
        case 7:
            return 'Holding back, curious'
        case 8:
            return 'Curious, waiting'
        case 9:
            return 'Curious, engaging'
        case 10:
            return 'Questioning, exploring'
        case 11:
            return 'Helpful'
        case 12:
            return 'Bargain, allying with'
        default:
            return 'Something Went Wrong'
    }
}

function getRoll(temperament: ReactionTemperamentOptions): number {
    let results: number[] = []

    switch (temperament) {
        case 'Friendly':
            results = [rollDice('d6'), rollDice('d6'), rollDice('d6')].sort()
            return results[1] + results[2]
        case 'Hostile':
            results = [rollDice('d6'), rollDice('d6'), rollDice('d6')].sort()
            return results[0] + results[1]
        case 'Neutral':
            return rollDice('d6') + rollDice('d6')
        case 'Unpredictable':
            return rollDice('d12')
    }
}
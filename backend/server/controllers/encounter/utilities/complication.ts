import query from "../../../db/database";
import { getEncounterBackUp, getRivalForEncounter } from "../../../db/encounter/complication";
import { Complication, RivalComplication, Rival, WoundedComplication, LostComplication, BackUp, BackUpComplication } from "../../../interfaces/encounterInterfaces";
import { grabRandomElementFromArray } from "../../../utilities/array";
import rollDice from "../../../utilities/diceRoller";

export default async function getComplications(beastId: number): Promise<Complication[]> {
    const hasComplication = Math.floor(Math.random() * 10) > 5

    let complicationResultArray: Complication[] = []

    if (hasComplication) {
        await getComplication(complicationResultArray, beastId)
    }

    return complicationResultArray
}

async function getComplication(complicationResultArray: Complication[], beastId: number) {
    const complication: string = grabRandomElementFromArray(complicationArray)

    switch (complication) {
        case RIVAL:
        case UNLIKELY_ALLIES:
            complicationResultArray.push(await getRival(beastId, complication))
            break;
        case WOUNDED:
            complicationResultArray.push(await getWounded(beastId))
            break;
        case LOST:
            complicationResultArray.push(getLost())
            break;
        case BACK_UP_COMING:
            const backUp = await getBackUp(beastId)
            if (backUp) {
                complicationResultArray.push(backUp)
            }
            break;
        case TRAPPED:
        case INSANE:
        case DISEASED:
        case TIME_LIMIT:
        case POWERFUL_CASTER:
        case INFIGHTING:
        case LARGE:
        case ENCHANTED_ITEM:
            complicationResultArray.push({ type: complication })
            break;
        case ROLL_AN_ADDITIONAL_TIME:
            await getComplication(complicationResultArray, beastId)
            await getComplication(complicationResultArray, beastId)
            break;
        default:
            break;
    }

    return true
}

const RIVAL = 'Rival'
const WOUNDED = 'Wounded'
const TRAPPED = 'Trapped'
const INSANE = 'Insane'
const LOST = 'Lost'
const DISEASED = 'Diseased'
const TIME_LIMIT = 'Time Limit'
const BACK_UP_COMING = 'Back Up Coming'
const POWERFUL_CASTER = 'Powerful Weird-Adept or Servant'
const INFIGHTING = 'Infighting'
const ROLL_AN_ADDITIONAL_TIME = 'Roll an Additional Time'
const LARGE = 'Large (50% more Vitality)'
const UNLIKELY_ALLIES = 'Unlikely Allies'
const ENCHANTED_ITEM = 'Enchanted Item'

const complicationArray = [RIVAL, WOUNDED, TRAPPED, INSANE, LOST, DISEASED, TIME_LIMIT, BACK_UP_COMING, POWERFUL_CASTER, INFIGHTING, ROLL_AN_ADDITIONAL_TIME, LARGE, UNLIKELY_ALLIES, ENCHANTED_ITEM]

async function getRival(beastId: number, type: string): Promise<RivalComplication> {
    const [rival]: Rival[] = await query(getRivalForEncounter, beastId)
    console.log(rival)
    if (rival) {
        if (rival?.name && rival?.name.includes(',')) {
            const splitName = rival.name.split(', ')
            rival.name = `${splitName[1]} ${splitName[0]}`
        }
        if (!rival?.plural) {
            rival.plural = rival.name += 's'
        }

        return {
            type,
            actors: rival
        }
    }

    return {
        type,
        actors: {
            id: beastId,
            name: "Rival of the Same Entry",
            plural: "Rival of the Same Entry",
            number: "d6"
        }
    }
}

async function getWounded(beastId: number): Promise<WoundedComplication> {
    const [rival]: Rival[] = await query(getRivalForEncounter, beastId)
    const woundCategories = ['Hurt', 'Bloodied', 'Wounded', 'Bleeding Out']
    return {
        type: WOUNDED,
        byWhom: rival,
        amount: grabRandomElementFromArray(woundCategories)
    }
}

function getLost(): LostComplication {
    return { type: LOST, distance: `${rollDice('10d10')} Miles` }
}

async function getBackUp(beastId: number): Promise<BackUpComplication | null> {
    const [backUp]: BackUp[] = await query(getEncounterBackUp, beastId)

    if (backUp) {
        const { id, name, plural } = backUp

        let rank: string = '';
        let rankPlural: string = '';
        if (plural && rank && rank.toUpperCase() === 'NONE') {
            rank = name
            rankPlural = plural
        } else if (!plural && rank && rank.toUpperCase() === 'NONE') {
            rank = name
            rankPlural = rank += 's'
        } else if (!plural && rank && rank.toUpperCase() !== 'NONE') {
            rankPlural = rank += 's'
        }


        return {
            id, name, plural, rank, rankPlural,
            type: BACK_UP_COMING,
            time: `In ${rollDice('30d2')} Seconds`
        }
    }
    return null;
}
import { ObjectiveObject } from "../../../interfaces/encounterInterfaces"

import { grabRandomElementFromArray } from "../../../utilities/array"

export default function getObjectives(): ObjectiveObject {
    return {
        player: getObjective(),
        enemy: getObjective()
    }
}

function getObjective(): string {
    let verb = grabRandomElementFromArray(verbs)
    let target = grabRandomElementFromArray(targets)
    let timeLimit = grabRandomElementFromArray(timeLimits)

    if (!!verb.person) { verb = verb[target.type] }

    if (verb.includes('X')) {
        const secondTarget = grabRandomElementFromArray(targets)
        verb = verb.replace('X', target.target).replace('Y', secondTarget.target)

        return `${verb} ${timeLimit}`
    } else {
        return `${verb} ${target.target} ${timeLimit}`
    }
}

const ROUTE = 'Route'
    , DESTROY = {
        item: 'Destroy',
        person: 'Kill'
    }
    , DEFEND = 'Defend'
    , TAKE_AND_HOLD = 'Take & Hold'
    , BRING_X_TO_Y = 'Bring X to Y'
    , KEEP_X = {
        item: 'Keep X Intact',
        person: 'Keep X Alive'
    }

const verbs = [ROUTE, DESTROY, DEFEND, TAKE_AND_HOLD, BRING_X_TO_Y, KEEP_X]

const ALL_ENEMIES = {
    target: 'All Enemies',
    type: 'person'
}
    , SPECIFIC_ENEMY = {
        target: 'Specific Enemy',
        type: 'person'
    }
    , CAPTAIN = {
        target: 'Captain',
        type: 'person'
    }
    , ITEM = {
        target: 'Item',
        type: 'item'
    }
    , ZONE = {
        target: 'Zone',
        type: 'item'
    }
    , ALLIES = {
        target: 'Ally',
        type: 'person'
    }

const targets = [ALL_ENEMIES, SPECIFIC_ENEMY, CAPTAIN, ITEM, ZONE, ALLIES]

const NONE = 'In Any Number of Seconds'
    , UNDER = 'Under Time Limit'
    , LONGER = 'For Longer Than Time Limit'
    , BEFORE = 'Before Other Side Completes Their Objective'

const timeLimits = [NONE, UNDER, LONGER, BEFORE]
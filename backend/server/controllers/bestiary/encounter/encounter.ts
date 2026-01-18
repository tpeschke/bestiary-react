import query from '../../../db/database';
import { getNumberOfMonstersWeighted } from '../../../db/encounter/number';
import { BasicParamsRequest, Response } from '../../../interfaces/apiInterfaces'
import { Complication, Encounter, SignObject, Temperament } from '../../../interfaces/bestiary/encounterInterfaces';

import { checkForContentTypeBeforeSending } from '../../../utilities/sendingFunctions';
import getBattlefieldAndPattern from './utilities/battlefield';
import getComplications from './utilities/complication';
import getGroupInfo from './utilities/groupInfo';
import getDistanceFromLair from './utilities/lair';
import getNoun from './utilities/noun';
import getObjectives from './utilities/objective';
import getSigns from './utilities/sign';
import getTemperament from './utilities/temperament';
import getTime from './utilities/time';
import getVerb from './utilities/verb';

interface NumbersReturn {
    numbers: string,
    miles: string
}

export default async function getRandomEncounter(request: BasicParamsRequest, response: Response) {
    let promiseArray: any[] = []
    let encounterObject: Encounter = {}
    const beastId = +request.params.beastId

    promiseArray.push(getVerb(beastId).then((verb: string) => encounterObject.verb = verb))
    promiseArray.push(getNoun(beastId).then((noun: string) => encounterObject.noun = noun))
    promiseArray.push(getTemperament(beastId).then((temperament: Temperament) => encounterObject.temperament = temperament))
    promiseArray.push(getSigns(beastId).then((signs: SignObject) => encounterObject.signs = signs))
    promiseArray.push(getComplications(beastId).then((complications: Complication[]) => encounterObject.complications = complications))

    encounterObject.time = getTime()
    encounterObject.objectives = getObjectives()
    encounterObject.battlefield = getBattlefieldAndPattern()

    const [numbersReturn]: NumbersReturn[] = await query(getNumberOfMonstersWeighted, beastId)

    if (numbersReturn) {
        const { numbers, miles } = numbersReturn

        encounterObject.milesFromLair = getDistanceFromLair(miles)
        encounterObject.group = await getGroupInfo(beastId, numbers)
    } else {
        encounterObject.milesFromLair = getDistanceFromLair("d10")
        encounterObject.group = await getGroupInfo(beastId, "d4 * 2")
    }

    Promise.all(promiseArray).then(_ => {
        checkForContentTypeBeforeSending(response, encounterObject)
    })
}
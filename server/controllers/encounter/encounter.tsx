import { Request, Response } from '../../interfaces/apiInterfaces'
import { Complication, Encounter, SignObject, Temperament } from '../../interfaces/encounterInterfaces';

import getDatabaseConnection from "../../utilities/databaseConnection";
import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../../utilities/sendingFunctions';
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

const sendErrorForward = sendErrorForwardNoFile('encounter controller')

interface NumbersReturn {
    numbers: string,
    miles: string
}

export default async function getRandomEncounter(request: Request, response: Response) {
    const databaseConnection = getDatabaseConnection(request)
    let promiseArray: any[] = []
    let encounterObject: Encounter = { }
    const beastId = +request.params.beastId

    function sendErrorForwardWithResponse(response) {
        return (location: string, e: Error) => sendErrorForward(location, e, response)
    }

    promiseArray.push(getVerb(databaseConnection, beastId, sendErrorForwardWithResponse(response)).then((verb: string) => encounterObject.verb = verb))
    promiseArray.push(getNoun(databaseConnection, beastId, sendErrorForwardWithResponse(response)).then((noun: string) => encounterObject.noun = noun))
    promiseArray.push(getTemperament(databaseConnection, beastId, sendErrorForwardWithResponse(response)).then((temperament: Temperament) => encounterObject.temperament = temperament))
    promiseArray.push(getSigns(databaseConnection, beastId, sendErrorForwardWithResponse(response)).then((signs: SignObject) => encounterObject.signs = signs))
    promiseArray.push(getComplications(databaseConnection, beastId).then((complications: Complication[]) => encounterObject.complications = complications))

    encounterObject.time = getTime()
    encounterObject.objectives = getObjectives()
    encounterObject.battlefield = getBattlefieldAndPattern()
    
    const [numbersReturn]: NumbersReturn[] = await databaseConnection.encounter.number.getWeighted(beastId)
    const { numbers, miles } = numbersReturn

    encounterObject.milesFromLair = getDistanceFromLair(miles)
    encounterObject.group = await getGroupInfo(databaseConnection, beastId, numbers)

    checkForContentTypeBeforeSending(response, encounterObject)
}
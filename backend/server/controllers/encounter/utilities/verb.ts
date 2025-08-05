import { Error } from '../../../interfaces/apiInterfaces'
import { Verb } from "../../../interfaces/encounterInterfaces"

export default async function getVerb(dataBaseConnection: any, beastId: number, sendErrorForward: Function): Promise<string> {
    const [verb]: Verb[] = await dataBaseConnection.encounter.verb.getWeighted(beastId).catch((e: Error) => sendErrorForward('verb weighted', e))
    if (verb) {
        return verb.verb
    }
    return 'N/A'
}
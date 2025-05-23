import { Verb } from "../../../interfaces/encounterInterfaces"

export default async function getVerb(dataBaseConnection: any, beastId: number, sendErrorForward: Function): Promise<string> {
    const [verb]: Verb[] = await dataBaseConnection.encounter.verb.getWeighted(beastId).catch(e => sendErrorForward('verb weighted', e))
    return verb.verb
}
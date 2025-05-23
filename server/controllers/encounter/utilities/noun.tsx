import { Noun } from "../../../interfaces/encounterInterfaces"

export default async function getNoun(dataBaseConnection: any, beastId: number, sendErrorForward: Function): Promise<string> {
    const [noun]: Noun[] = await dataBaseConnection.encounter.noun.getWeighted(beastId).catch(e => sendErrorForward('noun weighted', e))
    return noun.noun
}
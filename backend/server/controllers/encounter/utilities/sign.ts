import { Error } from '../../../interfaces/apiInterfaces'
import { Sign, SignObject } from "../../../interfaces/encounterInterfaces"

export default async function getSigns(dataBaseConnection: any, beastId: number, sendErrorForward: Function): Promise<SignObject> {
    const [beastSign]: Sign[] = await dataBaseConnection.encounter.sign.getWeighted(beastId).catch((e: Error) => sendErrorForward('sign weighted', e))
    const allSigns: Sign[] = await dataBaseConnection.encounter.sign.getAllOrderedByWeight(beastId).catch((e: Error) => sendErrorForward('all signs', e))

    return {
        beastSign,
        allSigns
    }
}
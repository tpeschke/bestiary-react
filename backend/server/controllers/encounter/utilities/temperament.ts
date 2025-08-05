import { Error } from '../../../interfaces/apiInterfaces'
import { Temperament } from "../../../interfaces/encounterInterfaces"

export default async function getTemperament(dataBaseConnection: any, beastId: number, sendErrorForward: Function): Promise<Temperament> {
    const [temperament]: Temperament[] = await dataBaseConnection.encounter.temperament.getWeighted(beastId).catch((e: Error) => sendErrorForward('temperament weighted', e))
    if (temperament) {
        return {
            temperament: temperament.temperament,
            tooltip: temperament.tooltip
        }
    }
    return {
        temperament: '!',
        tooltip: '!'
    }
}
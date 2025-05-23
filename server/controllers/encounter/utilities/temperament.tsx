import { Temperament } from "../../../interfaces/encounterInterfaces"

export default async function getTemperament(dataBaseConnection: any, beastId: number, sendErrorForward: Function): Promise<Temperament> {
    const [temperament]: Temperament[] = await dataBaseConnection.encounter.temperament.getWeighted(beastId).catch(e => sendErrorForward('temperament weighted', e))
    return {
        temperament: temperament.temperament,
        tooltip: temperament.tooltip
    }
}
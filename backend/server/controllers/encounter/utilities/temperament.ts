import query from "../../../db/database"
import { getWeightedTemperament } from "../../../db/encounter/temperament"
import { Temperament } from "../../../interfaces/encounterInterfaces"

export default async function getTemperament(beastId: number): Promise<Temperament> {
    const [temperament]: Temperament[] = await query(getWeightedTemperament, beastId)
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
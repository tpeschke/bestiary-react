import { Sign, SignObject } from "@bestiary/common/interfaces/encounterInterfaces"
import query from "../../../../db/database"
import { getAllSignsOrderedByWeight, getWeightedSign } from "../../../../db/encounter/sign"

export default async function getSigns(beastId: number): Promise<SignObject> {
    const [beastSign]: Sign[] = await query(getWeightedSign, beastId)
    const allSigns: Sign[] = await query(getAllSignsOrderedByWeight, beastId)

    return {
        beastSign,
        allSigns
    }
}
import { SystemOption } from "../../../../../interfaces/beast/beast"
import getModBySkullIndex from "../../../getModBySkullIndex"

const bonfireRankDictionary = [1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7]
const hackMasterRankDictionary = [ -100, -90, -85, -80, -75, -65, -60, -55, -50, -40, -35, -25, -20, -15, -10, 0, 10, 15, 20, 30, 35, 40, 50, 55, 60, 70, 75, 80, 90, 95, 100, 110, 115, 120, 130, 135, 140, 150, 155, 160, 170 ]


export default function calculateDescriptionRank(skullIndex: number = 0, system: SystemOption): number {
    const rankDictionary = system === 'Bonfire' ? bonfireRankDictionary : hackMasterRankDictionary

    return getModBySkullIndex(skullIndex, 0, rankDictionary)
}
import { SystemOption } from "../../../../../interfaces/beast/beast"
import getModBySkullIndex from "../../../getModBySkullIndex"

const bonfireRankDictionary = [1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7]
const hackMasterRankDictionary = [-20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180]


export default function calculateDescriptionRank(skullIndex: number = 0, system: SystemOption): number {
    const rankDictionary = system === 'Bonfire' ? bonfireRankDictionary : hackMasterRankDictionary

    return getModBySkullIndex(skullIndex, 0, rankDictionary)
}
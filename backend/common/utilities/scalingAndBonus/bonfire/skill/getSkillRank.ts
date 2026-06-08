import getModBySkullIndex from "@bestiary/common/utilities/scalingAndBonus/getModBySkullIndex"
import { SystemOption } from "../../../../interfaces/beast/beast"

const bonfireRankDictionary = [-8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36]
const hackMasterRankDictionary = [-20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180]

export default function getBaseSkillRank(skullIndex: number = 0, system: SystemOption): number {
    const rankDictionary = system === 'Bonfire' ? bonfireRankDictionary : hackMasterRankDictionary

    return getModBySkullIndex(skullIndex, 0, rankDictionary)
}
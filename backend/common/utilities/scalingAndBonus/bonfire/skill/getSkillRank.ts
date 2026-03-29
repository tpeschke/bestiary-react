import getModBySkullIndex from "@bestiary/common/utilities/scalingAndBonus/getModBySkullIndex"
import { SystemOption } from "../../../../interfaces/beast/beast"

const bonfireRankDictionary = [ -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36 ]
const hackMasterRankDictionary = [ -100, -90, -85, -80, -75, -65, -60, -55, -50, -40, -35, -25, -20, -15, -10, 0, 10, 15, 20, 30, 35, 40, 50, 55, 60, 70, 75, 80, 90, 95, 100, 110, 115, 120, 130, 135, 140, 150, 155, 160, 170 ]

export default function getBaseSkillRank(skullIndex: number = 0, system: SystemOption): number {
    const rankDictionary = system === 'Bonfire' ? bonfireRankDictionary : hackMasterRankDictionary

    return getModBySkullIndex(skullIndex, 0, rankDictionary)
}
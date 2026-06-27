import { BonfireDefenseInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { calculateBonfireDefenseInfo } from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/combatCalculation"

export default function adjustBonfireDefenseInfo(points: number, roleID: string | null, role: string, size: Size) {
    return (defenseInfo: BonfireDefenseInfo[], defense: BonfireDefenseInfo): BonfireDefenseInfo[] => {
        if (!roleID || defense.roleid === roleID) {
            defenseInfo.push({
                ...defense,
                ...calculateBonfireDefenseInfo(defense.scalingInfo, points, role, defense.scalingInfo.addsizemod, size, defense.scalingInfo.drAdjust),
                system: 'Bonfire',
                scalingInfo: defense.scalingInfo
            })
        }
        return defenseInfo
    }
}
import { HackMasterDefenseInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { calculateHackMasterDefenseInfo } from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/combatCalculation"

export default function adjustHackMasterDefenseInfo(points: number, roleID: string | null, role: string, size: Size) {
    return (defenseInfo: HackMasterDefenseInfo[], defense: HackMasterDefenseInfo): HackMasterDefenseInfo[] => {
        if (!roleID || defense.roleid === roleID) {
            defenseInfo.push({
                ...defense,
                ...calculateHackMasterDefenseInfo(defense.scalingInfo, points, role, defense.scalingInfo.addsizemod, size, defense.scalingInfo.drAdjust),
                system: 'HackMaster',
                scalingInfo: defense.scalingInfo
            })
        }
        return defenseInfo
    }
}
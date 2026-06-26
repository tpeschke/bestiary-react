import { BeastInfo } from "../../../../interfaces/viewInterfaces"
import CombatInfoClass from "../../../../models/gmBeastClass/components/CombatInfoClass"

export function getSelfDoubtDie(beastInfo: BeastInfo): string {
    const { combatSkulls } = new CombatInfoClass(beastInfo.combatInfo, beastInfo.system)
    const { skillSkulls } = beastInfo.skillInfo
    const { socialSkulls } = beastInfo.socialInfo

    const average = Math.floor([combatSkulls, skillSkulls, socialSkulls].reduce((a, b) => a + b) / 3)

    const selfDoubtDieDictionary = ['d20', 'd12', 'd10', 'd8', 'd6', 'd4', 'd0']

    return selfDoubtDieDictionary[average]
}
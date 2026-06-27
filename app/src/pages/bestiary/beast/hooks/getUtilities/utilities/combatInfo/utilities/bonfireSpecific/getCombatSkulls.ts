import { CombatInfoObject } from "../../getCombatInfo"

export function getCombatSkulls(combatInfoObject: CombatInfoObject): number {
    if (combatInfoObject.entryCombatInfo.type === 'Bonfire') {
        return combatInfoObject.entryCombatInfo.combatSkulls
    } else {
        return 0
    }
}
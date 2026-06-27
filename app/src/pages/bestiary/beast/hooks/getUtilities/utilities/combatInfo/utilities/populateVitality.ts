import { VitalityInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import { getDefault } from "./getDefault";

export function populateVitalityInfo(mainVitalityInfo: VitalityInfo, roleVitalityInfo: VitalityInfo): VitalityInfo {
    return {
        isSwarm: roleVitalityInfo.isSwarm,
        locationalVitalities: mainVitalityInfo.locationalVitalities,
        hasNoVitality: getDefault<boolean>(roleVitalityInfo.hasNoVitality, mainVitalityInfo.hasNoVitality),
        noTrauma: getDefault<boolean>(roleVitalityInfo.noTrauma, mainVitalityInfo.noTrauma),
        knockback: getDefault<number>(roleVitalityInfo.knockback, mainVitalityInfo.knockback),
        singleDieVitality: getDefault<boolean>(roleVitalityInfo.singleDieVitality, mainVitalityInfo.singleDieVitality),
        noKnockback: getDefault<boolean>(roleVitalityInfo.noKnockback, mainVitalityInfo.noKnockback),
        rollUnderTrauma: getDefault<number>(roleVitalityInfo.rollUnderTrauma, mainVitalityInfo.rollUnderTrauma),
        isIncorporeal: getDefault<boolean>(roleVitalityInfo.isIncorporeal, mainVitalityInfo.isIncorporeal),
        weaponBreakageVitality: getDefault<boolean>(roleVitalityInfo.weaponBreakageVitality, mainVitalityInfo.weaponBreakageVitality),
        vitality: getDefault<string | number>(roleVitalityInfo.vitality, mainVitalityInfo.vitality),
        trauma: getDefault<number | boolean>(roleVitalityInfo.trauma, mainVitalityInfo.trauma),
    }
}
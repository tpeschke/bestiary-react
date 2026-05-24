import type { SystemOption } from "../../interfaces/beast/beast"
import type { SpecialCombatInfo, SpecialCombatInfoValue } from "../../interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { BONFIRE, DND, HACKMASTER } from "./getSystemString"

type Replacement = [RegExp, string | ((match: string, ...args: string[]) => string)]

const hackMasterTextReplacements: Replacement[] = [
    [/\bOn a Trauma Check\b/g, "When ToP'd"],
    [/\bOn Trauma Check\b/g, "When ToP'd"],
    [/\bTrauma[\u2019']d\b/g, "ToP'd"],
    [/\bTrauma\b/g, 'ToP'],
    [/\bVitality\b/g, 'HP'],
    [/\bAnd Stress\b/g, ''],
    [/\bStress\b/g, 'HP'],
    [/\bFatigue\b/g, 'Damage'],
    [/\bEndurance\b/g, 'HP'],
    [/\bParries an attack\b/g, 'dodges an attack by 5 or more'],
    [/\bConfrontation\b/g, ''],
    [/\bMem\b/g, 'Int'],
    [/\+2 Pos\b/g, '+4'],
    [/\bd([0-9X]+)!/g, 'd$1p'],
    [/\b([+-]?\d+)\s+Wear\b/g, (_match, wear) => `-${wear.replace(/^[+-]/, '')}`],
    [/\bWear\b/g, 'Penalty'],
    [/\bRecovery\b/g, 'Speed'],
]

export function getHackMasterSpecialCombatInfo(info: string): string {
    return hackMasterTextReplacements.reduce((updatedInfo, [pattern, replacement]) => {
        if (typeof replacement === 'function') {
            return updatedInfo.replace(pattern, replacement)
        }

        return updatedInfo.replace(pattern, replacement)
    }, info)
}

export function buildSpecialCombatInfo(info: string | null | undefined): SpecialCombatInfo {
    const bonfireInfo = info ?? ''

    return [
        bonfireInfo,
        undefined,
        getHackMasterSpecialCombatInfo(bonfireInfo)
    ]
}

export function getSpecialCombatInfo(info: SpecialCombatInfoValue, system: SystemOption): string {
    if (!Array.isArray(info)) {
        return info ?? ''
    }

    if (system === 'HackMaster') {
        return info[HACKMASTER] ?? ''
    }

    return info[BONFIRE] ?? info[DND] ?? ''
}

export function getBonfireSpecialCombatInfo(info: SpecialCombatInfoValue): string {
    if (!Array.isArray(info)) {
        return info ?? ''
    }

    return info[BONFIRE] ?? ''
}

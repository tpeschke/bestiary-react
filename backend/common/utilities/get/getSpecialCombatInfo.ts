import type { SystemOption } from "../../interfaces/beast/beast"
import type { SpecialCombatInfo, SpecialCombatInfoValue } from "../../interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { BONFIRE, DND, HACKMASTER } from "./getSystemString"

type Replacement = [RegExp, string | ((match: string, ...args: string[]) => string)]

const hackMasterTextReplacements: Replacement[] = [
    [/\bOn a Trauma Check\b/gi, "When ToP'd"],
    [/\bOn Trauma Check\b/gi, "When ToP'd"],
    [/\bTrauma[\u2019']d\b/gi, "ToP'd"],
    [/\bTrauma\b/gi, 'ToP'],
    [/\bVitality\b/gi, 'HP'],
    [/\bAnd Stress\b/gi, ''],
    [/\bStress\b/gi, 'HP'],
    [/\bFatigue\b/gi, 'Damage'],
    [/\bEndurance\b/gi, 'HP'],
    [/\bParries an attack\b/gi, 'dodges an attack by 5 or more'],
    [/\bConfrontation\b/gi, ''],
    [/\bMem\b/gi, 'Int'],
    [/\+2 Pos\b/gi, '+4'],
    [/\bd([0-9X]+)!/gi, 'd$1p'],
    [/\b([+-]?\d+)\s+Wear\b/gi, (_match, wear) => `-${wear.replace(/^[+-]/, '')}`],
    [/\bWear\b/gi, 'Penalty'],
    [/\bRecovery\b/gi, 'Speed'],
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

import { SystemInfoArray } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"

type Replacement = [RegExp, string | ((match: string, ...args: string[]) => string)]

export function buildSystemSpecificInfo(info: string | null | undefined): SystemInfoArray {
    const bonfireInfo = info ?? ''

    return [
        bonfireInfo,
        undefined,
        replaceTerminology(hackMasterInfoTextReplacements, bonfireInfo)
    ]
}

export function buildSystemSpecificAppearance(appearance: string | null | undefined): SystemInfoArray {
        const bonfireAppearance = appearance ?? ''

    return [
        bonfireAppearance,
        undefined,
        replaceTerminology(hackMasterAppearanceTextReplacements, bonfireAppearance)
    ]
}

const hackMasterAppearanceTextReplacements: Replacement[] = [
    [/\+1 (Depression|Disgust|Fury|Joy|Surprise|Terror)/gi, 'Gain $1'],
    [/\-([0-9X]+)/gi, (_, bonus) => `-${+bonus * 5}%`],
    [/\+([0-9X]+)/gi, (_, bonus) => `+${+bonus * 5}%`],
    [/ ([0-9X]+)L/g, (_, carry) => ` ${+carry * 3}lb`],
    [/ Weirding/g, "Casting"],
    [/\bStress\b/gi, 'Damage'],
    [/\bd([0-9X]+)!/gi, 'd$1p'],
    [/\b([0-9X]+)d([0-9X]+)!/gi, '$1d$2p'],
    [/\+([0-9])\s+Wear\b/gi, "-$1 Penalty"],
    [/\-2 Atk & Def Position\b/gi, '-4 Atk & Def'],
    [/\-1 Position to next Check\b/gi, '-10% to next Check'],
    [/\-1 Position on next Check\b/gi, '-10% to next Check'],
    [/Conf\b/gi, 'Social'],
]

const hackMasterInfoTextReplacements: Replacement[] = [
    [/\bOn a Trauma Check\b/gi, "When ToP'd"],
    [/\bOn Trauma Check\b/gi, "When ToP'd"],
    [/\bTrauma[\u2019']d\b/gi, "ToP'd"],
    [/\bTrauma\b/gi, 'ToP'],
    [/\bVitality\b/gi, 'HP'],
    [/\bAnd Stress\b/gi, ''],
    [/\bStress\b/gi, 'Damage'],
    [/\bFatigue\b/gi, 'Damage'],
    [/\bEndurance\b/gi, 'HP'],
    [/\bParries an attack\b/gi, 'dodges an attack by 5 or more'],
    [/\bConfrontation\b/gi, ''],
    [/\bMem\b/gi, 'Int'],
    [/\+2 Pos\b/gi, '+4'],
    [/\bd([0-9X]+)!/gi, 'd$1p'],
    [/\b([0-9X]+)d([0-9X]+)!/gi, '$1d$2p'],
    [/\b([+-]?\d+)\s+Wear\b/gi, (_match, wear) => `-${wear.replace(/^[+-]/, '')}`],
    [/\bWear\b/gi, 'Penalty'],
    [/\bRecovery\b/gi, 'Speed'],
]

export function replaceTerminology(replacements: Replacement[], info: string): string {
    return replacements.reduce((updatedInfo, [pattern, replacement]) => {
        if (typeof replacement === 'function') {
            return updatedInfo.replace(pattern, replacement)
        }

        return updatedInfo.replace(pattern, replacement)
    }, info)
}
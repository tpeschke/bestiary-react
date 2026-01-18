import { BattlefieldObject } from "../../../../interfaces/encounterInterfaces"

import { grabRandomElementFromArray } from "../../../../utilities/array"

export default function getBattlefieldAndPattern(): BattlefieldObject {
    return {
        battlefield: grabRandomElementFromArray(battlefields),
        pattern: grabRandomElementFromArray(patterns)
    }
}

const battlefields = [
    'Divided Company',
    'Divided the Company From the Enemy',
    'Active hazard',
    'Differing Elevation',
    'In Fortified Position',
    'Cramped Quarters',
    'Beyond Ranged Weaponry',
    'Both Parties Surprised',
    'Ambush (for Enemies)',
    'Ambush (for Company)',
    'Bad Weather',
    'Sloped (Against Company)',
    'Sloped (Against Enemies)',
    'Open',
    'Open but Difficulty Terrain'
]

const patterns = [
    'Open Field',
    'Divide',
    'Danger Wall',
    'Pillar',
    'Guardian',
    'Pincer',
    'Funnel',
    'Horseshoe',
    'Long-Path',
    'Alley',
    'Up-Hill',
    'King of the Hill'
]
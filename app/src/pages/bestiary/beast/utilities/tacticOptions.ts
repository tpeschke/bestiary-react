import { SystemOption } from "@bestiary/common/interfaces/beast/beast"

type OptionType = { value: string, label: string }

export function getTacticOptionsForEdit(): OptionType[] {
    return Object.keys(bonfireTacticsObject).map(key => { return { value: key, label: key } })
}

export function getTacticInfo(tactic: string, system: SystemOption = 'Bonfire'): string {
    const tacticsObject = system === 'Bonfire' ? bonfireTacticsObject : hackMasterTacticsObject
    return `${tactic} (${tacticsObject[tactic]})`
}

const bonfireTacticsObject: { [key: string]: string } = {
    'Active Dodging': '+2 Def Pos, -1 Atk Pos, limit 5 ft / sec',
    'Brace Yourself': '+15 KB, +5 Trauma Check, -2 Def Pos',
    'Called Shot': "Half target's /d DR, +3 Rec",
    'Careful Aiming': '+2 Atk Pos, +3 Rec, limit 5 ft / sec',
    'Charge': '> Jog, -1 Def Pos, Inflict Fear @ Rank 2',
    'Disable, Arms': '1/2 dam, using arms give -1 Pos; -1 Atk Pos',
    'Disable, Head': 'Roll dam twice, take highest; -1 Atk Pos',
    'Disable, Legs': '1/2 dam, remove fastest move cat; -1 Atk Pos',
    'Feint': '+1 Atk Pos, move target up to 5 ft',
    'Flurry of Blows': '-4 Rec, Equipment +1 Wear',
    'Hit the Deck': 'Fall Prone, enemy moves you 5 ft, +2 Def Pos',
    'Hold Back': 'At 0, enemy is knocked unconscious; half dam dice rolled, double dam for Trauma',
    'Jab, Crushing': '-2 Atk Pos, -2 Pos to enemy\'s next Def Check',
    'Jab, Piercing': '-2 Atk Pos, -2 Pos to enemy\'s next Def Check',
    'Jab, Slashing': '-2 Atk Pos, -2 Pos to enemy\'s next Def Check',
    'Phalanx Fighting': 'If Measure > ally\'s Measure +5, attack over them; Movement limited to 5 ft / sec',
    'Power Attack, Crushing': '-2 Atk Pos, +4 dice size to largest dam die, 8 dam on miss',
    'Power Attack, Piercing': '-2 Atk Pos, +2 dice size to smallest dam die, 2d8! dam on miss',
    'Power Attack, Slashing': '-2 Atk Pos, +1 dice size to all dam die, 4d4! dam on miss',
    'Shift': '+1 Atk Pos, enemy moves you 5 ft',
    'Snap Shot': "-2 Atk Pos, -8 Rec",
    'Step Back': '+2 Def Pos, -1 Atk Pos, enemy moves you 5 ft'
}

const hackMasterTacticsObject: { [key: string]: string } = {
    'Active Dodging': '-8 Atk; +4 Def',
    'Brace Yourself': '+15 KB, +5 Trauma Check, -4 Def',
    'Called Shot': "Half target's DR, +3 Spd",
    'Careful Aiming': '+2 Atk, +3 Spd, limit 5 ft / sec',
    'Charge': '> 19 ft / sec, +4 Atk; -2 Def for 5 sec; damage x2 for KB',
    'Disable, Arms': '1/2 dam, using arms give -3; -2 Atk',
    'Disable, Head': 'Roll dam twice, take highest; -2 Atk',
    'Disable, Legs': '1/2 dam, remove fastest move cat; -2 Atk',
    'Feint': '+5 Atk; -2 Def',
    'Flurry of Blows': '-4 Spd, -2 Def, -2 Atk',
    'Hit the Deck': 'Fall Prone, enemy moves you 5 ft, +4 Def',
    'Hold Back': 'At 0, enemy is knocked unconscious; 1/2 dam dice rolled, dam x2 for Trauma',
    'Jab, Crushing': '-4 Spd, 1/2 dam',
    'Jab, Piercing': '-4 Spd, 1/2 dam',
    'Jab, Slashing': '-4 Spd, 1/2 dam',
    'Phalanx Fighting': 'If Reach > ally\'s Reach +5, attack over them; Movement limited to 5 ft / sec',
    'Power Attack, Crushing': 'Roll dam twice, take highest; -3 Def',
    'Power Attack, Piercing': 'Roll dam twice, take highest; -3 Def',
    'Power Attack, Slashing': 'Roll dam twice, take highest; -3 Def',
    'Shift': 'While Engaged, -1 Atk; move @ Walk',
    'Snap Shot': "-6 Atk, -4 Spd",
    'Step Back': '-1 Atk, +5 Def, move back @ Walk'
}
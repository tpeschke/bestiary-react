type OptionType = { value: string, label: string }

export function getTacticOptionsForEdit(): OptionType[] {
    return Object.keys(tacticsObject).map(key => { return { value: key, label: key } })
}

export function getTacticInfo(tactic: string): string {
    return `${tactic} (${tacticsObject[tactic]})`
}

const tacticsObject: { [key: string]: string } = {
    'Active Dodging': '+2 Def Pos, -1 Atk Pos, limit 5 ft / sec',
    'Brace Yourself': '+15 KB, +5 Trauma Check, -2 Def Pos',
    'Called Shot': "Half target's /d DR, +3 Rec",
    'Careful Aiming': '+2 Atk Pos, +3 Rec, limit 5 ft / se',
    'Charge': '> Jog, -1 Def Pos, Inflict Fear @ Rank 2',
    'Disable, Arms': '1/2 damage, using arms give -1 Pos; -1 Atk Pos',
    'Disable, Head': 'Roll damage twice, take highest; -1 Atk Pos',
    'Disable, Legs': '1/2 damage, remove fastest move cat; -1 Atk Pos',
    'Feint': '+1 Atk Pos, move target up to 5 ft',
    'Flurry of Blows': '-4 Rec, Equipment +1 Wear',
    'Hit the Deck': 'Fall Prone, enemy moves you 5 ft, +2 Def Pos',
    'Hold Back': 'At 0, enemy is knocked unconscious; half damage dice rolled, double damage for Trauma',
    'Jab, Crushing': '-2 Atk Pos, -2 Pos to enemy\'s next Def Check',
    'Jab, Piercing': '-2 Atk Pos, -2 Pos to enemy\'s next Def Check',
    'Jab, Slashing': '-2 Atk Pos, -2 Pos to enemy\'s next Def Check',
    'Phalanx Fighting': 'If Measure > ally’s Measure +5, attack over them; Movement limited to 5 ft / sec',
    'Power Attack, Crushing': '-2 Atk Pos, +4 dice size to largest damage die, 8 on miss',
    'Power Attack, Piercing': '-2 Atk Pos, +2 dice size to smallest damage die, 2d8! on miss',
    'Power Attack, Slashing': '-2 Atk Pos, +1 dice size to all damage die, 4d4! on miss',
    'Shift': '+1 Atk Pos, enemy moves you 5 ft',
    'Snap Shot': "-2 Atk Pos, -8 Rec",
    'Step Back': '+2 Def Pos, -1 Atk Pos, enemy moves you 5 ft'
} 

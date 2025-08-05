type OptionType = { value: string, label: string }

export function getTacticOptionsForEdit(): OptionType[] {
    return Object.keys(tacticsObject).map(key => { return { value: key, label: key } })
}

export function getTacticInfo(tactic: string): string {
    return `${tactic} (${tacticsObject[tactic]})`
}

const tacticsObject: { [key: string]: string } = {
    'Active Dodging': '+5 Def / -5 Atk, Perfect Def on 19 - 20, limit 5 ft / sec',
    'Brace Yourself': '+15 KB, +5 Trauma Check, -1 Def Die Size',
    'Called Shot': "Half target's /d DR, +5 Rec",
    'Careful Aiming': '+3 Rec, +5 Atk, must stand still, take 3 Stress',
    'Charge': 'Sprint for 3 sec; defender 2d6! Stress, attacker, double damage for KB, -1 Def Die Size for 5 sec or no longer Engaged',
    'Disable, Arms': '-5 Atk; +3 Rec; half damage, -1 die size to Checks w/ arms',
    'Disable, Head': '-5 Atk; +3 Rec; roll damage twice, take highest',
    'Disable, Legs': '-5 Atk; +3 Rec; half damage, remove fastest Move Cat.',
    'Feint': '+5 Atk, -3 Def',
    'Flurry of Blows': '1/2 Rec, -3 Atk & Def',
    'Hit the Deck': 'Go Prone, +5 Def vs ranged. Standing; move 5ft. Moving; move 10 ft. If move behind Cover, gain Crouching',
    'Hold Back': 'At 0, enemy is knocked unconscious; half damage dice rolled, double damage for Trauma',
    'Jab, Crushing': 'Target gains no Parry on -1 Def Die Size. On hit, no damage, but -2 Def, doubled each time',
    'Jab, Piercing': '1/2 Rec, target gains no Parry on -1 Def Die Size. On hit, no damage, but -2 Def, doubled each time',
    'Jab, Slashing': '1/2 Rec, target gains no Parry on -1 Def Die Size. On hit, no damage, but -2 Def, doubled each time',
    'Phalanx Fighting': '-1 Atk Die Size, -1 all Damage Die Sizes',
    'Power Attack, Crushing': '-3 Atk & Def, +2 die size to highest 2 damage die',
    'Power Attack, Piercing': '-3 Atk & Def, +1 die size to 1 damage die',
    'Power Attack, Slashing': '-3 Atk & Def, +1 die size to all damage dice',
    'Shift': 'Move @ Walk or change 1 Facing; +3 Atk',
    'Snap Shot': "-4 Rec, -1 Atk Die Size, damage doesn't explode",
    'Step Back': '+5 Def, -3 Atk; move back @ Jog or move to side @ Walk; vs Flurry of Blows, Feint, Power Attack, on hit, they half damage'
} 

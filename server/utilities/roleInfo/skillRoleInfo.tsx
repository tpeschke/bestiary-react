// TODO : Actually assign strenthes and create interfaces and types
const primary = {
    'Fodder': {
        strengths: 'None.',
        weaknesses: 'All of them.',
        description: "Skill Fodder are just not good at Skill Challenges and roll a d20! for all rules by default.",
        mental: 'minWk',
        panic: 'minSt'
    },
    'Hunter': {
        strengths: 'Keeps distance, waiting for the perfect time to strike.',
        weaknesses: 'Weak outside of when they strike.',
        description: "Hunters keep their prey at a distance until it's time to strike. They use their Skills to pick their moment of engagement, a moment where they're exceptionally powerful.",
        mental: 'minWk',
        panic: 'minSt'
    },
    'Prey': {
        strengths: 'Keeps distance, indirectly attacking enemies, possibly crippling them.',
        weaknesses: 'Always weak.',
        description: "Prey keeps their distance with Skills based around movement. They're usually extremely weak when caught but can often use the terrain to their advantage.",
        mental: 'minWk',
        panic: 'minSt'
    },
    'Controller': {
        strengths: 'Move enemies around using Skills.',
        weaknesses: 'None.',
        description: "A Controller uses their Skills to move players around, either on a battlefield or on an overland map.",
        mental: 'minWk',
        panic: 'minSt'
    },
    'Lock': {
        strengths: 'Extremely powerful most of the time.',
        weaknesses: 'Once their Skill Challenge is beaten, usually extremely weak.',
        description: "Locks are those enemies that can only be beaten after a Skill Challenge. They're usually extremely powerful and/or invulnerable until after, at which point they become a pushover.",
        mental: 'minWk',
        panic: 'minSt'
    },
    'Antagonist': {
        strengths: 'Debuffs enemies and buffs their allies.',
        weaknesses: 'Only effective indirectly.',
        description: "Antagonists are effective indirectly and focus on applying penalities to the enemy, rather than actually being skilled.",
        mental: 'minWk',
        panic: 'minSt'
    },
    'Trap': {
        strengths: 'Hidden and can be crippling or damaging. Often evolve into another type of encounter.',
        weaknesses: 'Cannot move or adapt. Can be easily avoided',
        description: "Traps are hidden, making them a nasty surprise to punish the unwary, however, they're also dumb, only being a threat when triggered.",
        mental: 'minWk',
        panic: 'minSt'
    },
    'Hazard': {
        strengths: 'Extremely crippling and/or damaging.',
        weaknesses: 'Non-hidden. Can be easily avoided or bypassed. Often non-mobile.',
        description: "Hazards are extremely powerful, however, they're non-moving and non-hidden, meaning that they're easily avoided.",
        mental: 'minWk',
        panic: 'minSt'
    },
}

const secondary = {
    'Elite': {
        description: "Elites are a real threat to a single character so they must be confrontated by multiple characters at the same time. They have special abilities that keep them dangerous and the Skill Challenge interesting."
    },
    'Solo': {
        description: "Solos hold their own against the party. They have special abilities that keep them dangerous and the Skill Challenge interesting."
    },
}
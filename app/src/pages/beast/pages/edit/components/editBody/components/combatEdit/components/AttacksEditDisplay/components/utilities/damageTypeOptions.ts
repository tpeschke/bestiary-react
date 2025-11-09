import { DamageType } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";

const SLASHING = 'Slashing'
const PIERCING_STABBY = 'Piercing, Stabby'
const PIERCING_POKEY = 'Piercing, Pokey'
const PIERCING_GOUGEY = 'Piercing, Gougey'
const CRUSHING = 'Crushing'

export default function getDamageTypeOptions() {
    return [
        { value: 'S', label: SLASHING },
        { value: 'Ps', label: PIERCING_STABBY },
        { value: 'Pp', label: PIERCING_POKEY },
        { value: 'Pg', label: PIERCING_GOUGEY },
        { value: 'C', label: CRUSHING },
    ]
}

export function getDamageTypeLabel(type: DamageType) {
    switch (type) {
        case 'C':
            return CRUSHING
        case 'Ps':
        case 'P':
            return PIERCING_STABBY
        case 'Pp':
            return PIERCING_POKEY
        case 'Pg':
            return PIERCING_GOUGEY
        case 'S':
            return SLASHING
        default:
            return CRUSHING
    }
}

export function getDamageTypeValue(type: DamageType) {
    if (type === 'P') { return 'Ps'}
    return type
}
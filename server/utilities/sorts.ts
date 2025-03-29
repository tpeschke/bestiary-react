interface SortStrength extends Object {
    strength: string
}

export function sortByStrength(a: SortStrength, b: SortStrength) {
    const order = ['majSt', 'minSt', 'minWk', 'majWk'];
    return order.indexOf(a.strength) - order.indexOf(b.strength)
}

interface SortAny extends Object {
    trait: string,
    value: string
}

export function sortOutAnyToTheBottom(a: SortAny, b: SortAny) {
    if ((a.trait === 'Any' && b.trait === 'Any') || (a.trait !== 'Any' && b.trait !== 'Any')) {
        return +b.value - +a.value
    }
    if (a.trait !== 'Any') {
        return -1
    } else {
        return 1
    }
}
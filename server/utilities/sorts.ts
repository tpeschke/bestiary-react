import { Item } from "../interfaces/lootInterfaces";

interface SortStrength extends Object {
    strength: string
}

export function sortByStrength(a: SortStrength, b: SortStrength): number {
    const order = ['majSt', 'minSt', 'minWk', 'majWk'];
    return order.indexOf(a.strength) - order.indexOf(b.strength)
}

interface SortAny extends Object {
    trait: string,
    value: string
}

export function sortOutAnyToTheBottom(a: SortAny, b: SortAny): number {
    if ((a.trait === 'Any' && b.trait === 'Any') || (a.trait !== 'Any' && b.trait !== 'Any')) {
        return +b.value - +a.value
    }
    if (a.trait !== 'Any') {
        return -1
    } else {
        return 1
    }
}

export function objectifyItemArray(itemArray: Item[]): Object {
    let itemObject = {}
    itemArray.forEach(item => {
        itemObject[item.itemcategory] = item
    })
    return itemObject
}

interface nameObject {
    name: string
}

export function sortTemplateRoles(a: nameObject, b: nameObject): number {
    const order = ['Novice', 'Apprentice', 'Journeyman', 'Expert', 'Master', 'Grandmaster', 'Legendary', 'Mythic'];
    return order.indexOf(a.name) - order.indexOf(b.name)
  }
import { Conflict } from "../interfaces/beastInterfaces/infoInterfaces/socialInfo";
import { Item } from "../interfaces/lootInterfaces";

export function sortByRank(a: Conflict, b: Conflict): number {
    if (a.rank && b.rank) {
        return a.rank - b.rank
    } 
    return 0
}

export function sortOutAnyToTheBottom(a: Conflict, b: Conflict): number {
    if (((a.trait === 'Any' && b.trait === 'Any') || (a.trait !== 'Any' && b.trait !== 'Any')) && (a.rank && b.rank)) {
        return b.rank - a.rank
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
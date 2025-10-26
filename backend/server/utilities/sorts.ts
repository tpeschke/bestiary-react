import { Conflict } from '@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces';
import { UnsortedRole } from '../controllers/gameMaster/utilities/getUtilities/utilities/getRoleInfo';
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
    let itemObject: any = {}
    itemArray.forEach(item => {
        itemObject[item.category] = item
    })
    return itemObject
}

export function sortTemplateRoles(a: UnsortedRole, b: UnsortedRole): number {
    const order = ['Novice', 'Apprentice', 'Journeyman', 'Expert', 'Master', 'Grandmaster', 'Legendary', 'Mythic'];
    return order.indexOf(a.name) - order.indexOf(b.name)
  }
import { DamageReductionObject } from "../interfaces/armorInterfaces"

export function processDR(drString: string): DamageReductionObject {
    let flat: number = 0
    let slash: number = 0

    if (drString) {
        const drArray = drString.split('+')
        drArray.forEach(element => {
            if (element.includes('/d')) {
                slash = +element.split('/d')[0]
            } else {
                flat = +element
            }
        })
    }

    return {
        flat, slash
    }
}
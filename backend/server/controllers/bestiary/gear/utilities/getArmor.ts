import axios from "axios"
import { ProcessedArmorDictionary, ReturnedArmorInfo, LIGHT, MEDIUM, HEAVY, armorCategoryBySizeDictionary, DamageReductionObject } from "../interfaces/armorInterfaces"
import { GearCategory } from "../interfaces/equipmentInterfaces"
import { srdEndpoint } from "../../../../server-config"

export default async function getArmor() {
    const { data: armorData } = await axios.get(srdEndpoint + 'getArmor')

    let list: GearCategory[] = [
        {
            label: "Light",
            items: []
        },
        {
            label: "Medium",
            items: []
        },
        {
            label: "Heavy",
            items: []
        }
    ]

    let dictionary: ProcessedArmorDictionary = {}

    armorData.forEach(({ dr, size, name }: ReturnedArmorInfo) => {
        switch (size) {
            case ('S'):
                list[LIGHT].items.push(name)
                break
            case ('M'):
                list[MEDIUM].items.push(name)
                break
            case ('L'):
                list[HEAVY].items.push(name)
                break
        }

        dictionary[name] = {
            name, size,
            type: armorCategoryBySizeDictionary[size],
            dr: processDR(dr)
        }
    })

    console.log('Armor Finished Collecting')

    return {
        dictionary,
        list
    }
}

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
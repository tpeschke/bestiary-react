import axios from "axios"
import { srdEndpoint } from "../../../server-config"
import { MEDIUM } from "../interfaces/armorInterfaces"
import { GearCategory } from "../interfaces/equipmentInterfaces"
import { ProcessedShieldDictionary, ReturnedShieldInfo, SMALL, LARGE } from "../interfaces/shieldInterfaces"
import { processDR } from "./processingFunctions"

export default async function getShield() {
    const { data: shieldData } = await axios.get(srdEndpoint + 'getShields')

    let list: GearCategory[] = [
        {
            label: "Small",
            items: []
        },
        {
            label: "Medium",
            items: []
        },
        {
            label: "Large",
            items: []
        }
    ]
    let dictionary: ProcessedShieldDictionary = {}

    shieldData.forEach(({ dr, name, size }: ReturnedShieldInfo) => {
        switch (size) {
            case ('S'):
                list[SMALL].items.push(name)
                break
            case ('M'):
                list[MEDIUM].items.push(name)
                break
            case ('L'):
                list[LARGE].items.push(name)
                break
        }

        dictionary[name] = {
            name, size,
            dr: processDR(dr)
        }
    })

    console.log('Shields Finished Collecting')

    return {
        dictionary,
        list
    }
}
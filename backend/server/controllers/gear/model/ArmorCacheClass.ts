import { armorCategoryBySizeDictionary, HEAVY, LIGHT, MEDIUM, ProcessedArmor, ProcessedArmorDictionary, ReturnedArmorInfo } from "../interfaces/armorInterfaces";
import { GearCategory } from "../interfaces/equipmentInterfaces";
import { processDR } from "../utilities/processingFunctions";

export default class ArmorCacheClass {
    private armorList: GearCategory[] = [
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
    private armorDictionary: ProcessedArmorDictionary = {}

    get list(): GearCategory[] {
        return this.armorList;
    }

    get dictionary(): ProcessedArmorDictionary {
        return this.armorDictionary;
    }

    public getByName(armorName: string): ProcessedArmor {
        return this.armorDictionary[armorName]
    }

    set armorData(armorData: ReturnedArmorInfo[]) {
        let armorDictionary: ProcessedArmorDictionary = {}
        let armorList: GearCategory[] = [
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

        armorData.forEach(({ dr, size, name }: ReturnedArmorInfo) => {
            switch (size) {
                case ('S'):
                    armorList[LIGHT].items.push(name)
                    break
                case ('M'):
                    armorList[MEDIUM].items.push(name)
                    break
                case ('L'):
                    armorList[HEAVY].items.push(name)
                    break
            }

            armorDictionary[name] = {
                name, size,
                type: armorCategoryBySizeDictionary[size],
                dr: processDR(dr)
            }
        })

        this.armorDictionary = armorDictionary
        this.armorList = armorList
        console.log('Armor Finished Collecting')
    }
}
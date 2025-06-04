import { GearCategory } from "../interfaces/equipmentInterfaces"
import { LARGE, MEDIUM, ProcessedShield, ProcessedShieldDictionary, ReturnedShieldInfo, SMALL } from "../interfaces/shieldInterfaces"
import { processDR } from "../utilities/processingFunctions"

export default class ShieldCacheClass {
    private shieldList: GearCategory[] = [
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
    private shieldDictionary: ProcessedShieldDictionary = {}

    get list(): GearCategory[] {
        return this.shieldList
    }

    get dictionary(): ProcessedShieldDictionary {
        return this.shieldDictionary
    }

    public getByName(shieldName: string): ProcessedShield {
        return this.shieldDictionary[shieldName]
    }

    set shieldData(shieldData: ReturnedShieldInfo[]) {
        let shieldList: GearCategory[] = [
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
        let shieldDictionary: ProcessedShieldDictionary = {}

        shieldData.forEach(({ dr, name, size }: ReturnedShieldInfo) => {
            switch (size) {
                case ('S'):
                    shieldList[SMALL].items.push(name)
                    break
                case ('M'):
                    shieldList[MEDIUM].items.push(name)
                    break
                case ('L'):
                    shieldList[LARGE].items.push(name)
                    break
            }

            shieldDictionary[name] = {
                name, size,
                dr: processDR(dr)
            }
        })

        this.shieldList = shieldList
        this.shieldDictionary = shieldDictionary
        console.log('Shields Finished Collecting')
    }
}

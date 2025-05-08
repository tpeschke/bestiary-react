import { Casting } from "../../interfaces/infoInterfaces.ts/castingInfo";

export interface CastingDisplayType {
    value: number,
    displayName: string
}

const castingTypeDictionary = ['Augury', 'Wild Magic', 'Vancian', 'Manifesting', 'Adamic Commanding', 'Blood Pact']

export default class CastingClass {
    private castingTypesArray: boolean[]
    private filteredCastingTypes: CastingDisplayType[]
    private defaulttype: number | null

    private spellnumberdie: string

    private intialSelected: number;

    constructor(castingInfo: Casting) {
        const { castingTypesArray, spellnumberdie, defaulttype } = castingInfo

        this.castingTypesArray = castingTypesArray
        this.spellnumberdie = spellnumberdie
        this.defaulttype = defaulttype

        this.filteredCastingTypes = this.filterCastingTypes()
        this.intialSelected = this.getInitialSelected()
    }

    get castingOptions(): CastingDisplayType[] {
        return this.filteredCastingTypes
    }

    get getIntialSelected(): number {
        return this.intialSelected
    }

    private filterCastingTypes(): CastingDisplayType[] {
        return this.castingTypesArray.reduce((filtered: CastingDisplayType[], castingType: boolean, index: number) => {
            if (castingType) {
                filtered.push({
                    value: index,
                    displayName: castingTypeDictionary[index]
                });
            }
            return filtered;
        }, []);
    }

    private getInitialSelected(): number {
        if (this.defaulttype === null) {
            return Math.floor(Math.random() * this.filteredCastingTypes.length)
        }
        return this.defaulttype
    }

}
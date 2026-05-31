import { Casting } from "../../../../../../interfaces/infoInterfaces/castingInfo"

export interface CastingDisplayType {
    value: number,
    displayName: string
}

const castingTypeDictionary = ['Augury', 'Wild Magic', 'Vancian', 'Manifesting', 'Adamic Commanding', 'Blood Pact']

export default class CastingClass {
    private castingTypesArray: boolean[] = []
    private filteredCastingTypes: CastingDisplayType[] = []
    private defaulttype: number | undefined;

    private spellnumberdie: string = ''

    private initialSelected: number = 0;

    constructor(castingInfo: Casting | null) {
        if (castingInfo) {
            const { castingTypesArray, spellnumberdie, defaulttype } = castingInfo
    
            this.castingTypesArray = castingTypesArray
            this.spellnumberdie = spellnumberdie
            this.defaulttype = defaulttype
    
            this.filteredCastingTypes = this.filterCastingTypes()
            this.initialSelected = this.getInitialCastingType(defaulttype)
        }
    }

    get castingTypes(): boolean[] {
        return this.castingTypesArray;
    }

    get castingOptions(): CastingDisplayType[] {
        return this.filteredCastingTypes
    }

    get getDefaultType(): number | undefined {
        return this.defaulttype
    }

    get getInitialSelected(): number {
        return this.initialSelected
    }

    get getSpellNumberDie(): string {
        return this.spellnumberdie
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

    private getInitialCastingType(defaultType: undefined | number): number {
        if (this.filteredCastingTypes.length === 0) {return 0}

        if (!defaultType && defaultType !== 0 && this.filteredCastingTypes.length > 0) {
            const filteredIndex = Math.floor(Math.random() * this.filteredCastingTypes.length)
            return this.filteredCastingTypes[filteredIndex].value
        }

        return defaultType ?? 0
    }

}
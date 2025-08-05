const castingTypeDictionary = ['Augury', 'Wild Magic', 'Vancian', 'Manifesting', 'Adamic Commanding', 'Blood Pact'];
export default class CastingClass {
    castingTypesArray;
    filteredCastingTypes;
    defaulttype;
    spellnumberdie;
    intialSelected;
    constructor(castingInfo) {
        const { castingTypesArray, spellnumberdie, defaulttype } = castingInfo;
        this.castingTypesArray = castingTypesArray;
        this.spellnumberdie = spellnumberdie;
        this.defaulttype = defaulttype;
        this.filteredCastingTypes = this.filterCastingTypes();
        this.intialSelected = this.getInitialSelected();
    }
    get castingTypes() {
        return this.castingTypesArray;
    }
    get castingOptions() {
        return this.filteredCastingTypes;
    }
    get getDefaultType() {
        return this.defaulttype;
    }
    get getIntialSelected() {
        return this.intialSelected;
    }
    get getSpellNumberDie() {
        return this.spellnumberdie;
    }
    filterCastingTypes() {
        return this.castingTypesArray.reduce((filtered, castingType, index) => {
            if (castingType) {
                filtered.push({
                    value: index,
                    displayName: castingTypeDictionary[index]
                });
            }
            return filtered;
        }, []);
    }
    getInitialSelected() {
        if (this.defaulttype === null) {
            return Math.floor(Math.random() * this.filteredCastingTypes.length);
        }
        return this.defaulttype;
    }
}

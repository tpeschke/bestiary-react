export default class ArmorCacheClass {
    private armorIndex = []
    private armorObject = {}

    get index() {
        return this.armorIndex;
    }

    get object() {
        return this.armorObject;
    }

    public getByName(armorName: string) {
        return this.armorObject[armorName]
    }
}
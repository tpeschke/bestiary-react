export default class ShieldCacheClass {
    public index = []
    public object = {}

    public getByName(shieldName: string) {
        return this.object[shieldName]
    }
}

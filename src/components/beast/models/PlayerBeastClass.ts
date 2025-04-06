import { PlayerBeastInfo } from "../interfaces/viewInterfaces";

export default class PlayerBeastClass {
    private beastInfo: PlayerBeastInfo;

    constructor(beastInfo: PlayerBeastInfo) {
        this.beastInfo = beastInfo;
    }

    get info(): PlayerBeastInfo {
        return {
            id: this.id,
            name: this.name,
            notes: this.notes
        }
    }

    get id(): number {
        return this.beastInfo?.id ? this.beastInfo.id : 0
    }

    get name(): string {
        return this.beastInfo?.name ? this.beastInfo?.name : ''
    }

    get notes(): string {
        return this.beastInfo?.notes ? this.beastInfo?.notes : ''
    }

    set notes(value: string) {
        console.log(value)
        this.beastInfo.notes = value
    }

}
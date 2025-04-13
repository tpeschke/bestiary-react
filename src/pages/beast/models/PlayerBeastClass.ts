import { savePlayerNotes } from "../hooks/playerHooks";
import { Notes, PlayerBeastInfo } from "../interfaces/viewInterfaces";

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

    get notes(): Notes {
        return this.beastInfo?.notes ? this.beastInfo?.notes : { notes: ''}
    }

    async setNotes(value: string) {
        if (!this.beastInfo.notes) {
            this.beastInfo.notes = { notes: value}
            this.beastInfo.notes.id = await this.saveNotes(this.beastInfo.id, this.beastInfo.notes)
        } else if (value !== this.beastInfo.notes.notes) {
            this.beastInfo.notes.notes = value
            this.beastInfo.notes.id = await this.saveNotes(this.beastInfo.id, this.beastInfo.notes)
        }
    }

    private async saveNotes(beastId: number, notes: Notes): Promise<number> {
        return await savePlayerNotes(beastId, notes)
    } 
}
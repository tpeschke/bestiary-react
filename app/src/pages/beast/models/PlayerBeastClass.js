import { savePlayerNotes } from "../hooks/playerHooks";
export default class PlayerBeastClass {
    beastInfo;
    constructor(beastInfo) {
        this.beastInfo = beastInfo;
    }
    get info() {
        return {
            id: this.id,
            name: this.name,
            notes: this.notes,
            artistInfo: this.artistInfo
        };
    }
    get id() {
        return this.beastInfo?.id ?? 0;
    }
    get name() {
        return this.beastInfo?.name ?? '';
    }
    get notes() {
        return this.beastInfo?.notes ?? { notes: '' };
    }
    get artistInfo() {
        return this.beastInfo?.artistInfo ?? {};
    }
    async setNotes(value) {
        if (!this.beastInfo.notes) {
            this.beastInfo.notes = { notes: value };
            this.beastInfo.notes.id = await this.saveNotes(this.beastInfo.id, this.beastInfo.notes);
        }
        else if (value !== this.beastInfo.notes.notes) {
            this.beastInfo.notes.notes = value;
            this.beastInfo.notes.id = await this.saveNotes(this.beastInfo.id, this.beastInfo.notes);
        }
    }
    async saveNotes(beastId, notes) {
        return await savePlayerNotes(beastId, notes);
    }
}

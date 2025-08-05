export default interface PlayerSpecificInfo {
    favorite: boolean,
    notes: Notes
}

export interface Notes {
    id?: number,
    notes: string
}
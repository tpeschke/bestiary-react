export interface User {
    id: number,
    email: string,
    patreon?: number,
    koFi?: number,
    system: 0 | 1 | 2
}
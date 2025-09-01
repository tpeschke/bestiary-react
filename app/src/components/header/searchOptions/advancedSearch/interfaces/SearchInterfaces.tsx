export type CaptureQueryFunction = (param: QueryBasicParams, value: string) => void
export type CaptureQueryArrayFunction = (param: QueryArrayParams, id: number, checked: boolean) => void

export interface QueryParamsObject extends QueryBasicParamsObject, QueryArrayParamsObject {}
export type QueryParams = keyof QueryParamsObject

export interface QueryBasicParamsObject {
    name?: string,
    body?: string,
    size?: string,
    rarity?: string,
    access?: string,
    minConfrontationRate?: string,
    maxConfrontationRate?: string,
    minCombatRate?: string,
    maxCombatRate?: string,
    minChallengeRate?: string,
    maxChallengeRate?: string,
    anyAccess?: string,
    personalNotes?: string,
}
export type QueryBasicParams = keyof QueryBasicParamsObject

export interface QueryArrayParamsObject {
    climate?: number[],
    roles?: number[],
    types?: number[]
}
export type QueryArrayParams = keyof QueryArrayParamsObject
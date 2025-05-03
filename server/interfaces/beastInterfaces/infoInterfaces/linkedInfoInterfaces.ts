export default interface LinkedInfo {
    variants: Variant[],
    locations: LocationObject,
    types: Type[],
    climates: ClimateObject,
}

export interface Variant {
    id: number,
    beastid: number,
    variantid: number,
    deleted: boolean
}

export interface Type {
    id: number,
    beastid: number,
    typeid: number,
    deleted: boolean
}

export interface LocationObject {
    alllocations: Location[],
    beast: Location[]
}

export interface ClimateObject {
    allclimates: Climate[],
    beast: Climate[]
}

export interface Climate {
    beastid: number,
    climate: string,
    code: string,
    examples: string,
    uniqueid: number,
    climateid?: number,
    id?: number,
    priority?: number,
    deleted?: boolean
}

export interface Location {
    id: number,
    beastid: number,
    locationid: number,
    location: string,
    link: string,
}
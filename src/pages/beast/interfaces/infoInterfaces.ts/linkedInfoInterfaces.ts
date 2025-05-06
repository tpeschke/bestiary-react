export default interface LinkedInfo {
    variants: Variant[],
    locations: LocationObject,
    types: BeastType[],
    climates: ClimateObject,
}

export interface Variant {
    id: number,
    name: string,
    variantid: number
}

export interface BeastType {
    id: number,
    beastid: number,
    typeid: number,
    type: string,
    description: string
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
    code?: string,
    examples: string,
    uniqueid: number,
    climateid?: number,
    id?: number,
}

export interface Location {
    id: number,
    beastid: number,
    locationid: number,
    location: string,
    link: string,
}
import { Size, Rarity} from './beast/infoInterfaces/generalInfoInterfaces'

interface SearchResultBase {
    type: 'player' | 'gm',
    id: number,
    name: string,
    thumbnail: string,
    intro: string,
    patreon: number,
    rarity: Rarity,
    size: Size,
    canplayerview: boolean,
    mincombatskull?: number,
    maxcombatskull?: number,
    minsocialskull?: number,
    maxsocialskull?: number,
    minskillskull?: number,
    maxskillskull?: number,
    mincombatep?: number,
    maxcombatep?: number,
    minsocialep?: number,
    maxsocialep?: number,
    minskillep?: number,
    maxskillep?: number,
    hascombatattack: boolean,
    hascombatdefense: boolean,
    hasskillattack: boolean,
    hasskilldefense: boolean,
    hasconfattack: boolean,
    hasconfdefense: boolean,
}

export type SearchResult = PlayerSearchResult | GMSearchResult

export interface PlayerSearchResult extends SearchResultBase {
    type: 'player'
}

export interface GMSearchResult extends SearchResultBase {
    type: 'gm',
    hash: string
}
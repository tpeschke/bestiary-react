import { Size, Rarity} from './beast/infoInterfaces/generalInfoInterfaces'

interface SearchResultBase {
    type: 'player' | 'gm',
    id: number,
    number: string,
    intro: string,
    patreon: number,
    rarity: Rarity,
    size: Size,
    canplayerview: boolean,
    mincombat: number,
    maxcombat: number,
    minsocial: number,
    maxsocial: number,
    minskill: number,
    maxskill: number,
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
import { Access } from "@bestiary/common/utilities/get/getAccessLevel"

export interface CatalogState {
    catalogItems: CatalogTile[][],
    AllCatalogItems: CatalogTile[][]
    templates: CatalogTile[],
    freeBeasts: CatalogTile[],
    favorites: CatalogTile[]
}

export interface CatalogTile {
    id: number
    name: string,
    thumbnail: string,
    roles: any[],
    canplayerview: boolean,
    patreon: number,
}
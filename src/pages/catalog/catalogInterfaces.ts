export interface CatalogState {
    catalogItems: CatalogTile[][],
    templates: CatalogTile[],
    freeBeasts: CatalogTile[],
    updatingCatalogItems: CatalogTile[][],
    favorites: CatalogTile[]
}

export interface CatalogTile {
    id: number
    name: string,
    thumbnail: string,
    roles: any[],
    canplayerview: boolean,
    patreon: number,
    notupdating: boolean
}
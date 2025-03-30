export interface CatalogState {
    catalogItems: CatalogTile[][],
    templates: CatalogTile[],
    freeBeasts: CatalogTile[]
}

export interface CatalogTile {
    id: number
    name: string,
    thumbnail: string,
    roles: any[]
}
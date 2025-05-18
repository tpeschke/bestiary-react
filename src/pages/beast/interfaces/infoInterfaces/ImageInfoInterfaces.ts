export default interface ImageInfo {
    thumbnail: string,
    imagesource: number,
    artistInfo?: ArtistObject,
}

export interface ArtistObject {
    genericArtistInfo: ArtistInfo,
    allartists?: ArtistInfo[],
    roleartists: ArtistInfo[]
}

export interface ArtistInfo {
    id?: number,
    artistid?: number,
    artist?: string,
    tooltip?: string,
    link?: string,
    roleid?: string
}
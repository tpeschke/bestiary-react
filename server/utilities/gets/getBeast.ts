import { Response, Error, User } from "../../interfaces/apiInterfaces";
import { ArtistObject, ArtistInfo, Climate, ClimateObject, Type, LocationObject, Location, Conflict, ConflictObject } from "../../interfaces/beastInterfaces";

import { isOwner } from "../ownerAccess";
import { sendErrorForwardNoFile } from "../sendingFunctions";
import { sortByStrength, sortOutAnyToTheBottom } from "../sorts";

const sendErrorForward = sendErrorForwardNoFile('get beast')

export function hasAppropriatePateronLevel(user: User, beastPatron: number, canPlayerView: boolean) {
    if (canPlayerView || (user && isOwner(user.id))) {
        return true
    } else if (user && user.patreon) {
        let effectivePatreon = beastPatron === 0 ? beastPatron + 3 : beastPatron
        return effectivePatreon >= user.patreon
    }

    return false
}

export async function getTypes(databaseConnection: any, response: Response, beastId: number): Promise<Type[]> {
    return databaseConnection.beast.type.get(beastId).catch((error: Error) => sendErrorForward('types', error, response))
}

export async function getClimates(databaseConnection: any, response: Response, beastId: number): Promise<ClimateObject> {
    const beast: Climate[] = await databaseConnection.beast.climate.get(beastId).catch((error: Error) => sendErrorForward('climates', error, response))
    return databaseConnection.beast.climates.getAll().then((alllimates: Climate[]) => {
        return {
            beast,
            alllimates
        }
    }).catch((error: Error) => sendErrorForward('all climates', error, response))
}

export async function getArtistInfo(databaseConnection: any, response: Response, beastId: number, isEditing: boolean): Promise<ArtistObject> {
    let allArtists: ArtistObject[] = []
    if (isEditing) {
        allArtists = await databaseConnection.beast.artist.getAll(beastId).catch((error: Error) => sendErrorForward('all artists', error, response))
    }

    return databaseConnection.beast.artist.get(beastId).then((genericArtistInfo: ArtistInfo[]) => {
        return {
            genericArtistInfo: genericArtistInfo[0],
            roleartists: genericArtistInfo.splice(1),
            allArtists
        }
    }).catch((error: Error) => sendErrorForward('specific artist', error, response))
}

export async function getLocations(databaseConnection: any, response: Response, beastId: number, isEditing: boolean): Promise<LocationObject> {
    let alllocations: Location[] = []
    if (isEditing) {
        alllocations = await databaseConnection.beast.location.getAll(beastId).catch((error: Error) => sendErrorForward('all locations', error, response))
    }

    return databaseConnection.beast.location.get(beastId).then(beast => {
        return {
            beast,
            alllocations
        }
    }).catch((error: Error) => sendErrorForward('location', error, response))
}

export async function getConflict(databaseConnection: any, response: Response, beastId: number, isEditing: boolean,
    traitlimit: number, devotionlimit: number, flawlimit: number): Promise<ConflictObject> {

    let conflict: ConflictObject = { descriptions: [], convictions: [], devotions: [], flaws: [], burdens: [] }

    if (isEditing) {
        return databaseConnection.beast.conflict.getEdit(beastId).then((characteristics: Conflict[]) => {
            characteristics.forEach((characteristic: Conflict) => {
                if (characteristic.type === 't' || characteristic.type === 'c' || !characteristic.type) {
                    conflict.convictions.push(characteristic)
                } else if (characteristic.type === 'd') {
                    conflict.devotions.push(characteristic)
                } else if (characteristic.type === 'f') {
                    conflict.flaws.push(characteristic)
                } else if (characteristic.type === 'b') {
                    conflict.burdens.push(characteristic)
                } else if (characteristic.type === 'h') {
                    conflict.descriptions.push(characteristic)
                }
            })
            return conflict
        }).catch((error: Error) => sendErrorForward('confrontation edit', error, response))
    } else {
        return databaseConnection.beast.conflict.get(beastId).then((characteristics: Conflict[]) => {
            characteristics.forEach((characteristic: Conflict) => {
                if (characteristic.type === 't' || characteristic.type === 'c' || !characteristic.type) {
                    if (traitlimit && conflict.convictions.length < traitlimit) {
                        conflict.convictions.push(characteristic)
                    } else if (!traitlimit) {
                        conflict.convictions.push(characteristic)
                    }
                } else if (characteristic.type === 'd') {
                    if (devotionlimit && conflict.devotions.length < devotionlimit) {
                        conflict.devotions.push(characteristic)
                    } else if (!devotionlimit) {
                        conflict.devotions.push(characteristic)
                    }
                } else if (characteristic.type === 'f') {
                    if (flawlimit && conflict.flaws.length < flawlimit) {
                        conflict.flaws.push(characteristic)
                    } else if (!flawlimit) {
                        conflict.flaws.push(characteristic)
                    }
                } else if (characteristic.type === 'b') {
                    conflict.burdens.push(characteristic)
                } else if (characteristic.type === 'h') {
                    conflict.descriptions.push(characteristic)
                }
            })

            conflict.descriptions = conflict.descriptions.sort(sortByStrength)
            conflict.convictions = conflict.convictions.sort(sortByStrength)
            conflict.flaws = conflict.flaws.sort(sortOutAnyToTheBottom)
            conflict.burdens = conflict.burdens.sort(sortOutAnyToTheBottom)

            return conflict
        }).catch((error: Error) => sendErrorForward('confrontation', error, response))
    }
}
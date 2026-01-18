import { getCatalogTilesByLetter, getFreeCatalogTiles, getRolesForCatalogTile, getTemplateForCatalog, getTemplateRolesForCatalogTile } from "../../db/cache/catalog"
import query from "../../db/database"
import { Request, Response } from "../../interfaces/apiInterfaces"
import { BeastTile, Role } from "../../interfaces/bestiary/catalogInterfaces"

import { checkForContentTypeBeforeSending } from '../../utilities/sendingFunctions'
import { getFavorites } from "./player"

interface Catalog {
    freeBeasts: BeastTile[],
    templates: BeastTile[],
    catalogItems: BeastTile[][],
    favorites: BeastTile[]
}

let catalogCache: Catalog = { freeBeasts: [], templates: [], catalogItems: [], favorites: [] }
let newCache: Catalog = { freeBeasts: [], templates: [], catalogItems: [], favorites: [] }

export async function getCatalog(request: Request, response: Response) {
    if (request.user?.id) {
        const { id: userID } = request.user
        const favorites = await getFavorites(userID)
        checkForContentTypeBeforeSending(
            response,
            {
                ...catalogCache,
                favorites
            }
        )
    } else {
        checkForContentTypeBeforeSending(response, catalogCache)
    }
}

export async function collectCatalog() {
    let freeBeasts: BeastTile[] = await query(getFreeCatalogTiles)

    if (freeBeasts.length > 0) { newCache.freeBeasts = freeBeasts }

    freeBeasts.forEach(async (beast: BeastTile, index: number) => {
        beast.roles = await query(getRolesForCatalogTile, beast.id)

        if (!beast.defaultrole && beast.roles.length > 0) { beast.defaultrole = beast.roles[0].id }

        if (beast.defaultrole) {
            const defaultRoleIndex = beast.roles.findIndex((role: Role) => role.id === beast.defaultrole)
            beast.role = beast.roles[defaultRoleIndex].role
            beast.secondaryrole = beast.roles[defaultRoleIndex].secondaryrole
            beast.socialrole = beast.roles[defaultRoleIndex].socialrole
            beast.skillrole = beast.roles[defaultRoleIndex].skillrole
        }

        freeBeasts[index] = beast
    })

    let templateBeasts: BeastTile[] = await query(getTemplateForCatalog)
    if (templateBeasts.length > 0) { newCache.templates = templateBeasts }

    templateBeasts.forEach(async (beast: BeastTile, index: number) => {
        beast.roles = await query(getTemplateRolesForCatalogTile, beast.id)

        if (!beast.defaultrole && beast.roles.length > 0) { beast.defaultrole = beast.roles[0].id }

        if (beast.defaultrole) {
            const defaultRoleIndex = beast.roles.findIndex((role: Role) => role.id === beast.defaultrole)
            beast.role = beast.roles[defaultRoleIndex].role
            beast.secondaryrole = beast.roles[defaultRoleIndex].secondaryrole
            beast.socialrole = beast.roles[defaultRoleIndex].socialrole
            beast.skillrole = beast.roles[defaultRoleIndex].skillrole
        }

        templateBeasts[index] = beast
    })

    collectCache(0)
}

async function collectCache(index: number) {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (alphabet[index]) {
        let beasts: BeastTile[] = await query(getCatalogTilesByLetter, alphabet[index])
        if (beasts.length > 0) { newCache.catalogItems.push(beasts) }

        beasts.forEach(async (beast: BeastTile, index: number) => {
            beast.roles = await query(getRolesForCatalogTile, beast.id)

            if (!beast.defaultrole && beast.roles.length > 0) {
                beast.defaultrole = beast.roles[0].id
            } else if (beast.defaultrole && beast.roles.length === 0) {
                beast.defaultrole = null
            }

            if (beast.defaultrole) {
                const defaultRoleIndex = beast.roles.findIndex((role: Role) => role.id === beast.defaultrole)
                beast.role = beast.roles[defaultRoleIndex].role
                beast.secondaryrole = beast.roles[defaultRoleIndex].secondaryrole
                beast.socialrole = beast.roles[defaultRoleIndex].socialrole
                beast.skillrole = beast.roles[defaultRoleIndex].skillrole
            }

            beasts[index] = beast
        })
        collectCache(++index)
    } else {
        catalogCache = newCache
        newCache = { freeBeasts: [], templates: [], catalogItems: [], favorites: [] }
        console.log('---------------------------------- ')
        console.log('--- Bestiary Catalog Collected --- ')
        console.log('---------------------------------- ')
    }
}
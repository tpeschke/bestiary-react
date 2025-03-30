import { Request, Response, Error } from "../interfaces/apiInterfaces"
import { BeastTile, Role } from "../interfaces/catalogInterfaces"

import { consoleLogErrorNoFile, checkForContentTypeBeforeSending } from '../utilities/sendingFunctions'

const consoleLogError = consoleLogErrorNoFile('catalog')

interface Catalog {
    freeBeasts: BeastTile[],
    templates: BeastTile[],
    catalog: BeastTile[][]
}

let catalogCache: Catalog = { freeBeasts: [], templates: [], catalog: [] }
let newCache: Catalog = { freeBeasts: [], templates: [], catalog: [] }

export async function getCatalog(request: Request, response: Response) {
    checkForContentTypeBeforeSending(response, catalogCache)
}

export async function collectCatalog(databaseConnection: any) {
    let freeBeasts: BeastTile[] = await databaseConnection.catalog.get.free().catch((error: Error) => consoleLogError('get free beasts', error))
    if (freeBeasts.length > 0) { newCache.freeBeasts = freeBeasts }

    freeBeasts.forEach(async (beast: BeastTile, index: number) => {
        beast.roles = await databaseConnection.catalog.get.role(beast.id).catch((error: Error) => consoleLogError('get roles for free beasts', error))

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

    let templateBeasts = await databaseConnection.catalog.get.template().catch((error: Error) => consoleLogError('templates catagory', error))
    if (templateBeasts.length > 0) { newCache.templates = templateBeasts }

    templateBeasts.map(async (beast: BeastTile, index: number) => {
        beast.roles = await databaseConnection.catalog.get.roleTemplate(beast.id).catch((error: Error) => consoleLogError('collect roles for templates', error))

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

    collectCache(databaseConnection, 0)
}

async function collectCache(databaseConnection: any, index: number) {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (alphabet[index]) {
        let beasts: BeastTile[] = await databaseConnection.catalog.get.byLetter(alphabet[index]).catch((error: Error) => consoleLogError('get by letter', error))
        if (beasts.length > 0) { newCache.catalog.push(beasts) }

        beasts.forEach(async (beast: BeastTile, index: number) => {
            beast.roles = await databaseConnection.catalog.get.role(beast.id)

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
        collectCache(databaseConnection, ++index)
    } else {
        catalogCache = newCache
        newCache = { freeBeasts: [], templates: [], catalog: []  }
        console.log('bestiary catalog collected')
    }
}
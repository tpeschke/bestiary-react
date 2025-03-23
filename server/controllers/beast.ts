import { Response, Request, Error } from "../interfaces/apiInterfaces"
import { ClimateEditObject, Role, Type, UpdateParameters } from "../interfaces/beastInterfaces"

import getDatabaseConnection from "../utilities/databaseConnection"
import { isOwner } from "../utilities/ownerAccess"
import createHash from "../routes/hashGeneration"
import upsertBeast from "../utilities/upsertBeast"
import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../utilities/sendingFunctions'

const sendErrorForward = sendErrorForwardNoFile('beast controller')

interface beastRequest extends Request {
    body: Body
}

interface Body {
    name: string,
    intro: string,
    habitat: string,
    ecology: string,
    senses: string,
    diet: string,
    meta: string,
    sp_atk: string,
    sp_def: string,
    tactics: string,
    size: string,
    patreon: number,
    vitality: string,
    panic: number,
    stress: number,
    lootnotes: string,
    traitlimit: number,
    devotionlimit: number,
    flawlimit: number,
    passionlimit: number,
    plural: string,
    thumbnail: string,
    rarity: number,
    caution: number,
    role: string,
    combatpoints: number,
    socialrole: string,
    socialpoints: number,
    secondaryrole: string,
    skillrole: string,
    skillpoints: number,
    fatigue: string,
    defaultrole: string,
    socialsecondary: string,
    notrauma: boolean,
    knockback: number,
    singledievitality: boolean,
    noknockback: boolean,
    rolenameorder: number,
    descriptionshare: number,
    convictionshare: number,
    devotionshare: number,
    rollundertrauma: number,
    imagesource: number,
    isincorporeal: boolean,
    weaponbreakagevitality: boolean,
    hasarchetypes: boolean,
    hasmonsterarchetypes: boolean,
    skillsecondary: string,
    roles: Role[],
    types: Type[]
    climates: ClimateEditObject
}

export async function addBeast(request: beastRequest, response: Response) {
    const databaseConnection = getDatabaseConnection(request)
    const { body, user } = request

    let { name, intro, climates, habitat, ecology, senses, diet, meta, sp_atk, sp_def, tactics, size, patreon, vitality, panic, stress,
        types, movement, conflict, skills, variants, loot, reagents, lootnotes, traitlimit, devotionlimit, flawlimit, passionlimit, encounter, plural, thumbnail, rarity,
        locationalvitality, lairloot, roles, casting, spells, deletedSpellList, challenges, obstacles, caution, role, combatpoints, socialrole, socialpoints, secondaryrole,
        skillrole, skillpoints, fatigue, artistInfo, defaultrole, socialsecondary, notrauma, carriedloot, folklore, combatStatArray, knockback, singledievitality, noknockback,
        tables, rolenameorder, descriptionshare, convictionshare, devotionshare, rollundertrauma, imagesource, locations, scenarios, isincorporeal, weaponbreakagevitality,
        hasarchetypes, hasmonsterarchetypes, skillsecondary } = body

    const userid = isOwner(user.id) ? null : user.id

    const effectiveTraitLimit = traitlimit > 0 ? traitlimit : null
    const effectiveDevotionLimit = devotionlimit > 0 ? devotionlimit : null
    const effectiveFlawLimit = flawlimit > 0 ? flawlimit : null
    const effectivePassionLimit = passionlimit > 0 ? passionlimit : null

    const beastId = await databaseConnection.beast.add(userid, name, intro, habitat, ecology, senses, diet, meta, sp_atk, sp_def, tactics, size, patreon,
        vitality, panic, stress, createHash(), lootnotes, effectiveTraitLimit, effectiveDevotionLimit, effectiveFlawLimit,
        effectivePassionLimit, plural, thumbnail, rarity, caution, role, combatpoints, socialrole, socialpoints, secondaryrole, skillrole, skillpoints, fatigue,
        defaultrole, socialsecondary, notrauma, knockback, singledievitality, noknockback, rolenameorder, descriptionshare, convictionshare, devotionshare, rollundertrauma,
        imagesource, isincorporeal, weaponbreakagevitality, hasarchetypes, hasmonsterarchetypes, skillsecondary)
        .catch((error: Error) => sendErrorForward('add beast main', error, response))[0].id

    const updateParameters : UpdateParameters = { roles, types, climates }
    await upsertBeast(databaseConnection, beastId, response, updateParameters)

    // send

    // also: don't forget endpoint
}
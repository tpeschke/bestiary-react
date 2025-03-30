import { Response, Request, Error } from "../interfaces/apiInterfaces"
import { ClimateObject, Type, ArtistObject, LocationObject, ConflictObject, Skill, Variant, Reagent, LocationVitality, Folklore, Scenario, Beast, upsertParameters, ArchetypeInfo, Casting, Spell, Role, Movement, CombatStat } from "../interfaces/beastInterfaces"

import getDatabaseConnection from "../utilities/databaseConnection"
import { isOwner } from "../utilities/ownerAccess"
import createHash from "../utilities/hashGeneration"
import upsertBeast from "../utilities/upserts/upsertBeast"
import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../utilities/sendingFunctions'
import {
    getArtistInfo, getClimates, getConflict, getLocations, getTypes, hasAppropriatePateronLevel, getSkills, getFavorite, getNotes, getVariants, getSpecificLoots, getReagents,
    getLocationalVitalities, getFolklore, getLairBasic, getLairAlms, getLairItems, getLairScrolls, getCarriedAlms, getCarriedBasic, getCarriedItems, getCarriedScrolls,
    getScenarios, getTables, getArchetypes, getCasting, getSpells, getChallenges, getObstacles, getRoles,
    getMovement,
    getCombatStats
} from "../utilities/gets/getBeast"
import { Alm, Item, Loot, Scroll, SpecificLoot } from "../interfaces/lootInterfaces"
import { sortOutAnyToTheBottom } from "../utilities/sorts"
import { Challenge, Obstacle } from "../interfaces/skillInterfaces"

const sendErrorForward = sendErrorForwardNoFile('beast controller')

interface BeastRequest extends Request {
    body: Beast
}

export async function addBeast(request: BeastRequest, response: Response) {
    const databaseConnection = getDatabaseConnection(request)
    const { body, user } = request

    let { id, name, intro, climates, habitat, ecology, senses, diet, meta, sp_atk, sp_def, tactics, size, patreon, vitality, panic, stress, types, movements, conflicts,
        skills, variants, specificLoots, reagents, lootnotes, traitlimit, devotionlimit, flawlimit, passionlimit, encounters, plural, thumbnail, rarity,
        locationalVitalities, lairLoot, roles, casting, spells, deletedSpells, challenges, obstacles, caution, role, combatpoints, socialrole, socialpoints, secondaryrole,
        skillrole, skillpoints, fatigue, artistInfo, defaultrole, socialsecondary, notrauma, carriedLoot, folklores, combatStats, knockback, singledievitality, noknockback,
        tables, rolenameorder, descriptionshare, convictionshare, devotionshare, rollundertrauma, imagesource, locations, scenarios, isincorporeal, weaponbreakagevitality,
        hasarchetypes, hasmonsterarchetypes, skillsecondary, atk_skill, def_skill, atk_conf, def_conf } = body

    const userid = isOwner(user.id) ? null : user.id

    const effectiveTraitLimit = traitlimit > 0 ? traitlimit : null
    const effectiveDevotionLimit = devotionlimit > 0 ? devotionlimit : null
    const effectiveFlawLimit = flawlimit > 0 ? flawlimit : null
    const effectivePassionLimit = passionlimit > 0 ? passionlimit : null

    let beastId = id ? id : null
    if (beastId) {
        await databaseConnection.beast.update(beastId, name, intro, habitat, ecology, senses, diet, meta, sp_atk, sp_def, tactics, size, patreon,
            vitality, panic, stress, lootnotes, effectiveTraitLimit, effectiveDevotionLimit, effectiveFlawLimit,
            effectivePassionLimit, plural, thumbnail, rarity, caution, role, combatpoints, socialrole, socialpoints, secondaryrole, skillrole, skillpoints, fatigue,
            defaultrole, socialsecondary, notrauma, knockback, singledievitality, noknockback, rolenameorder, descriptionshare, convictionshare, devotionshare, rollundertrauma,
            imagesource, isincorporeal, weaponbreakagevitality, hasarchetypes, hasmonsterarchetypes, skillsecondary, atk_skill, def_skill, atk_conf, def_conf)
            .catch((error: Error) => sendErrorForward('update main', error, response))
    } else {
        beastId = await databaseConnection.beast.add(userid, name, intro, habitat, ecology, senses, diet, meta, sp_atk, sp_def, tactics, size, patreon,
            vitality, panic, stress, createHash(), lootnotes, effectiveTraitLimit, effectiveDevotionLimit, effectiveFlawLimit,
            effectivePassionLimit, plural, thumbnail, rarity, caution, role, combatpoints, socialrole, socialpoints, secondaryrole, skillrole, skillpoints, fatigue,
            defaultrole, socialsecondary, notrauma, knockback, singledievitality, noknockback, rolenameorder, descriptionshare, convictionshare, devotionshare, rollundertrauma,
            imagesource, isincorporeal, weaponbreakagevitality, hasarchetypes, hasmonsterarchetypes, skillsecondary, atk_skill, def_skill, atk_conf, def_conf)
            .catch((error: Error) => sendErrorForward('add main', error, response))[0].id
    }

    const updateParameters: upsertParameters = {
        roles, types, climates, combatStats, conflicts, skills, movements, variants, specificLoots, reagents, locationalVitalities, locations, artistInfo, scenarios, folklores,
        casting, deletedSpells, spells, obstacles, challenges, tables, encounters, lairLoot, carriedLoot
    }

    if (beastId) {
        await upsertBeast(databaseConnection, beastId, response, updateParameters)
    }

    checkForContentTypeBeforeSending(response, { id: beastId })
}

interface GetRequest extends Request {
    query: GetBeastQuery
}

interface GetBeastQuery {
    edit: string
}

export async function getGMVersionOfBeast(request: GetRequest, response: Response) {
    const beastId = +request.params.id
    const databaseConnection = getDatabaseConnection(request)

    let beast: Beast = await databaseConnection.beast.get(beastId).catch((error: Error) => sendErrorForward('get main', error, response))[0]

    beast.panic = beast.panicstrength
    beast.fatigue = beast.fatiguestrength

    if (hasAppropriatePateronLevel(request.user, beast.patreon, beast.canplayerview)) {
        checkForContentTypeBeforeSending(response, { color: 'red', message: 'You need to update your Patreon tier to access this monster' })
    } else {
        let promiseArray: any[] = []
        const isEditing = request.query.edit === 'true'

        promiseArray.push(getTypes(databaseConnection, response, beast.id).then((types: Type[]) => beast.types = types))
        promiseArray.push(getClimates(databaseConnection, response, beast.id).then((climates: ClimateObject) => beast.climates = climates))
        promiseArray.push(getArtistInfo(databaseConnection, response, beast.id, isEditing).then((artistInfo: ArtistObject) => beast.artistInfo = artistInfo))
        promiseArray.push(getLocations(databaseConnection, response, beast.id, isEditing).then((locations: LocationObject) => beast.locations = locations))
        promiseArray.push(getVariants(databaseConnection, response, beast.id).then((variants: Variant[]) => beast.variants = variants))
        promiseArray.push(getReagents(databaseConnection, response, beast.id).then((reagents: Reagent[]) => beast.reagents = reagents))
        promiseArray.push(getLocationalVitalities(databaseConnection, response, beast.id).then((locationalVitalities: LocationVitality[]) => beast.locationalVitalities = locationalVitalities))
        promiseArray.push(getFolklore(databaseConnection, response, beast.id).then((folklores: Folklore[]) => beast.folklores = folklores))
        promiseArray.push(getScenarios(databaseConnection, response, beast.id).then((scenarios: Scenario[]) => beast.scenarios = scenarios))

        promiseArray.push(getSkills(databaseConnection, response, beast.id).then((skills: Skill[]) => beast.skills = skills))
        promiseArray.push(getChallenges(databaseConnection, response, beast.id).then((challenges: Challenge[]) => beast.challenges = challenges))
        promiseArray.push(getObstacles(databaseConnection, response, beast.id).then((obstacles: Obstacle[]) => beast.obstacles = obstacles))

        promiseArray.push(getConflict(databaseConnection, response, beast.id, isEditing, beast.traitlimit, beast.devotionlimit, beast.flawlimit).then((conflict: ConflictObject) => beast.conflict = conflict))

        promiseArray.push(getSpecificLoots(databaseConnection, response, beast.id).then((specificLoots: SpecificLoot[]) => beast.specificLoots = specificLoots))
        beast.lairLoot = {};
        promiseArray.push(getLairBasic(databaseConnection, response, beast.id).then((basicLoot: Loot) => beast.lairLoot = { ...beast.lairLoot, ...basicLoot }))
        promiseArray.push(getLairAlms(databaseConnection, response, beast.id).then((alms: Alm[]) => beast.lairLoot = { ...beast.lairLoot, alms }))
        promiseArray.push(getLairItems(databaseConnection, response, beast.id, isEditing).then((items: Item[] | Object) => beast.lairLoot = { ...beast.lairLoot, items }))
        promiseArray.push(getLairScrolls(databaseConnection, response, beast.id).then((scrolls: Scroll[]) => beast.lairLoot = { ...beast.lairLoot, scrolls }))
        beast.carriedLoot = {}
        promiseArray.push(getCarriedBasic(databaseConnection, response, beast.id).then((basicLoot: Loot) => beast.carriedLoot = { ...beast.carriedLoot, ...basicLoot }))
        promiseArray.push(getCarriedAlms(databaseConnection, response, beast.id).then((alms: Alm[]) => beast.carriedLoot = { ...beast.carriedLoot, alms }))
        promiseArray.push(getCarriedItems(databaseConnection, response, beast.id, isEditing).then((items: Item[] | Object) => beast.carriedLoot = { ...beast.carriedLoot, items }))
        promiseArray.push(getCarriedScrolls(databaseConnection, response, beast.id).then((scrolls: Scroll[]) => beast.carriedLoot = { ...beast.carriedLoot, scrolls }))

        promiseArray.push(getFavorite(databaseConnection, response, beast.id, request.user.id).then((favorite: boolean) => beast.favorite = favorite))
        promiseArray.push(getNotes(databaseConnection, response, beast.id, request.user.id).then((notes: string) => beast.notes = notes))

        promiseArray.push(getArchetypes(databaseConnection, response, isEditing, beast.hasarchetypes, beast.hasmonsterarchetypes).then((archetypeInfo: ArchetypeInfo | string[] | null) => beast.archetype = archetypeInfo))

        beast.tables = {
            habitat: [],
            attack: [],
            defense: [],
            appearance: []
        }
        getTables(databaseConnection, response, beast.id, beast.tables, promiseArray)

        promiseArray.push(getCasting(databaseConnection, response, beast.id).then((casting: Casting) => beast.casting = casting))
        promiseArray.push(getSpells(databaseConnection, response, beast.id).then((spells: Spell[]) => beast.spells = spells))

        promiseArray.push(getRoles(databaseConnection, response, beast.id, beast.name).then((roles: Role[]) => beast.roles = roles))

        promiseArray.push(getMovement(databaseConnection, response, beast.id).then((movements: Movement[]) => beast.movements = movements))
        promiseArray.push(getCombatStats(databaseConnection, response, beast.id).then((combatStats: CombatStat[]) => beast.combatStats = combatStats))

        Promise.all(promiseArray).then(() => {
            checkForContentTypeBeforeSending(response, beast)
        }).catch((error: Error) => sendErrorForward('get promise.all', error, response))
    }
}
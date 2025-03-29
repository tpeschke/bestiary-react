import { Response, Request, Error } from "../interfaces/apiInterfaces"
import { ClimateObject, Type, ArtistObject, LocationObject, ConflictObject, Skill, Variant, Reagent, LocationVitality, Folklore, Scenario, Beast, upsertParameters, ArchetypeInfo } from "../interfaces/beastInterfaces"

import getDatabaseConnection from "../utilities/databaseConnection"
import { isOwner } from "../utilities/ownerAccess"
import createHash from "../utilities/hashGeneration"
import upsertBeast from "../utilities/upserts/upsertBeast"
import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../utilities/sendingFunctions'
import {
    getArtistInfo, getClimates, getConflict, getLocations, getTypes, hasAppropriatePateronLevel, getSkills, getFavorite, getNotes, getVariants, getSpecificLoots, getReagents,
    getLocationalVitalities, getFolklore, getLairBasic, getLairAlms, getLairItems, getLairScrolls, getCarriedAlms, getCarriedBasic, getCarriedItems, getCarriedScrolls,
    getScenarios,
    getTables,
    getArchetypes
} from "../utilities/gets/getBeast"
import { Alm, Item, Loot, Scroll, SpecificLoot } from "../interfaces/lootInterfaces"
import { sortOutAnyToTheBottom } from "../utilities/sorts"

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
        let promiseArray: any = []
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
        
        // CASTING
        promiseArray.push(db.get.casting(id).then(result => {
            beast.casting = result[0]
        }).catch(e => sendErrorForward('beast casting', e, res)))

        promiseArray.push(db.get.spells(id).then(result => {
            beast.spells = result
        }).catch(e => sendErrorForward('beast spells', e, res)))

        // SKILL CHALLENGES
        promiseArray.push(db.get.challenges(id).then(result => {
            beast.challenges = result
        }).catch(e => sendErrorForward('beast challenges', e, res)))

        promiseArray.push(db.get.obstacles(id).then(result => {
            beast.obstacles = result
        }).catch(e => sendErrorForward('beast obstalces view', e, res)))

        // Roles
        promiseArray.push(db.get.roles(id).then(result => {
            beast.roles = result

            if (beast.name.includes('Template')) {
                beast.roles = beast.roles.sort(sortTemplateRoles)
            }
            beast.roleInfo = {}

            for (i = 0; i < result.length; i++) {
                beast.roleInfo[result[i].id] = {
                    vitality: result[i].vitality,
                    hash: result[i].hash,
                    name: result[i].name,
                    uniqueCombat: result[i].combatcount > 0,
                    uniqueMovement: result[i].movementcount > 0,
                    uniqueLocationalVitality: result[i].locationvitalitycount > 0,
                    role: result[i].role,
                    secondaryrole: result[i].secondaryrole,
                    attack: result[i].attack,
                    defense: result[i].defense,
                    combatpoints: result[i].combatpoints,
                    stress: result[i].stress,
                    socialrole: result[i].socialrole,
                    socialpoints: result[i].socialpoints,
                    skillrole: result[i].skillrole,
                    skillpoints: result[i].skillpoints,
                    socialsecondary: result[i].socialsecondary,
                    skillsecondary: result[i].skillsecondary,
                    size: result[i].size,
                    fatigue: result[i].fatiguestrength,
                    mental: result[i].mental,
                    panic: result[i].panicstrength,
                    knockback: result[i].knockback,
                    largeweapons: result[i].largeweapons,
                    singledievitality: result[i].singledievitality,
                    isincorporeal: result[i].isincorporeal,
                    weaponbreakagevitality: result[i].weaponbreakagevitality,
                    noknockback: result[i].noknockback,
                    descriptionshare: result[i].descriptionshare,
                    convictionshare: result[i].convictionshare,
                    devotionshare: result[i].devotionshare,
                    rollundertrauma: result[i].rollundertrauma,
                    attack_conf: result[i].attack_conf,
                    defense_conf: result[i].defense_conf,
                    attack_skill: result[i].attack_skill,
                    defense_skill: result[i].defense_skill,
                    hasarchetypes: result[i].hasarchetypes,
                    hasmonsterarchetypes: result[i].hasmonsterarchetypes
                }
            }
            return result
        }).catch(e => sendErrorForward('beast roles', e, res)))

        // PROMISE ARRAY
        Promise.all(promiseArray).then(finalArray => {
            finalPromise = [];

            beast.tables.appearance.sort((a, b) => a.label.localeCompare(b.label))
            beast.tables.habitat.sort((a, b) => a.label.localeCompare(b.label))
            beast.tables.attack.sort((a, b) => a.label.localeCompare(b.label))
            beast.tables.defense.sort((a, b) => a.label.localeCompare(b.label))

            finalPromise.push(db.get.movement(id).then(result => {
                beast.movement = result.map(movementType => {
                    const points = movementType.roleid ? beast.roleInfo[movementType.roleid].combatpoints : beast.combatpoints
                    const role = movementType.roleid ? beast.roleInfo[movementType.roleid].role : beast.role
                    movementType.role = role
                    movementType.points = points
                    return combatSquareCtrl.getMovementDirectly(movementType)
                })

                return true
            }).catch(e => sendErrorForward('beast movement 2', e, res)))

            finalPromise.push(db.get.combatStatArray(id).then(result => {
                if (req.query.edit === 'true') {
                    beast.combatStatArray = result
                } else {
                    beast.combatStatArray = result.map(combatSquare => {
                        const points = combatSquare.roleid ? beast.roleInfo[combatSquare.roleid].combatpoints : beast.combatpoints
                        const size = combatSquare.roleid && beast.roleInfo[combatSquare.roleid].size ? beast.roleInfo[combatSquare.roleid].size : beast.size ? beast.size : 'Medium'
                        const role = combatSquare.roleid ? beast.roleInfo[combatSquare.roleid].role : beast.role

                        let equipmentBonuses = { weaponInfo: null, armorInfo: null, shieldInfo: null }
                        if (combatSquare.weapon) {
                            equipmentBonuses.weaponInfo = equipmentCtrl.getWeapon(combatSquare.weapon).bonusLong
                        }
                        if (combatSquare.armor) {
                            equipmentBonuses.armorInfo = equipmentCtrl.getArmor(combatSquare.armor).bonusLong
                        }
                        if (combatSquare.shield) {
                            equipmentBonuses.shieldInfo = equipmentCtrl.getShield(combatSquare.shield).bonusLong
                        }

                        combatSquare.equipmentBonuses = equipmentBonuses

                        let fullCombatSquare = combatSquareCtrl.getSquareDirectly({ combatStats: combatSquare, points, size, role })

                        fullCombatSquare.weaponname = combatSquare.weaponname,
                            fullCombatSquare.weapon = combatSquare.weapon,
                            fullCombatSquare.armor = combatSquare.armor,
                            fullCombatSquare.shield = combatSquare.shield

                        return { combatSquare: fullCombatSquare, combatStats: combatSquare, roleid: combatSquare.roleid, isspecial: combatSquare.isspecial, eua: combatSquare.eua, tdr: combatSquare.tdr }
                    })

                    let armor = null
                        , shield = null
                    if (beast.combatStatArray[0]) {
                        armor = beast.combatStatArray[0].armor
                        shield = beast.combatStatArray[0].shield
                    }
                    beast.phyiscalAndStress = combatSquareCtrl.setVitalityAndStressDirectly(beast.combatpoints, Math.max(beast.combatpoints, beast.skillpoints, beast.socialpoints), beast.role, { mental: beast.mental, panic: beast.panicstrength, fatigue: beast.fatiguestrength, largeweapons: beast.largeweapons, singledievitality: beast.singledievitality, noknockback: beast.noknockback }, beast.secondaryrole, beast.knockback, beast.size ? beast.size : 'Medium', armor, shield)
                    for (let role in beast.roleInfo) {
                        beast.roleInfo[role].phyiscalAndStress = combatSquareCtrl.setVitalityAndStressDirectly(beast.roleInfo[role].combatpoints, Math.max(beast.roleInfo[role].combatpoints, beast.roleInfo[role].skillpoints, beast.roleInfo[role].socialpoints), beast.roleInfo[role].role, { mental: beast.roleInfo[role].mental, panic: beast.roleInfo[role].panic, fatigue: beast.roleInfo[role].fatigue, largeweapons: beast.roleInfo[role].largeweapons, singledievitality: beast.roleInfo[role].singledievitality, noknockback: beast.roleInfo[role].noknockback }, beast.roleInfo[role].secondaryrole, beast.roleInfo[role].knockback, beast.roleInfo[role].size ? beast.roleInfo[role].size : beast.size ? beast.size : 'Medium', armor, shield)
                    }
                }

                beast.combat = {}
                let defenses = []
                let attacks = []
                beast.combatStatArray.forEach(({ beastid, roleid, weaponsmallslashing, weaponsmallcrushing, weaponsmallpiercing,
                    andslashing, andcrushing, flanks, rangeddefence, alldefense, eua, addsizemod, shield, armor, weaponname, rangeddefense,
                    swarmbonus, adjustment, tdr, info, weapontype, piercingweapons, slashingweapons, crushingweapons, attack, isspecial, weapon, measure, recovery,
                }) => {

                    defenses.push({
                        beastid, roleid, weaponsmallslashing, weaponsmallcrushing, weaponsmallpiercing,
                        andslashing, andcrushing, flanks, rangeddefence, alldefense, eua, addsizemod, shield, armor, defensename: weaponname, rangeddefense,
                        swarmbonus, adjustment, tdr, info
                    })

                    attacks.push({
                        beastid, roleid, weapontype, piercingweapons, slashingweapons, crushingweapons, attack, isspecial, addsizemod, weapon, weaponname, measure, recovery, swarmbonus, adjustment,
                        info
                    })
                })
                beast.combat.defenses = defenses
                beast.combat.attacks = attacks

                return result
            }).catch(e => sendErrorForward('beast combat 2', e, res)))

            if (req.query.edit !== 'true') {
                beast.conflict.devotions.forEach(val => {
                    if (val.trait.toUpperCase() === 'ANY') {
                        finalPromise.push(db.get.randomdevotion().then(result => {
                            val.trait = result[0].trait
                        }).catch(e => sendErrorForward('beast random devotion', e, res)))
                    }
                })
            }

            Promise.all(finalPromise).then(actualFinal => {
                beast.conflict.devotions = beast.conflict.devotions.sort(sortOutAnyToTheBottom)
                checkForContentTypeBeforeSending(res, beast)
            }).catch(e => sendErrorForward('beast final promise 2', e, res))
        }).catch(e => sendErrorForward('beast main promise', e, res))
    }
}
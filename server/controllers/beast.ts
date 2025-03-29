import { Response, Request, Error } from "../interfaces/apiInterfaces"
import { ClimateObject, Type, upsertParameters, ArtistObject, LocationObject, ConflictObject } from "../interfaces/beastInterfaces"

import getDatabaseConnection from "../utilities/databaseConnection"
import { isOwner } from "../utilities/ownerAccess"
import createHash from "../utilities/hashGeneration"
import upsertBeast from "../utilities/upserts/upsertBeast"
import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../utilities/sendingFunctions'
import { getArtistInfo, getClimates, getConflict, getLocations, getTypes, hasAppropriatePateronLevel } from "../utilities/gets/getBeast"

const sendErrorForward = sendErrorForwardNoFile('beast controller')

interface BeastRequest extends Request {
    body: BeastRequestBody
}

interface BeastRequestBody extends upsertParameters {
    id: number,
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
    atk_skill: string,
    def_skill: string,
    atk_conf: string,
    def_conf: string
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

    let beast = await databaseConnection.beast.get(beastId).catch((error: Error) => sendErrorForward('get main', error, response))[0]

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
        promiseArray.push(getConflict(databaseConnection, response, beast.id, isEditing, beast.traitlimit, beast.devotionlimit, beast.flawlimit).then((conflict: ConflictObject) => beast.conflict = conflict))

        

        promiseArray.push(db.get.skill(id).then(result => {
            beast.skills = result.sort((a, b) => +b.rank - +a.rank)
            return result
        }).catch(e => sendErrorForward('beast skills', e, res)))

        if (req.user && req.user.id) {
            promiseArray.push(db.get.favorite(req.user.id, id).then(result => {
                if (result.length > 0) {
                    beast.favorite = true
                } else {
                    beast.favorite = false
                }
            }).catch(e => sendErrorForward('beast favorite', e, res)))
        } else {
            beast.favorite = false
        }

        if (req.user) {
            promiseArray.push(db.get.notes(id, req.user.id).then(result => {
                beast.notes = result[0] || {}
                return result
            }).catch(e => sendErrorForward('beast notes', e, res)))
        }

        promiseArray.push(db.get.variants(id).then(result => {
            beast.variants = result
            return result
        }).catch(e => sendErrorForward('beast variants', e, res)))

        promiseArray.push(db.get.loot(id).then(result => {
            beast.loot = result
            return result
        }).catch(e => sendErrorForward('beast loot', e, res)))

        promiseArray.push(db.get.reagents(id).then(result => {
            beast.reagents = result
            return result
        }).catch(e => sendErrorForward('beast pleroma', e, res)))

        promiseArray.push(db.get.locationalvitality(id).then(result => {
            beast.locationalvitality = result
            return result
        }).catch(e => sendErrorForward('beast locational vitality', e, res)))

        promiseArray.push(db.get.folklore(id).then(result => {
            beast.folklore = result
            return result
        }).catch(e => sendErrorForward('beast folklore', e, res)))


        beast.lairloot = {};
        promiseArray.push(db.get.loot.lairbasic(id).then(result => {
            beast.lairloot = { ...result[0], ...beast.lairloot }
            return result
        }).catch(e => sendErrorForward('beast basic', e, res)))

        promiseArray.push(db.get.loot.lairalms(id).then(result => {
            beast.lairloot = { alms: result, ...beast.lairloot }
            return result
        }).catch(e => sendErrorForward('beast alms', e, res)))

        promiseArray.push(db.get.loot.lairitems(id).then(result => {
            if (req.query.edit === 'true') {
                beast.lairloot = { items: objectifyItemArray(result), ...beast.lairloot }
            } else {
                beast.lairloot = { items: result, ...beast.lairloot }
            }
            return result
        }).catch(e => sendErrorForward('beast items', e, res)))

        promiseArray.push(db.get.loot.lairscrolls(id).then(result => {
            beast.lairloot = { scrolls: result, ...beast.lairloot }
            return result
        }).catch(e => sendErrorForward('beast scrolls', e, res)))

        promiseArray.push(db.get.loot.carriedbasic(id).then(result => {
            beast.carriedloot = { ...result[0], ...beast.carriedloot }
            return result
        }).catch(e => sendErrorForward('beast carried basic', e, res)))

        promiseArray.push(db.get.loot.carriedalms(id).then(result => {
            beast.carriedloot = { alms: result, ...beast.carriedloot }
            return result
        }).catch(e => sendErrorForward('beast carried alms', e, res)))

        promiseArray.push(db.get.loot.carrieditems(id).then(result => {
            if (req.query.edit === 'true') {
                beast.carriedloot = { items: objectifyItemArray(result), ...beast.carriedloot }
            } else {
                beast.carriedloot = { items: result, ...beast.carriedloot }
            }
            return result
        }).catch(e => sendErrorForward('beast carried items', e, res)))

        promiseArray.push(db.get.loot.carriedscrolls(id).then(result => {
            beast.carriedloot = { scrolls: result, ...beast.carriedloot }
            return result
        }).catch(e => sendErrorForward('beast carried scrolls', e, res)))

        promiseArray.push(db.get.ranks(id).then(result => {
            beast.ranks = result
            return result
        }).catch(e => sendErrorForward('beast carried ranks', e, res)))

        promiseArray.push(db.get.scenarios(id).then(result => {
            beast.scenarios = result
            return result
        }).catch(e => sendErrorForward('beast carried scenarios', e, res)))

        beast.tables = {
            habitat: [],
            attack: [],
            defense: [],
            appearance: []
        }

        promiseArray.push(db.get.tableinfo(id).then(result => {
            let tablePromiseArray = []
            result.map(table => {
                tablePromiseArray.push(db.get.rows(table.id).then(rows => {
                    if (table.section === 'ap') {
                        beast.tables.appearance.push({
                            ...table,
                            rows
                        })
                    } else if (table.section === 'ha') {
                        beast.tables.habitat.push({
                            ...table,
                            rows
                        })
                    } else if (table.section === 'at') {
                        beast.tables.attack.push({
                            ...table,
                            rows
                        })
                    } else if (table.section === 'de') {
                        beast.tables.defense.push({
                            ...table,
                            rows
                        })
                    }
                    return true
                }).catch(e => sendErrorForward('beast table rows', e, res)))
            })
            return Promise.all(tablePromiseArray).then(finalArray => {
                return true
            }).catch(e => sendErrorForward('beast tables final promise', e, res))
        }).catch(e => sendErrorForward('beast tables', e, res)))

        if (req.query.edit !== 'true') {
            promiseArray.push(db.get.archetype().then(result => {
                const chance = Math.floor(Math.random() * 100)
                beast.archetype = {
                    archetype: result[0].archetype,
                    deviation: chance > 51 && chance < 75,
                    reverse: chance > 75
                }
            }))

            promiseArray.push(db.get.monsterArchetype().then(result => {
                beast.archetypemonster = result
            }))
        }

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

        promiseArray.push(db.get.casting(id).then(result => {
            beast.casting = result[0]
        }).catch(e => sendErrorForward('beast casting', e, res)))

        promiseArray.push(db.get.spells(id).then(result => {
            beast.spells = result
        }).catch(e => sendErrorForward('beast spells', e, res)))

        promiseArray.push(db.get.challenges(id).then(result => {
            beast.challenges = result
        }).catch(e => sendErrorForward('beast challenges', e, res)))

        promiseArray.push(db.get.obstacles(id).then(result => {
            beast.obstacles = result
        }).catch(e => sendErrorForward('beast obstalces view', e, res)))

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
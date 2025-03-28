import { Response, Error } from '../interfaces/apiInterfaces'
import { ClimateEditObject, Climate, Role, Type, CombatStat, Conflict, Skill, Movement, Variant, Loot, Reagent, LocationVitality, Location, ArtistInfo, ArtistEditObject, upsertParameters, Scenario, Folklore, Spell, Obstacle, Challenge } from '../interfaces/beastInterfaces'

import createHash from './hashGeneration'
import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../utilities/sendingFunctions'

const sendErrorForward = sendErrorForwardNoFile('upsert beast')

export default async function upsertBeast(databaseConnection: any, beastId: number, response: Response, upsertParameters: upsertParameters) {
    const { roles, types, climates, combatStats, conflicts, skills, movements, variants, loots, reagents, locationalVitalities, locations, artistInfo, scenarios,
        folklores, casting, deletedSpells, spells, obstacles, challenges } = upsertParameters

    let promiseArray: any[] = []

    upsertRoles(promiseArray, databaseConnection, beastId, response, roles)
    upsertTypes(promiseArray, databaseConnection, beastId, response, types)
    upsertClimates(promiseArray, databaseConnection, beastId, response, climates)
    upsertCombats(promiseArray, databaseConnection, beastId, response, combatStats)
    upsertConflict(promiseArray, databaseConnection, beastId, response, conflicts)
    upsertSkills(promiseArray, databaseConnection, beastId, response, skills)
    upsertMovement(promiseArray, databaseConnection, beastId, response, movements)
    upsertVariants(promiseArray, databaseConnection, beastId, response, variants)
    upsertLoot(promiseArray, databaseConnection, beastId, response, loots)
    upsertReagents(promiseArray, databaseConnection, beastId, response, reagents)
    upsertLocationalVitality(promiseArray, databaseConnection, beastId, response, locationalVitalities)
    upsertLocations(promiseArray, databaseConnection, beastId, response, locations)
    upsertArtist(promiseArray, databaseConnection, beastId, response, artistInfo)
    upsertScenarios(promiseArray, databaseConnection, beastId, response, scenarios)
    upsertFolklore(promiseArray, databaseConnection, beastId, response, folklores)

    upsertCasting(promiseArray, databaseConnection, beastId, response, casting)
    deleteFromSpellList(promiseArray, databaseConnection, beastId, response, deletedSpells)
    upsertSpells(promiseArray, databaseConnection, beastId, response, spells)

    upsertObstacles(promiseArray, databaseConnection, beastId, response, obstacles)
    upsertChallenges(promiseArray, databaseConnection, beastId, response, challenges)

    // let { appearance, habitat, attack, defense } = tables
    // upsertHelper.deleteTables(promiseArray, databaseConnection, beastId, response, appearance, habitat, attack, defense)
    // upsertHelper.upsertApperanceTable(promiseArray, databaseConnection, beastId, response, appearance)
    // upsertHelper.upsertHabitatTable(promiseArray, databaseConnection, beastId, response, habitat)
    // upsertHelper.upsertAttackTable(promiseArray, databaseConnection, beastId, response, attack)
    // upsertHelper.upsertDefenseTable(promiseArray, databaseConnection, beastId, response, defense)

    // let { temperament, signs, rank, noun, verb, groups, numbers } = encounter;
    // upsertHelper.upsertTemperament(promiseArray, databaseConnection, beastId, response, temperament)
    // upsertHelper.upsertGroups(promiseArray, databaseConnection, beastId, response, groups)
    // upsertHelper.upsertNumbers(promiseArray, databaseConnection, beastId, response, numbers)
    // upsertHelper.upsertSigns(promiseArray, databaseConnection, beastId, response, signs)
    // upsertHelper.upsertVerb(promiseArray, databaseConnection, beastId, response, verb)
    // upsertHelper.upsertNoun(promiseArray, databaseConnection, beastId, response, noun)

    // let { copper, silver, gold, potion, relic, enchanted, scrolls, alms, talisman, items } = lairloot
    // upsertHelper.upsertLairBasic(promiseArray, databaseConnection, id, response, beastid, copper, silver, gold, potion, relic, enchanted, talisman)
    // upsertHelper.upsertScrollsLair(promiseArray, databaseConnection, id, response, scrolls)
    // upsertHelper.upsertAlmsLair(promiseArray, databaseConnection, id, response, alms)
    // upsertHelper.upsertItemsLair(promiseArray, databaseConnection, id, response, items)

    // let { copper: ccopper, silver: csilver, gold: cgold, potion: cpotion, relic: crelic, enchanted: cenchanted, scrolls: cscrolls, alms: calms, items: citems, talisman: ctalisman } = carriedloot
    // upsertHelper.upsertBasicCarried(promiseArray, databaseConnection, id, response, beastid, ccopper, csilver, cgold, cpotion, crelic, cenchanted, ctalisman)
    // upsertHelper.upsertScrollsCarried(promiseArray, databaseConnection, id, response, cscrolls)
    // upsertHelper.upsertAlmsCarried(promiseArray, databaseConnection, id, response, calms)
    // upsertHelper.upsertItemsCarried(promiseArray, databaseConnection, id, response, citems)

    Promise.all(promiseArray).then(() => {
        //     catalogCtrl.collectCatalog(app)
        checkForContentTypeBeforeSending(response, { id: beastId })
    }).catch((error: Error) => sendErrorForward('final promise', error, response))
}

async function upsertRoles(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, roles: Role[]) {
    await databaseConnection.beast.role.delete([beastId, ['', ...roles.map(roles => roles.id)]]).catch((error: Error) => sendErrorForward('delete roles', error, response))

    roles.forEach((roleInfo: Role) => {
        const { id: roleid, vitality, name, role, attack, defense, secondaryrole, combatpoints, stress, panic, socialrole, socialpoints, skillrole, skillpoints, socialsecondary,
            size, fatigue, largeweapons, mental, knockback, singledievitality, noknockback, rollundertrauma, attack_skill, defense_skill, attack_conf, defense_conf, isincorporeal,
            weaponbreakagevitality, hasarchetypes, hasmonsterarchetypes, skillsecondary } = roleInfo
        let { hash = createHash() } = roleInfo

        promiseArray.push(
            databaseConnection.beast.role.upsert(roleid, beastId, vitality, hash, name, role, attack, defense, secondaryrole, combatpoints, stress, panic, socialrole, socialpoints,
                skillrole, skillpoints, socialsecondary, size, fatigue, largeweapons, mental, knockback, singledievitality, noknockback, rollundertrauma, attack_skill, defense_skill,
                attack_conf, defense_conf, isincorporeal, weaponbreakagevitality, hasarchetypes, hasmonsterarchetypes, skillsecondary)
                .catch((error: Error) => sendErrorForward('upsert roles', error, response))
        )
    })
}

async function upsertTypes(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, types: Type[]) {
    types.forEach((type: Type) => {
        if (!type.id) {
            promiseArray.push(databaseConnection.beast.type.add(beastId, type.typeid).catch((error: Error) => sendErrorForward('add types', error, response)))
        } else if (type.deleted) {
            promiseArray.push(databaseConnection.beast.type.delete(type.id).catch((error: Error) => sendErrorForward('delete types', error, response)))
        }
    })
}

async function upsertClimates(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, climates: ClimateEditObject) {
    climates.beast.forEach((climate: Climate) => {
        if (climate.deleted) {
            promiseArray.push(databaseConnection.beast.climate.delete(climate.uniqueid).catch((error: Error) => sendErrorForward('delete climate', error, response)))
        } else if (!climate.uniqueid) {
            promiseArray.push(databaseConnection.beast.climate.add(beastId, climate.climateid).catch((error: Error) => sendErrorForward('add climate', error, response)))
        }
    })
}

async function upsertCombats(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, combatStats: CombatStat[]) {
    await databaseConnection.combatStat.beast.delete([beastId, [0, ...combatStats.map(combatStat => combatStat.id)]]).catch((error: Error) => sendErrorForward('delete combat', error, response))

    combatStats.forEach((combatStat: CombatStat) => {
        const { id, roleid, piercingweapons, slashingweapons, crushingweapons, weaponsmallslashing,
            weaponsmallcrushing, weaponsmallpiercing, andslashing, andcrushing, flanks, rangeddefence, alldefense, allaround, armorandshields,
            unarmored, attack, isspecial, eua, addsizemod, weapon, shield, armor, weaponname, rangeddefense, initiative, measure, recovery, showonlydefenses,
            weapontype, rangedistance, swarmbonus, adjustment, tdr, info } = combatStat
        if (!id) {
            promiseArray.push(
                databaseConnection.combatStat.beast.add(beastId, roleid, piercingweapons, slashingweapons, crushingweapons, weaponsmallslashing,
                    weaponsmallcrushing, weaponsmallpiercing, andslashing, andcrushing, flanks, rangeddefence, alldefense, allaround, armorandshields,
                    unarmored, attack, isspecial, eua, addsizemod, weapon, shield, armor, weaponname, rangeddefense, initiative, measure, recovery, showonlydefenses,
                    weapontype, rangedistance, swarmbonus, adjustment, tdr, info).catch((error: Error) => sendErrorForward('add combat', error, response))
            )
        } else {
            promiseArray.push(
                databaseConnection.combatStat.beast.update(id, beastId, roleid, piercingweapons, slashingweapons, crushingweapons, weaponsmallslashing,
                    weaponsmallcrushing, weaponsmallpiercing, andslashing, andcrushing, flanks, rangeddefence, alldefense, allaround, armorandshields,
                    unarmored, attack, isspecial, eua, addsizemod, weapon, shield, armor, weaponname, rangeddefense, initiative, measure, recovery, showonlydefenses,
                    weapontype, rangedistance, swarmbonus, adjustment, tdr, info).catch((error: Error) => sendErrorForward('update combat', error, response))
            )
        }
    })
}

async function upsertConflict(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, conflicts: Conflict[]) {
    let newConflict: Conflict[] = []
    Object.keys(conflicts).forEach(key => newConflict = [...newConflict, ...conflicts[key]])
    newConflict.forEach((conflict: Conflict) => {
        const { trait, value, type, id, deleted, socialroleid, allroles, severity, strength, adjustment } = conflict
        if (deleted) {
            promiseArray.push(databaseConnection.beast.conflict.delete(id).catch((error: Error) => sendErrorForward('delete confrontation', error, response)))
        } else if (!id) {
            promiseArray.push(databaseConnection.beast.conflict.add(beastId, trait, value, type, socialroleid, allroles, severity, strength, adjustment).catch((error: Error) => sendErrorForward('add confrontation', error, response)))
        } else {
            promiseArray.push(databaseConnection.beast.conflict.update(beastId, trait, value, type, id, socialroleid, allroles, severity, strength, adjustment).catch((error: Error) => sendErrorForward('update roles', error, response)))
        }
    })
}

async function upsertSkills(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, skills: Skill[]) {
    skills.forEach((singleSkill: Skill) => {
        const { skill, rank, id, deleted, skillroleid, allroles, strength, adjustment } = singleSkill
        if (deleted) {
            promiseArray.push(databaseConnection.beast.skill.delete(id).catch((error: Error) => sendErrorForward('delete skills', error, response)))
        } else if (!id) {
            promiseArray.push(databaseConnection.beast.skill.add(beastId, skill, rank, skillroleid, allroles, strength, adjustment).catch((error: Error) => sendErrorForward('add skills', error, response)))
        } else {
            promiseArray.push(databaseConnection.beast.skill.update(beastId, skill, rank, id, skillroleid, allroles, strength, adjustment).catch((error: Error) => sendErrorForward('update skills', error, response)))
        }
    })
}

async function upsertMovement(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, movements: Movement[]) {
    movements.forEach((movement: Movement) => {
        const { stroll, walk, jog, run, sprint, type, id, deleted, roleid, allroles, strollstrength, walkstrength, jogstrength, runstrength, sprintstrength, adjustment } = movement
        if (deleted) {
            promiseArray.push(databaseConnection.beast.movement.delete(id).catch((error: Error) => sendErrorForward('delete movement', error, response)))
        } else if (!id) {
            promiseArray.push(databaseConnection.beast.movement.add(beastId, stroll, walk, jog, run, sprint, type, roleid, allroles, strollstrength, walkstrength, jogstrength, runstrength, sprintstrength, adjustment).catch((error: Error) => sendErrorForward('add movement', error, response)))
        } else {
            promiseArray.push(databaseConnection.beast.movement.update(beastId, stroll, walk, jog, run, sprint, type, id, roleid, allroles, strollstrength, walkstrength, jogstrength, runstrength, sprintstrength, adjustment).catch((error: Error) => sendErrorForward('update movement', error, response)))
        }
    })
}

async function upsertVariants(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, variants: Variant[]) {
    variants.forEach(({ id, variantid, deleted }) => {
        if (deleted) {
            promiseArray.push(databaseConnection.beast.variant.delete(beastId, variantid).catch((error: Error) => sendErrorForward('delete variant 1', error, response)))
            promiseArray.push(databaseConnection.beast.variant.delete(variantid, beastId).catch((error: Error) => sendErrorForward('delete variant 2', error, response)))
        } else if (!id) {
            promiseArray.push(databaseConnection.beast.variant.add(beastId, variantid).catch((error: Error) => sendErrorForward('add variant 1', error, response)))
            promiseArray.push(databaseConnection.beast.variant.add(variantid, beastId).catch((error: Error) => sendErrorForward('add variant 2', error, response)))
        }
    })
}

async function upsertLoot(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, loot: Loot[]) {
    loot.forEach((singleLoot: Loot) => {
        const { loot, price, id, deleted } = singleLoot
        if (deleted) {
            promiseArray.push(databaseConnection.beast.loot.delete(id).catch((error: Error) => sendErrorForward('delete loot', error, response)))
        } else if (!id) {
            promiseArray.push(databaseConnection.beast.loot.add(beastId, loot, price).catch((error: Error) => sendErrorForward('add loot', error, response)))
        } else {
            promiseArray.push(databaseConnection.beast.loot.update(beastId, loot, price, id).catch((error: Error) => sendErrorForward('update loot', error, response)))
        }
    })
}

async function upsertReagents(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, reagents: Reagent[]) {
    reagents.forEach((reagent: Reagent) => {
        const { name, spell, difficulty, harvest, id: reagentId, deleted } = reagent
        if (deleted) {
            promiseArray.push(databaseConnection.beast.reagent.delete(reagentId).catch((error: Error) => sendErrorForward('delete pleroma', error, response)))
        } else if (!reagentId) {
            promiseArray.push(databaseConnection.beast.reagent.add(beastId, name, spell, difficulty, harvest).catch((error: Error) => sendErrorForward('add pleroma', error, response)))
        } else {
            promiseArray.push(databaseConnection.beast.reagent.update(beastId, name, spell, difficulty, harvest, reagentId).catch((error: Error) => sendErrorForward('update pleroma', error, response)))
        }
    })
}
async function upsertLocationalVitality(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, locationalVitalities: LocationVitality[]) {
    locationalVitalities.forEach((locationalVitality: LocationVitality) => {
        const { id, location, vitality, beastid, deleted, roleid, allroles } = locationalVitality
        if (deleted) {
            promiseArray.push(databaseConnection.beast.locationalVitality.delete(id).catch((error: Error) => sendErrorForward('delete locational vitality', error, response)))
        } else if (id && beastid) {
            promiseArray.push(databaseConnection.beast.locationalVitality.update(beastid, location, vitality, id, roleid, allroles).catch((error: Error) => sendErrorForward('update locational vitality', error, response)))
        } else {
            promiseArray.push(databaseConnection.beast.locationalVitality.add(beastId, location, vitality, allroles, roleid).catch((error: Error) => sendErrorForward('add locational vitality', error, response)))
        }
    })
}

async function upsertLocations(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, locations: Location[]) {
    locations.forEach((singleLocation: Location) => {
        const { deleted, id, locationid, location, link } = singleLocation
        if (deleted) {
            promiseArray.push(databaseConnection.beast.location.delete(id).catch((error: Error) => sendErrorForward('delete location', error, response)))
        } else {
            if (!locationid) {
                promiseArray.push(databaseConnection.beast.location.addToAll(location, link).catch((error: Error) => sendErrorForward('add location to list', error, response)))
            }
            if (!id) {
                promiseArray.push(databaseConnection.beast.location.add(beastId, locationid).catch((error: Error) => sendErrorForward('add location', error, response)))
            }
        }
    })
}

async function upsertArtist(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, artistInfo: ArtistEditObject) {

    async function updateArtist(artistInfo: ArtistInfo) {
        let { id, artistid, artist, tooltip, link, roleid } = artistInfo;
        if (artist) {
            if (!artistid) {
                const newArtistId = await databaseConnection.beast.artist.addToAll(artist, tooltip, link).catch((error: Error) => sendErrorForward('add all artists', error, response))[0].id
                addOrUpdateBeastArtistInfo(id, beastId, newArtistId, roleid)
            } else {
                addOrUpdateBeastArtistInfo(id, beastId, artistid, roleid)
            }
        }
    }

    function addOrUpdateBeastArtistInfo(id: number, beastId: number, artistId: number, roleId: string) {
        if (id) {
            promiseArray.push(databaseConnection.beast.update.artist(id, artistId).catch((error: Error) => sendErrorForward('update artist', error, response)))
        } else {
            promiseArray.push(databaseConnection.beast.add.artist(beastId, artistId, roleId).catch((error: Error) => sendErrorForward('add artist', error, response)))
        }
    }

    const { roleartists } = artistInfo
    if (roleartists && roleartists.length > 0) {
        roleartists.forEach((role: ArtistInfo) => {
            updateArtist(role)
        })
    }
}

async function upsertScenarios(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, scenarios: Scenario[]) {
    await databaseConnection.scenario.delete([beastId, [0, ...scenarios.map(scenario => scenario.id)]]).catch((error: Error) => sendErrorForward('delete folkore', error, response))
    scenarios.forEach((singleScenario: Scenario) => {
        const { id, scenario } = singleScenario
        if (!id) {
            promiseArray.push(databaseConnection.beast.scenario.add(beastId, scenario).catch((error: Error) => sendErrorForward('add scenario', error, response)))
        } else {
            promiseArray.push(databaseConnection.beast.scenario.update(id, scenario).catch((error: Error) => sendErrorForward('update scenario', error, response)))
        }
    })
}

async function upsertFolklore(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, folklore: Folklore[]) {
    await databaseConnection.folklore.delete([beastId, [0, ...folklore.map(folklore => folklore.id)]]).catch((error: Error) => sendErrorForward('delete folkore', error, response))
    folklore.forEach((folklore: Folklore) => {
        const { id, belief, truth } = folklore
        if (!id) {
            promiseArray.push(databaseConnection.beast.folklore.add(beastId, belief, truth).catch((error: Error) => sendErrorForward('add folklore', error, response)))
        } else {
            promiseArray.push(databaseConnection.beast.folklore.update(id, beastId, belief, truth).catch((error: Error) => sendErrorForward('update folklore', error, response)))
        }
    })
}

async function upsertCasting(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, casting) {
    if (casting.beastid) {
        const { augur, wild, vancian, spellnumberdie, manifesting, commanding, bloodpact, defaulttype } = casting
        promiseArray.push(databaseConnection.beast.casting.update(augur, wild, vancian, spellnumberdie, manifesting, commanding, bloodpact, defaulttype, beastId).catch((error: Error) => sendErrorForward('update casting', error, response)))
    } else {
        promiseArray.push(databaseConnection.beast.casting.update(null, null, null, 'd4', null, null, null, null, beastId).catch((error: Error) => sendErrorForward('update casting 2', error, response)))
    }
}

async function deleteFromSpellList(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, deletedSpellList: number[]) {
    deletedSpellList.forEach((spellId: number) => {
        promiseArray.push(databaseConnection.beast.spell.delete(spellId, beastId).catch((error: Error) => sendErrorForward('delete spell', error, response)))
    })
}

async function upsertSpells(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, spells: Spell[]) {
    spells.forEach((spell: Spell) => {
        const { id, name, origin, shape, range, interval, effect, allroles, roleid, resist } = spell
        if (id) {
            promiseArray.push(databaseConnection.beast.spell.update(id, name, origin, shape, range, interval, effect, beastId, allroles, roleid, resist).catch((error: Error) => sendErrorForward('update spell', error, response)))
        } else {
            promiseArray.push(databaseConnection.beast.spell.add(id, name, origin, shape, range, interval, effect, beastId, allroles, roleid, resist).catch((error: Error) => sendErrorForward('add spell', error, response)))
        }
    })
}

async function upsertObstacles(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, obstacles: Obstacle[]) {
    await databaseConnection.skill.obstacle.delete([beastId, [0, ...obstacles.map(obstacles => obstacles.id)]]).catch(e => sendErrorForward('delete obstacles', e, response))

    obstacles.forEach((obstacle) => {
        const { id, obstacleid, notes } = obstacle
        if (!id) {
            promiseArray.push(databaseConnection.skill.obstacle.add(beastId, obstacleid, notes).catch(e => sendErrorForward('add obstacles', e, response)))
        }
    })
}

async function upsertChallenges(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, challenges: Challenge[]) {
    await databaseConnection.skill.challenge.delete([beastId, [0, ...challenges.map(challenges => challenges.id)]]).catch((error: Error) => sendErrorForward('delete challenges', error, response))

    challenges.forEach((challenge: Challenge) => {
        const { id, challengeid } = challenge
        if (!id) {
            promiseArray.push(databaseConnection.skill.challenge.add(beastId, challengeid).catch((error: Error) => sendErrorForward('add challenges', error, response)))
        }
    })
}

//                                                     deleteTables: (promiseArray, db, id, res, appearance, habitat, attack, defense) => {
//                                                         promiseArray.push(db.delete.table(id, [0, ...appearance.map(table => table.id), ...habitat.map(table => table.id), ...attack.map(table => table.id), ...defense.map(table => table.id)]))
//                                                     },
//                                                         upsertApperanceTable: (promiseArray, db, id, res, appearance) => {
//                                                             appearance.forEach(table => {
//                                                                 if (table.id) {
//                                                                     promiseArray.push(db.update.all.tables(table.id, table.label).catch(e => sendErrorForward('update beast appearance all tables', e, res)))
//                                                                     db.delete.rows([table.id, [0, ...table.rows.map(row => row.id)]]).then(_ => {
//                                                                         table.rows.forEach(({ weight, value, id: rowid }) => {
//                                                                             promiseArray.push(db.add.row(rowid, table.id, weight, value).catch(e => sendErrorForward('update beast appearance add rows', e, res)))
//                                                                         })
//                                                                     }).catch(e => sendErrorForward('update beast appearance delete row', e, res))
//                                                                 } else {
//                                                                     promiseArray.push(db.add.all.tables(table.label, 'ap').then(result => {
//                                                                         promiseArray.push(db.add.table(id, result[0].id).catch(e => sendErrorForward('update beast appearance add table2 ', e, res)))
//                                                                         db.delete.rows([result[0].id, [0, ...table.rows.map(row => row.id)]]).then(_ => {
//                                                                             table.rows.forEach(({ weight, value, id: rowid }) => {
//                                                                                 promiseArray.push(db.add.row(rowid, result[0].id, weight, value).catch(e => sendErrorForward('update beast appearance add rows 2', e, res)))
//                                                                             })
//                                                                         }).catch(e => sendErrorForward('update beast appearance delete rows 2', e, res))
//                                                                     }).catch(e => sendErrorForward('update beast appearance all tables 2', e, res)))
//                                                                 }
//                                                             })
//                                                         },
//                                                             upsertHabitatTable: (promiseArray, db, id, res, habitat) => {
//                                                                 habitat.forEach(table => {
//                                                                     if (table.id) {
//                                                                         promiseArray.push(db.update.all.tables(table.id, table.label).catch(e => sendErrorForward('update beast habitat all tables', e, res)))
//                                                                         db.delete.rows([table.id, [0, ...table.rows.map(row => row.id)]]).then(_ => {
//                                                                             table.rows.forEach(({ weight, value, id: rowid }) => {
//                                                                                 promiseArray.push(db.add.row(rowid, table.id, weight, value).catch(e => sendErrorForward('update beast habitat add rows', e, res)))
//                                                                             })
//                                                                         }).catch(e => sendErrorForward('update beast habitat delete rows', e, res))
//                                                                     } else {
//                                                                         promiseArray.push(db.add.all.tables(table.label, 'ha').then(result => {
//                                                                             promiseArray.push(db.add.table(id, result[0].id))
//                                                                             db.delete.rows([result[0].id, [0, ...table.rows.map(row => row.id)]]).then(_ => {
//                                                                                 table.rows.forEach(({ weight, value, id: rowid }) => {
//                                                                                     promiseArray.push(db.add.row(rowid, result[0].id, weight, value).catch(e => sendErrorForward('update beast habitat add rows 2', e, res)))
//                                                                                 })
//                                                                             }).catch(e => sendErrorForward('update beast habitat delete rows 2', e, res))
//                                                                         }).catch(e => sendErrorForward('update beast habitat all tables 2', e, res)))
//                                                                     }
//                                                                 })
//                                                             },
//                                                                 upsertAttackTable: (promiseArray, db, id, res, attack) => {
//                                                                     attack.forEach(table => {
//                                                                         if (table.id) {
//                                                                             promiseArray.push(db.update.all.tables(table.id, table.label).catch(e => sendErrorForward('update beast attack all tables', e, res)))
//                                                                             db.delete.rows([table.id, [0, ...table.rows.map(row => row.id)]]).then(_ => {
//                                                                                 table.rows.forEach(({ weight, value, id: rowid }) => {
//                                                                                     promiseArray.push(db.add.row(rowid, table.id, weight, value).catch(e => sendErrorForward('update beast attack add rows', e, res)))
//                                                                                 })
//                                                                             }).catch(e => sendErrorForward('update beast attack delete rows', e, res))
//                                                                         } else {
//                                                                             promiseArray.push(db.add.all.tables(table.label, 'at').then(result => {
//                                                                                 promiseArray.push(db.add.table(id, result[0].id))
//                                                                                 db.delete.rows([result[0].id, [0, ...table.rows.map(row => row.id)]]).then(_ => {
//                                                                                     table.rows.forEach(({ weight, value, id: rowid }) => {
//                                                                                         promiseArray.push(db.add.row(rowid, result[0].id, weight, value).catch(e => sendErrorForward('update beast attack add rows 2', e, res)))
//                                                                                     })
//                                                                                 }).catch(e => sendErrorForward('update beast attack delete rows 2', e, res))
//                                                                             }).catch(e => sendErrorForward('update beast attack all tables 2', e, res)))
//                                                                         }
//                                                                     })
//                                                                 },
//                                                                     upsertDefenseTable: (promiseArray, db, id, res, defense) => {
//                                                                         defense.forEach(table => {
//                                                                             if (table.id) {
//                                                                                 promiseArray.push(db.update.all.tables(table.id, table.label).catch(e => sendErrorForward('update beast defense all tables', e, res)))
//                                                                                 db.delete.rows([table.id, [0, ...table.rows.map(row => row.id)]]).then(_ => {
//                                                                                     table.rows.forEach(({ weight, value, id: rowid }) => {
//                                                                                         promiseArray.push(db.add.row(rowid, table.id, weight, value).catch(e => sendErrorForward('update beast defense add rows', e, res)))
//                                                                                     })
//                                                                                 }).catch(e => sendErrorForward('update beast defense delete rows', e, res))
//                                                                             } else {
//                                                                                 promiseArray.push(db.add.all.tables(table.label, 'de').then(result => {
//                                                                                     promiseArray.push(db.add.table(id, result[0].id).catch(e => sendErrorForward('update beast defense all tables 2', e, res)))
//                                                                                     db.delete.rows([result[0].id, [0, ...table.rows.map(row => row.id)]]).then(_ => {
//                                                                                         table.rows.forEach(({ weight, value, id: rowid }) => {
//                                                                                             promiseArray.push(db.add.row(rowid, result[0].id, weight, value).catch(e => sendErrorForward('update beast defense add rows', e, res)))
//                                                                                         })
//                                                                                     }).catch(e => sendErrorForward('update beast defense delete rows ', e, res))
//                                                                                 }).catch(e => sendErrorForward('update beast defense all tables 2', e, res)))
//                                                                             }
//                                                                         })
//                                                                     },
//                                                                         upsertTemperament: (promiseArray, db, id, res, temperament) => {
//                                                                             temperament.temperament.forEach(({ temperament: temp, weight, id: tempid, beastid, tooltip, deleted }) => {
//                                                                                 if (deleted) {
//                                                                                     promiseArray.push(db.delete.encounter.temperament(beastid, tempid).catch(e => sendErrorForward('update beast delete temp', e, res)))
//                                                                                 } else if ((tempid && !beastid) || (tempid && beastid !== id)) {
//                                                                                     promiseArray.push(db.add.encounter.temperament(id, tempid, weight).catch(e => sendErrorForward('update beast add temp', e, res)))
//                                                                                 } else if (tempid && beastid) {
//                                                                                     promiseArray.push(db.update.encounter.temperament(weight, beastid, tempid).catch(e => sendErrorForward('update beast update temp', e, res)))
//                                                                                 } else if (!tempid) {
//                                                                                     db.add.encounter.allTemp(temp, tooltip).then(result => {
//                                                                                         promiseArray.push(db.add.encounter.temperament(id, result[0].id, weight).catch(e => sendErrorForward('update beast add temp 2', e, res)))
//                                                                                     }).catch(e => sendErrorForward('update beast add all temp', e, res))
//                                                                                 }
//                                                                             })
//                                                                         },
//                                                                             upsertGroups: (promiseArray, db, id, res, groups) => {
//                                                                                 groups.forEach(({ id: groupid, beastid, deleted, label, weights, weight }) => {
//                                                                                     if (deleted) {
//                                                                                         promiseArray.push(db.delete.encounter.groups(id, groupid).then(_ => db.delete.encounter.groupRoles(beastid, groupid).catch(e => sendErrorForward('update beast delete group roles', e, res))).catch(e => sendErrorForward('update beast delete groups', e, res)))
//                                                                                     } else if (groupid && beastid) {
//                                                                                         promiseArray.push(db.update.encounter.groups(beastid, groupid, label, +weight).then(_ => {
//                                                                                             let groupPromises = []
//                                                                                             weights.forEach(({ id: roleid, weight: roleweight, role, deleted }) => {
//                                                                                                 if (deleted && roleid) {
//                                                                                                     groupPromises.push(db.delete.encounter.groupRoles(id, roleid).catch(e => sendErrorForward('update beast delete groups role', e, res)))
//                                                                                                 } else if (roleid) {
//                                                                                                     groupPromises.push(db.update.encounter.groupRoles(id, roleid, groupid, +roleweight, role).catch(e => sendErrorForward('update beast update groups role', e, res)))
//                                                                                                 } else {
//                                                                                                     groupPromises.push(db.add.encounter.groupRoles(id, groupid, +roleweight, role).catch(e => sendErrorForward('update beast add groups role', e, res)))
//                                                                                                 }
//                                                                                             })
//                                                                                             return Promise.all(groupPromises)
//                                                                                         }).catch(e => sendErrorForward('update beast update groups', e, res)))
//                                                                                     } else if (!groupid) {
//                                                                                         promiseArray.push(db.add.encounter.groups(id, label, +weight).then(result => {
//                                                                                             let groupPromises = []
//                                                                                             groupid = result[0].id
//                                                                                             weights.forEach(({ id: roleid, weight: roleweight, role }) => {
//                                                                                                 if (roleid) {
//                                                                                                     groupPromises.push(db.update.encounter.groupRoles(id, roleid, groupid, +roleweight, role).catch(e => sendErrorForward('update beast update groups role 2', e, res)))
//                                                                                                 } else {
//                                                                                                     groupPromises.push(db.add.encounter.groupRoles(id, groupid, +roleweight, role).catch(e => sendErrorForward('update beast add groups role 2', e, res)))
//                                                                                                 }
//                                                                                             })
//                                                                                             return Promise.all(groupPromises)
//                                                                                         }).catch(e => sendErrorForward('update beast add groups 2', e, res)))
//                                                                                     }
//                                                                                 })
//                                                                             },
//                                                                                 upsertNumbers: (promiseArray, db, id, res, numbers) => {
//                                                                                     numbers.forEach(({ id: numberid, beastid, deleted, numbers, miles, weight }) => {
//                                                                                         if (deleted) {
//                                                                                             promiseArray.push(db.delete.encounter.numbers(id, numberid).catch(e => sendErrorForward('update beast delete numbers', e, res)))
//                                                                                         } else if (numberid) {
//                                                                                             promiseArray.push(db.update.encounter.numbers(id, numberid, numbers, miles, +weight).catch(e => sendErrorForward('update beast update numbers', e, res)))
//                                                                                         } else if (!numberid) {
//                                                                                             promiseArray.push(db.add.encounter.numbers(id, numbers, miles, +weight).catch(e => sendErrorForward('update beast add numbers', e, res)))
//                                                                                         }
//                                                                                     })
//                                                                                 },
//                                                                                     upsertSigns: (promiseArray, db, id, res, signs) => {
//                                                                                         signs.signs.forEach(({ sign, weight, id: signid, beastid, deleted }) => {
//                                                                                             if (deleted) {
//                                                                                                 promiseArray.push(db.delete.encounter.sign(beastid, signid).catch(e => sendErrorForward('update beast delete sign', e, res)))
//                                                                                             } else if ((signid && !beastid) || (signid && beastid !== id)) {
//                                                                                                 promiseArray.push(db.add.encounter.sign(id, signid, weight).catch(e => sendErrorForward('update beast add sign', e, res)))
//                                                                                             } else if (signid && beastid) {
//                                                                                                 promiseArray.push(db.update.encounter.signs(weight, beastid, signid).catch(e => sendErrorForward('update beast update sign', e, res)))
//                                                                                             } else if (!signid) {
//                                                                                                 db.add.encounter.allSigns(sign).then(result => {
//                                                                                                     promiseArray.push(db.add.encounter.sign(id, result[0].id, weight).catch(e => sendErrorForward('update beast add sign w/ weight', e, res)))
//                                                                                                 }).catch(e => sendErrorForward('update beast all signs', e, res))
//                                                                                             }
//                                                                                         })
//                                                                                     },
//                                                                                         upsertVerb: (promiseArray, db, id, res, verb) => {
//                                                                                             verb.verb.forEach(({ verb, id: verbid, beastid, deleted }) => {
//                                                                                                 if (deleted) {
//                                                                                                     promiseArray.push(db.delete.encounter.verb(beastid, verbid).catch(e => sendErrorForward('update beast delete verb', e, res)))
//                                                                                                 } else if ((verbid && !beastid) || (verbid && beastid !== id)) {
//                                                                                                     promiseArray.push(db.add.encounter.verb(verbid, id).catch(e => sendErrorForward('update beast add add', e, res)))
//                                                                                                 } else if (!verbid) {
//                                                                                                     db.add.encounter.allVerb(verb).then(result => {
//                                                                                                         promiseArray.push(db.add.encounter.verb(result[0].id, id).catch(e => sendErrorForward('update beast add verb 2', e, res)))
//                                                                                                     }).catch(e => sendErrorForward('update beast add all verbs', e, res))
//                                                                                                 }
//                                                                                             })
//                                                                                         },
//                                                                                             upsertNoun: (promiseArray, db, id, res, noun) => {
//                                                                                                 noun.noun.forEach(({ noun, id: nounid, beastid, deleted }) => {
//                                                                                                     if (deleted) {
//                                                                                                         promiseArray.push(db.delete.encounter.noun(beastid, nounid).catch(e => sendErrorForward('update beast delete noun', e, res)))
//                                                                                                     } else if ((nounid && !beastid) || (nounid && beastid !== id)) {
//                                                                                                         promiseArray.push(db.add.encounter.noun(nounid, id).catch(e => sendErrorForward('update beast add noun', e, res)))
//                                                                                                     } else if (!nounid) {
//                                                                                                         db.add.encounter.allNoun(noun).then(result => {
//                                                                                                             promiseArray.push(db.add.encounter.noun(result[0].id, id).catch(e => sendErrorForward('update beast add noun 2', e, res)))
//                                                                                                         }).catch(e => sendErrorForward('update beast all nouns', e, res))
//                                                                                                     }
//                                                                                                 })
//                                                                                             },
//                                                                                                 upsertLairBasic: (promiseArray, db, id, res, beastid, copper, silver, gold, potion, relic, enchanted, talisman) => {
//                                                                                                     if (!beastid) {
//                                                                                                         promiseArray.push(db.add.loot.lairbasic(id, copper, silver, gold, potion, relic, enchanted, talisman).catch(e => sendErrorForward('update beast add basic lair', e, res)))
//                                                                                                     } else {
//                                                                                                         promiseArray.push(db.update.loot.lairbasic(id, copper, silver, gold, potion, relic, enchanted, talisman).catch(e => sendErrorForward('update beast update basic lair', e, res)))
//                                                                                                     }
//                                                                                                 },
//                                                                                                     upsertScrollsLair: (promiseArray, db, id, res, scrolls = []) => {
//                                                                                                         scrolls.forEach(({ id: scrollid, beastid, number, power, deleted }) => {
//                                                                                                             if (deleted) {
//                                                                                                                 promiseArray.push(db.delete.loot.lairscrolls(beastid, scrollid).catch(e => sendErrorForward('update beast delete lair scrolls', e, res)))
//                                                                                                             } else if (scrollid && beastid) {
//                                                                                                                 promiseArray.push(db.update.loot.lairscrolls(scrollid, number, power).catch(e => sendErrorForward('update beast update lair scrolls', e, res)))
//                                                                                                             } else {
//                                                                                                                 promiseArray.push(db.add.loot.lairscrolls(id, number, power).catch(e => sendErrorForward('update beast add lair scrolls', e, res)))
//                                                                                                             }
//                                                                                                         })
//                                                                                                     },
//                                                                                                         upsertAlmsLair: (promiseArray, db, id, res, alms = []) => {
//                                                                                                             alms.forEach(({ id: almid, beastid, number, favor, deleted }) => {
//                                                                                                                 if (deleted) {
//                                                                                                                     promiseArray.push(db.delete.loot.lairalms(beastid, almid).catch(e => sendErrorForward('update beast delete lair alms', e, res)))
//                                                                                                                 } else if (almid && beastid) {
//                                                                                                                     promiseArray.push(db.update.loot.lairalms(almid, number, favor).catch(e => sendErrorForward('update beast update lair alms', e, res)))
//                                                                                                                 } else {
//                                                                                                                     promiseArray.push(db.add.loot.lairalms(id, number, favor).catch(e => sendErrorForward('update beast add lair alms', e, res)))
//                                                                                                                 }
//                                                                                                             })
//                                                                                                         },
//                                                                                                             upsertItemsLair: (promiseArray, db, id, res, items) => {
//                                                                                                                 let keyArray = []
//                                                                                                                 let itemPromise = []
//                                                                                                                 for (let key in items) {
//                                                                                                                     const { id: itemid, beastid: cbeastid, itemcategory, materialrarity, detailing, wear, chance, number } = items[key]
//                                                                                                                     itemid ? keyArray.push(itemid) : null
//                                                                                                                     if (itemid && cbeastid) {
//                                                                                                                         itemPromise.push(db.update.loot.lairitems(itemid, itemcategory, materialrarity, detailing, wear, chance, number).catch(e => sendErrorForward('update beast update lair items', e, res)))
//                                                                                                                     } else {
//                                                                                                                         itemPromise.push(db.add.loot.lairitems(id, itemcategory, materialrarity, detailing, wear, chance, number).then(result => { keyArray.push(result[0].id); return true }).catch(e => sendErrorForward('update beast add lair items', e, res)))
//                                                                                                                     }
//                                                                                                                 }

//                                                                                                                 promiseArray.push(Promise.all(itemPromise).then(_ => {
//                                                                                                                     return db.delete.loot.lairitems([id, [0, ...keyArray]]).catch(e => sendErrorForward('update beast delete lair items', e, res))
//                                                                                                                 }))
//                                                                                                             },
//                                                                                                                 upsertBasicCarried: (promiseArray, db, id, res, cbeastid, ccopper, csilver, cgold, cpotion, crelic, cenchanted, ctalisman) => {
//                                                                                                                     if (!cbeastid) {
//                                                                                                                         promiseArray.push(db.add.loot.carriedbasic(id, ccopper, csilver, cgold, cpotion, crelic, cenchanted, ctalisman).catch(e => sendErrorForward('update beast add carried basic', e, res)))
//                                                                                                                     } else {
//                                                                                                                         promiseArray.push(db.update.loot.carriedbasic(cbeastid, ccopper, csilver, cgold, cpotion, crelic, cenchanted, ctalisman).catch(e => sendErrorForward('update beast update carried basic', e, res)))
//                                                                                                                     }
//                                                                                                                 },
//                                                                                                                     upsertScrollsCarried: (promiseArray, db, id, res, cscrolls = []) => {
//                                                                                                                         cscrolls.forEach(({ id: scrollid, beastid: cbeastid, number, power, deleted }) => {
//                                                                                                                             if (deleted) {
//                                                                                                                                 promiseArray.push(db.delete.loot.carriedscrolls(cbeastid, scrollid).catch(e => sendErrorForward('update beast delete carried scrolls', e, res)))
//                                                                                                                             } else if (scrollid && cbeastid) {
//                                                                                                                                 promiseArray.push(db.update.loot.carriedscrolls(scrollid, number, power).catch(e => sendErrorForward('update beast update carried scrolls', e, res)))
//                                                                                                                             } else {
//                                                                                                                                 promiseArray.push(db.add.loot.carriedscrolls(id, number, power).catch(e => sendErrorForward('update beast add carried scrolls', e, res)))
//                                                                                                                             }
//                                                                                                                         })
//                                                                                                                     },
//                                                                                                                         upsertItemsCarried: (promiseArray, db, id, res, citems) => {
//                                                                                                                             let keyArray = []
//                                                                                                                             let itemPromise = []
//                                                                                                                             for (let key in citems) {
//                                                                                                                                 const { id: itemid, beastid: cbeastid, itemcategory, materialrarity, detailing, wear, chance, number } = citems[key]
//                                                                                                                                 itemid ? keyArray.push(itemid) : null
//                                                                                                                                 if (itemid && cbeastid) {
//                                                                                                                                     itemPromise.push(db.update.loot.carrieditems(itemid, itemcategory, materialrarity, detailing, wear, chance, number).catch(e => sendErrorForward('update beast update carried items', e, res)))
//                                                                                                                                 } else {
//                                                                                                                                     itemPromise.push(db.add.loot.carrieditems(id, itemcategory, materialrarity, detailing, wear, chance, number).then(result => { keyArray.push(result[0].id) }).catch(e => sendErrorForward('update beast add carried items', e, res)))
//                                                                                                                                 }
//                                                                                                                             }
//                                                                                                                             promiseArray.push(Promise.all(itemPromise).then(_ => {
//                                                                                                                                 return db.delete.loot.carrieditems([id, [0, ...keyArray]]).catch(e => sendErrorForward('update beast delete carried items', e, res))
//                                                                                                                             }))
//                                                                                                                         },
//                                                                                                                             upsertAlmsCarried: (promiseArray, db, id, res, calms = []) => {
//                                                                                                                                 calms.forEach(({ id: almid, beastid: cbeastid, number, favor, deleted }) => {
//                                                                                                                                     if (deleted) {
//                                                                                                                                         promiseArray.push(db.delete.loot.carriedalms(cbeastid, almid).catch(e => sendErrorForward('update beast delete carried alms', e, res)))
//                                                                                                                                     } else if (almid && cbeastid) {
//                                                                                                                                         promiseArray.push(db.update.loot.carriedalms(almid, number, favor).catch(e => sendErrorForward('update beast update carried alms', e, res)))
//                                                                                                                                     } else {
//                                                                                                                                         promiseArray.push(db.add.loot.carriedalms(id, number, favor).catch(e => sendErrorForward('update beast add carried alms', e, res)))
//                                                                                                                                     }
//                                                                                                                                 })
//                                                                                                                             },
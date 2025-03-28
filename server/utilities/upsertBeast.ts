import { Response, Error } from '../interfaces/apiInterfaces'
import {
    ClimateEditObject, Climate, Role, Type, CombatStat, Conflict, Skill, Movement, Variant, Loot, Reagent, LocationVitality, Location, ArtistInfo, ArtistEditObject,
    upsertParameters, Scenario, Folklore, Spell, Obstacle, Challenge, Table, TablesObject, Row, Temperament, Encounter, TemperamentObject, Group, GroupWeight, Number,
    SignObject, Sign, VerbObject, Verb, Noun, NounObject
} from '../interfaces/beastInterfaces'

import createHash from './hashGeneration'
import { sendErrorForwardNoFile } from '../utilities/sendingFunctions'

const sendErrorForward = sendErrorForwardNoFile('upsert beast')

export default async function upsertBeast(databaseConnection: any, beastId: number, response: Response, upsertParameters: upsertParameters) {
    const { roles, types, climates, combatStats, conflicts, skills, movements, variants, loots, reagents, locationalVitalities, locations, artistInfo, scenarios,
        folklores, casting, deletedSpells, spells, obstacles, challenges, tables, encounters } = upsertParameters

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

    updateTables(promiseArray, databaseConnection, beastId, response, tables)

    upsertEncounters(promiseArray, databaseConnection, beastId, response, encounters)

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

    return Promise.all(promiseArray).then(() => {
        //     catalogCtrl.collectCatalog(app)
        return true
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

async function updateTables(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, tables: TablesObject) {
    const { appearance, habitat, attack, defense } = tables
    await deleteTables(databaseConnection, beastId, response, appearance, habitat, attack, defense)
    upsertTable(promiseArray, databaseConnection, beastId, response, appearance, 'ap')
    upsertTable(promiseArray, databaseConnection, beastId, response, habitat, 'ha')
    upsertTable(promiseArray, databaseConnection, beastId, response, attack, 'at')
    upsertTable(promiseArray, databaseConnection, beastId, response, defense, 'de')
}

async function deleteTables(databaseConnection: any, beastId: number, response: Response, appearance: Table[], habitat: Table[], attack: Table[], defense: Table[]) {
    await databaseConnection.beast.table.delete(beastId, [0, ...appearance.map(table => table.id), ...habitat.map(table => table.id), ...attack.map(table => table.id), ...defense.map(table => table.id)])
        .catch((error: Error) => sendErrorForward('delete tables', error, response))
}

async function upsertTable(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, table: Table[], tableShortName: string) {
    table.forEach(async (table: Table) => {
        const { id, label, rows } = table
        let tableIdToUpdate = id ? id : null

        if (tableIdToUpdate) {
            promiseArray.push(databaseConnection.beast.table.updateAll(tableIdToUpdate, label).catch((error: Error) => sendErrorForward('update all tables', error, response)))
        } else {
            tableIdToUpdate = await databaseConnection.beast.table.addAll(label, tableShortName).catch((error: Error) => sendErrorForward('add to all tables', error, response))
            promiseArray.push(databaseConnection.beast.table.add(beastId, tableIdToUpdate).catch((error: Error) => sendErrorForward('add table ', error, response)))
        }

        await databaseConnection.beast.table.deleteRow([tableIdToUpdate, [0, ...rows.map(row => row.id)]]).catch((error: Error) => sendErrorForward('delete rows', error, response))

        rows.forEach((row: Row) => {
            const { weight, value, id: rowid } = row
            promiseArray.push(databaseConnection.beast.add.row(rowid, tableIdToUpdate, weight, value).catch((error: Error) => sendErrorForward('add rows', error, response)))
        })
    })
}

async function upsertEncounters(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, encounters: Encounter) {
    const { temperaments, signs, nouns, verbs, groups, numbers } = encounters;
    upsertTemperaments(promiseArray, databaseConnection, beastId, response, temperaments)
    upsertGroups(promiseArray, databaseConnection, beastId, response, groups)
    upsertNumbers(promiseArray, databaseConnection, beastId, response, numbers)
    upsertSigns(promiseArray, databaseConnection, beastId, response, signs)
    upsertVerbs(promiseArray, databaseConnection, beastId, response, verbs)
    upsertNouns(promiseArray, databaseConnection, beastId, response, nouns)
}

async function upsertTemperaments(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, temperaments: TemperamentObject) {
    temperaments.beastTemperaments.forEach(async (temperament: Temperament) => {
        const { temperament: label, weight, id, beastid: owningBeastId, tooltip, deleted } = temperament

        const itIsInDatabaseButNotConnectedToAnyBeast = id && !beastId
        const itIsInDatabaseButNotConnectedToThisBeast = id && beastId !== owningBeastId
        const itIsInDatabaseAndBelongsToBeast = id && beastId
        const itIsntInDatabase = !id

        if (deleted) {
            promiseArray.push(databaseConnection.encounter.temperament.delete(beastId, id).catch((error: Error) => sendErrorForward('delete temp', error, response)))
        } else if (itIsInDatabaseButNotConnectedToAnyBeast || itIsInDatabaseButNotConnectedToThisBeast) {
            promiseArray.push(databaseConnection.encounter.temperament.add(owningBeastId, id, weight).catch((error: Error) => sendErrorForward('add temp', error, response)))
        } else if (itIsInDatabaseAndBelongsToBeast) {
            promiseArray.push(databaseConnection.encounter.temperament.update(weight, beastId, id).catch((error: Error) => sendErrorForward('update temp', error, response)))
        } else if (itIsntInDatabase) {
            const newTempId = await databaseConnection.encounter.temperament.addAll(label, tooltip).catch((error: Error) => sendErrorForward('add all temp', error, response))[0].id
            promiseArray.push(databaseConnection.encounter.temperament.add(owningBeastId, newTempId, weight).catch((error: Error) => sendErrorForward('add temp 2', error, response)))
        }
    })
}

async function upsertGroups(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, groups: Group[]) {
    groups.forEach(async (group: Group) => {
        const { id: groupid, deleted, label, weights, weight } = group
        if (deleted) {
            await promiseArray.push(databaseConnection.encounter.group.delete(beastId, groupid).catch((error: Error) => sendErrorForward('delete groups', error, response)))
            databaseConnection.encounter.group.deleteRole(beastId, groupid).catch((error: Error) => sendErrorForward('delete group roles', error, response))
        } else {
            let groupIdToUpdate = groupid ? groupid : null
            if (groupIdToUpdate) {
                await databaseConnection.encounter.groups.update(beastId, groupid, label, weight).catch((error: Error) => sendErrorForward('update groups', error, response))
            } else {
                groupIdToUpdate = await databaseConnection.encounter.group.add(beastId, label, weight).catch((error: Error) => sendErrorForward('add groups', error, response))
            }

            weights.forEach((weight: GroupWeight) => {
                const { id: roleid, weight: roleweight, role, deleted } = weight
                if (deleted && roleid) {
                    promiseArray.push(databaseConnection.encounter.group.deleteRole(beastId, roleid).catch((error: Error) => sendErrorForward('delete groups role', error, response)))
                } else if (roleid) {
                    promiseArray.push(databaseConnection.encounter.group.updateRole(beastId, roleid, groupIdToUpdate, roleweight, role).catch((error: Error) => sendErrorForward('update groups role', error, response)))
                } else {
                    promiseArray.push(databaseConnection.encounter.group.addRole(beastId, groupIdToUpdate, roleweight, role).catch((error: Error) => sendErrorForward('add groups role', error, response)))
                }
            })
        }
    })
}

async function upsertNumbers(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, numbers: Number[]) {
    numbers.forEach((number: Number) => {
        const { id, deleted, numbers, miles, weight } = number
        if (deleted) {
            promiseArray.push(databaseConnection.encounter.number.delete(beastId, id).catch((error: Error) => sendErrorForward('delete numbers', error, response)))
        } else if (id) {
            promiseArray.push(databaseConnection.encounter.number.update(beastId, id, numbers, miles, weight).catch((error: Error) => sendErrorForward('update numbers', error, response)))
        } else if (!id) {
            promiseArray.push(databaseConnection.encounter.number.add(beastId, numbers, miles, weight).catch((error: Error) => sendErrorForward('add numbers', error, response)))
        }
    })
}

async function upsertSigns(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, signs: SignObject) {
    signs.beastSigns.forEach(async (sign: Sign) => {
        const { sign: label, weight, id: signid, beastid: owningBeastId, deleted } = sign

        const itIsInDatabaseButNotConnectedToAnyBeast = signid && !beastId
        const itIsInDatabaseButNotConnectedToThisBeast = signid && beastId !== owningBeastId
        const itIsInDatabaseAndBelongsToBeast = signid && beastId
        const itIsntInDatabase = !signid

        if (deleted) {
            promiseArray.push(databaseConnection.encounter.sign.delete(beastId, signid).catch((error: Error) => sendErrorForward('delete sign', error, response)))
        } else if (itIsInDatabaseButNotConnectedToAnyBeast || itIsInDatabaseButNotConnectedToThisBeast) {
            promiseArray.push(databaseConnection.encounter.sign.add(beastId, signid, weight).catch((error: Error) => sendErrorForward('add sign', error, response)))
        } else if (itIsInDatabaseAndBelongsToBeast) {
            promiseArray.push(databaseConnection.encounter.sign.update(weight, beastId, signid).catch((error: Error) => sendErrorForward('update sign', error, response)))
        } else if (itIsntInDatabase) {
            const newSignId = await databaseConnection.encounter.signs.addAll(label).catch((error: Error) => sendErrorForward('all signs', error, response))[0].id
            promiseArray.push(databaseConnection.encounter.sign.add(beastId, newSignId, weight).catch((error: Error) => sendErrorForward('add sign w/ weight', error, response)))
        }
    })
}

async function upsertVerbs(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, verbs: VerbObject) {
    verbs.beastVerbs.forEach(async (verb: Verb) => {
        const { verb: label, id, beastid: owningBeastId, deleted } = verb

        const itIsInDatabaseButNotConnectedToAnyBeast = id && !beastId
        const itIsInDatabaseButNotConnectedToThisBeast = id && beastId !== owningBeastId
        const itIsntInDatabase = !id

        if (deleted) {
            promiseArray.push(databaseConnection.encounter.verb.delete(beastId, id).catch((error: Error) => sendErrorForward('delete verb', error, response)))
        } else if (itIsInDatabaseButNotConnectedToAnyBeast || itIsInDatabaseButNotConnectedToThisBeast) {
            promiseArray.push(databaseConnection.encounter.verb.add(id, beastId).catch((error: Error) => sendErrorForward('add add', error, response)))
        } else if (itIsntInDatabase) {
            const newVerbId = await databaseConnection.encounter.verb.addAll(label).catch((error: Error) => sendErrorForward('add all verbs', error, response))[0].id
            promiseArray.push(databaseConnection.encounter.verb.add(newVerbId, beastId).catch((error: Error) => sendErrorForward('add verb 2', error, response)))
        }
    })
}

async function upsertNouns(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, nouns: NounObject) {
    nouns.beastNouns.forEach(async (noun: Noun) => {
        const { noun: label, id, beastid: owningBeastId, deleted } = noun

        const itIsInDatabaseButNotConnectedToAnyBeast = id && !beastId
        const itIsInDatabaseButNotConnectedToThisBeast = id && beastId !== owningBeastId
        const itIsntInDatabase = !id

        if (deleted) {
            promiseArray.push(databaseConnection.encounter.noun.delete(beastId, id).catch((error: Error) => sendErrorForward('delete noun', error, response)))
        } else if (itIsInDatabaseButNotConnectedToAnyBeast || itIsInDatabaseButNotConnectedToThisBeast) {
            promiseArray.push(databaseConnection.encounter.noun.add(id, beastId).catch((error: Error) => sendErrorForward('add noun', error, response)))
        } else if (itIsntInDatabase) {
            const newNounId = await databaseConnection.encounter.addAll(label).catch((error: Error) => sendErrorForward('all nouns', error, response))[0].id
            promiseArray.push(databaseConnection.add.encounter.noun(newNounId, beastId).catch((error: Error) => sendErrorForward('add noun 2', error, response)))
        }
    })
}

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
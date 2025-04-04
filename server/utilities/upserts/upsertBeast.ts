import { Response, Error } from '../../interfaces/apiInterfaces'
import {
    ClimateObject, Role, Type, CombatStat, Skill, Movement, Variant, Reagent, LocationVitality, ArtistObject,
    Scenario, Folklore, TablesObject, LocationObject, ConflictObject, upsertParameters
} from '../../interfaces/beastInterfaces/beastInterfaces'
import { Table, Row } from '../../interfaces/beastInterfaces/infoInterfaces/generalInfoInterfaces'
import { ArtistInfo } from '../../interfaces/beastInterfaces/infoInterfaces/ImageInfoInterfaces'
import { Climate } from '../../interfaces/beastInterfaces/infoInterfaces/linkedInfoInterfaces'
import { Conflict } from '../../interfaces/beastInterfaces/infoInterfaces/socialInfo'
import { Location } from '../../interfaces/beastInterfaces/infoInterfaces/linkedInfoInterfaces'

import createHash from '../hashGeneration'
import { sendErrorForwardNoFile } from '../sendingFunctions'
import { collectCatalog } from '../../controllers/catalog'
import upsertAllLoot from './upsertLoot'
import upsertEncounters from './upsertEncounter'
import upsertSkillChallenge from './upsertSkillChallenge'
import upsertSpellCasting from './upsertSpellCasting'

const sendErrorForward = sendErrorForwardNoFile('upsert beast')

export default async function upsertBeast(databaseConnection: any, beastId: number, response: Response, upsertParameters: upsertParameters) {
    const { roles, types, climates, combatStats, conflicts, skills, movements, variants, specificLoots, reagents, locationalVitalities, locations, artistInfo, scenarios,
        folklores, casting, deletedSpells, spells, obstacles, challenges, tables, encounters, lairLoot, carriedLoot } = upsertParameters

    let promiseArray: any[] = []

    upsertRoles(promiseArray, databaseConnection, beastId, response, roles)
    upsertTypes(promiseArray, databaseConnection, beastId, response, types)
    upsertClimates(promiseArray, databaseConnection, beastId, response, climates)
    upsertCombats(promiseArray, databaseConnection, beastId, response, combatStats)
    upsertConflict(promiseArray, databaseConnection, beastId, response, conflicts)
    upsertSkills(promiseArray, databaseConnection, beastId, response, skills)
    upsertMovement(promiseArray, databaseConnection, beastId, response, movements)
    upsertVariants(promiseArray, databaseConnection, beastId, response, variants)
    upsertReagents(promiseArray, databaseConnection, beastId, response, reagents)
    upsertLocationalVitality(promiseArray, databaseConnection, beastId, response, locationalVitalities)
    upsertLocations(promiseArray, databaseConnection, beastId, response, locations)
    upsertArtist(promiseArray, databaseConnection, beastId, response, artistInfo)
    upsertScenarios(promiseArray, databaseConnection, beastId, response, scenarios)
    upsertFolklore(promiseArray, databaseConnection, beastId, response, folklores)
    
    upsertTables(promiseArray, databaseConnection, beastId, response, tables) 

    upsertSpellCasting(promiseArray, databaseConnection, beastId, response, casting, deletedSpells, spells)
    upsertSkillChallenge(promiseArray, databaseConnection, beastId, response, obstacles, challenges)
    upsertEncounters(promiseArray, databaseConnection, beastId, response, encounters)
    upsertAllLoot(promiseArray, databaseConnection, beastId, response, specificLoots, carriedLoot, lairLoot)

    return Promise.all(promiseArray).then(() => {
        collectCatalog(databaseConnection)
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

async function upsertClimates(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, climates: ClimateObject) {
    climates.beast.forEach((climate: Climate) => {
        if (climate.deleted) {
            promiseArray.push(databaseConnection.beast.climate.delete(climate.uniqueid).catch((error: Error) => sendErrorForward('delete climate', error, response)))
        } else if (!climate.uniqueid) {
            promiseArray.push(databaseConnection.beast.climate.add(beastId, climate.climateid).catch((error: Error) => sendErrorForward('add climate', error, response)))
        }
    })
}

async function upsertCombats(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, combatStats: CombatStat[]) {
    await databaseConnection.beast.combatStat.delete([beastId, [0, ...combatStats.map(combatStat => combatStat.id)]]).catch((error: Error) => sendErrorForward('delete combat', error, response))

    combatStats.forEach((combatStat: CombatStat) => {
        const { id, roleid, piercingweapons, slashingweapons, crushingweapons, weaponsmallslashing,
            weaponsmallcrushing, weaponsmallpiercing, andslashing, andcrushing, flanks, rangeddefence, alldefense, allaround, armorandshields,
            unarmored, attack, isspecial, eua, addsizemod, weapon, shield, armor, weaponname, rangeddefense, initiative, measure, recovery, showonlydefenses,
            weapontype, rangedistance, swarmbonus, adjustment, tdr, info } = combatStat
        if (!id) {
            promiseArray.push(
                databaseConnection.beast.combatStat.add(beastId, roleid, piercingweapons, slashingweapons, crushingweapons, weaponsmallslashing,
                    weaponsmallcrushing, weaponsmallpiercing, andslashing, andcrushing, flanks, rangeddefence, alldefense, allaround, armorandshields,
                    unarmored, attack, isspecial, eua, addsizemod, weapon, shield, armor, weaponname, rangeddefense, initiative, measure, recovery, showonlydefenses,
                    weapontype, rangedistance, swarmbonus, adjustment, tdr, info).catch((error: Error) => sendErrorForward('add combat', error, response))
            )
        } else {
            promiseArray.push(
                databaseConnection.beast.combatStat.update(id, beastId, roleid, piercingweapons, slashingweapons, crushingweapons, weaponsmallslashing,
                    weaponsmallcrushing, weaponsmallpiercing, andslashing, andcrushing, flanks, rangeddefence, alldefense, allaround, armorandshields,
                    unarmored, attack, isspecial, eua, addsizemod, weapon, shield, armor, weaponname, rangeddefense, initiative, measure, recovery, showonlydefenses,
                    weapontype, rangedistance, swarmbonus, adjustment, tdr, info).catch((error: Error) => sendErrorForward('update combat', error, response))
            )
        }
    })
}

async function upsertConflict(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, conflicts: ConflictObject) {
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

async function upsertLocations(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, locations: LocationObject) {
    locations.beast.forEach((singleLocation: Location) => {
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

async function upsertArtist(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, artistInfo: ArtistObject) {

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

    updateArtist(artistInfo.genericArtistInfo)
    const { roleartists } = artistInfo
    if (roleartists && roleartists.length > 0) {
        roleartists.forEach((role: ArtistInfo) => {
            updateArtist(role)
        })
    }
}

async function upsertScenarios(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, scenarios: Scenario[]) {
    await databaseConnection.beast.scenario.delete([beastId, [0, ...scenarios.map(scenario => scenario.id)]]).catch((error: Error) => sendErrorForward('delete folkore', error, response))
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
    await databaseConnection.beast.folklore.delete([beastId, [0, ...folklore.map(folklore => folklore.id)]]).catch((error: Error) => sendErrorForward('delete folkore', error, response))
    folklore.forEach((folklore: Folklore) => {
        const { id, belief, truth } = folklore
        if (!id) {
            promiseArray.push(databaseConnection.beast.folklore.add(beastId, belief, truth).catch((error: Error) => sendErrorForward('add folklore', error, response)))
        } else {
            promiseArray.push(databaseConnection.beast.folklore.update(id, beastId, belief, truth).catch((error: Error) => sendErrorForward('update folklore', error, response)))
        }
    })
}

async function upsertTables(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, tables: TablesObject) {
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
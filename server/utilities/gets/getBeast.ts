import { Response, Error, User } from "../../interfaces/apiInterfaces";
import { Casting, Spell } from "../../interfaces/beastInterfaces/infoInterfaces/castingInfo";
import { LocationVitality, Movement, CombatStat } from "../../interfaces/beastInterfaces/infoInterfaces/combatInfoInterfaces";
import { Folklore, Scenario, TablesObject, Table, Row } from "../../interfaces/beastInterfaces/infoInterfaces/generalInfoInterfaces";
import { ArtistObject, ArtistInfo } from "../../interfaces/beastInterfaces/infoInterfaces/ImageInfoInterfaces";
import { Type, ClimateObject, Climate, LocationObject, Variant } from "../../interfaces/beastInterfaces/infoInterfaces/linkedInfoInterfaces";
import { Reagent } from "../../interfaces/beastInterfaces/infoInterfaces/lootInfoInterfaces";
import { Role } from "../../interfaces/beastInterfaces/infoInterfaces/roleInfoInterfaces";
import { Skill } from "../../interfaces/beastInterfaces/infoInterfaces/skillInfoInterfaces";
import { ConflictObject, Conflict, Archetype } from "../../interfaces/beastInterfaces/infoInterfaces/socialInfo";
import { Alm, Item, Loot, Scroll, SpecificLoot } from "../../interfaces/lootInterfaces";
import { Challenge, Obstacle } from "../../interfaces/skillInterfaces";

import { isOwner } from "../ownerAccess";
import { sendErrorForwardNoFile } from "../sendingFunctions";
import { objectifyItemArray, sortByStrength, sortOutAnyToTheBottom, sortTemplateRoles } from "../sorts";

const sendErrorForward = sendErrorForwardNoFile('get beast')

export function hasAppropriatePateronLevel(user: User, beastPatron: number, canPlayerView: boolean): string {
    if (canPlayerView || (user && isOwner(user.id))) {
        return 'gm'
    } else if (user && user.patreon) {
        let effectivePatreon = beastPatron === 0 ? beastPatron + 3 : beastPatron
        if (effectivePatreon >= user.patreon) {
            return 'gm'
        } else {
            return 'player'
        }
    } else if (user) {
        return 'player'
    }
    return 'viewer'
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

export async function getSkills(databaseConnection: any, response: Response, beastId: number): Promise<Skill[]> {
    return databaseConnection.beast.skill.get(beastId).then((skills: Skill[]) => skills.sort((a, b) => +b.rank - +a.rank)).catch((error: Error) => sendErrorForward('skills', error, response))
}

export async function getChallenges(databaseConnection: any, response: Response, beastId: number): Promise<Challenge[]> {
    return databaseConnection.skill.challenge.get(beastId).catch((error: Error) => sendErrorForward('challenges', error, response))
}

export async function getObstacles(databaseConnection: any, response: Response, beastId: number): Promise<Obstacle[]> {
    return databaseConnection.skill.obstacle.get(beastId).catch((error: Error) => sendErrorForward('obstalces', error, response))
}

export async function getVariants(databaseConnection: any, response: Response, beastId: number): Promise<Variant[]> {
    return databaseConnection.beast.variant.get(beastId).catch((error: Error) => sendErrorForward('variants', error, response))
}

export async function getSpecificLoots(databaseConnection: any, response: Response, beastId: number): Promise<SpecificLoot[]> {
    return databaseConnection.loot.specific.get(beastId).catch((error: Error) => sendErrorForward('specific loot', error, response))
}

export async function getLairBasic(databaseConnection: any, response: Response, beastId: number): Promise<Loot> {
    return databaseConnection.loot.lair.getBasic(beastId).catch((error: Error) => sendErrorForward('lair basic', error, response))
}

export async function getLairAlms(databaseConnection: any, response: Response, beastId: number): Promise<Alm[]> {
    return databaseConnection.loot.lair.getAlm(beastId).catch(e => sendErrorForward('lair alms', e, response))
}

export async function getLairItems(databaseConnection: any, response: Response, beastId: number, isEditing: boolean): Promise<Item[] | Object> {
    return databaseConnection.loot.lair.getItem(beastId).then((items: Item[]) => {
        if (isEditing) {
            return objectifyItemArray(items)
        } else {
            return items
        }
    }).catch((error: Error) => sendErrorForward('lair items', error, response))
}

export async function getLairScrolls(databaseConnection: any, response: Response, beastId: number): Promise<Scroll[]> {
    return databaseConnection.loot.lair.getScroll(beastId).catch((error: Error) => sendErrorForward('lair scrolls', error, response))
}

export async function getCarriedBasic(databaseConnection: any, response: Response, beastId: number): Promise<Loot> {
    return databaseConnection.loot.carried.getBasic(beastId).catch((error: Error) => sendErrorForward('carried basic', error, response))
}

export async function getCarriedAlms(databaseConnection: any, response: Response, beastId: number): Promise<Alm[]> {
    return databaseConnection.loot.carried.getAlm(beastId).catch(e => sendErrorForward('carried alms', e, response))
}

export async function getCarriedItems(databaseConnection: any, response: Response, beastId: number, isEditing: boolean): Promise<Item[] | Object> {
    return databaseConnection.loot.carried.getItem(beastId).then((items: Item[]) => {
        if (isEditing) {
            return objectifyItemArray(items)
        } else {
            return items
        }
    }).catch((error: Error) => sendErrorForward('carried items', error, response))
}

export async function getCarriedScrolls(databaseConnection: any, response: Response, beastId: number): Promise<Scroll[]> {
    return databaseConnection.loot.carried.getScroll(beastId).catch((error: Error) => sendErrorForward('carried scrolls', error, response))
}

export async function getReagents(databaseConnection: any, response: Response, beastId: number): Promise<Reagent[]> {
    return databaseConnection.beast.reagent.get(beastId).catch((error: Error) => sendErrorForward('pleroma', error, response))
}

export async function getLocationalVitalities(databaseConnection: any, response: Response, beastId: number): Promise<LocationVitality[]> {
    return databaseConnection.beast.locationalVitality.get(beastId).catch((error: Error) => sendErrorForward('locational vitality', error, response))
}

export async function getFolklore(databaseConnection: any, response: Response, beastId: number): Promise<Folklore[]> {
    return databaseConnection.beast.folklore.get(beastId).catch((error: Error) => sendErrorForward('folklore', error, response))
}

export async function getScenarios(databaseConnection: any, response: Response, beastId: number): Promise<Scenario[]> {
    return databaseConnection.beast.scenario.get(beastId).catch((error: Error) => sendErrorForward('scenarios', error, response))
}

interface archetypeInfo {
    archetype: string
}

export async function getArchetypes(databaseConnection: any, response: Response, isEditing: boolean, hasarchetypes: boolean, hasmonsterarchetypes: boolean): Promise<Archetype> {
    if (isEditing && hasarchetypes) {
        return databaseConnection.beast.archetype.get().then((archetypeInfo: archetypeInfo[]) => {
            const chance = Math.floor(Math.random() * 100)
            return {
                archetype: archetypeInfo[0].archetype,
                deviation: chance > 51 && chance < 75,
                reverse: chance > 75
            }
        }).catch((error: Error) => sendErrorForward('archetypes', error, response))
    } else if (isEditing && hasmonsterarchetypes) {
        return databaseConnection.beast.archetype.getMonster().catch((error: Error) => sendErrorForward('monster archetypes', error, response))
    }

    return null
}

export async function getFavorite(databaseConnection: any, response: Response, beastId: number, userId: number): Promise<boolean> {
    if (userId) {
        return databaseConnection.user.favorite.get(userId, beastId).then(result => result.length > 0).catch((error: Error) => sendErrorForward('favorite', error, response))
    } else {
        return false
    }
}

export async function getNotes(databaseConnection: any, response: Response, beastId: number, userId: number): Promise<string> {
    return databaseConnection.user.notes.get(beastId, userId).then(result => result[0]).catch((error: Error) => sendErrorForward('notes', error, response))
}

export async function getTables(databaseConnection: any, response: Response, beastId: number, tables: TablesObject, promiseArray: any[]) {
    const basicTableInfo: Table[] = await databaseConnection.beast.table.getTable(beastId).catch((error: Error) => sendErrorForward('tables', error, response))

    basicTableInfo.forEach(async (table: Table) => {
        promiseArray.push(databaseConnection.beast.table.getRow(table.id).then((rows: Row[]) => {
            if (table.section === 'ap') {
                tables.appearance.push({
                    ...table,
                    rows
                })
            } else if (table.section === 'ha') {
                tables.habitat.push({
                    ...table,
                    rows
                })
            } else if (table.section === 'at') {
                tables.attack.push({
                    ...table,
                    rows
                })
            } else if (table.section === 'de') {
                tables.defense.push({
                    ...table,
                    rows
                })
            }
            return true
        }).catch((error: Error) => sendErrorForward('table rows', error, response)))
    })
}

export async function getCasting(databaseConnection: any, response: Response, beastId: number): Promise<Casting> {
    return databaseConnection.beast.casting.get(beastId).catch((error: Error) => sendErrorForward('casting', error, response))[0]
}

export async function getSpells(databaseConnection: any, response: Response, beastId: number): Promise<Spell[]> {
    return databaseConnection.beast.spell.get(beastId).catch((error: Error) => sendErrorForward('spells', error, response))
}

export async function getRoles(databaseConnection: any, response: Response, beastId: number, beastName: string): Promise<Role[]> {
    return databaseConnection.role.get(beastId).then((roles: Role[]) => {
        if (beastName.includes('Template')) {
            roles = roles.sort(sortTemplateRoles)
        }

        return roles
    }).catch((error: Error) => sendErrorForward('roles', error, response))
}

export async function getMovement(databaseConnection: any, response: Response, beastId: number): Promise<Movement[]> {
    return databaseConnection.beast.movement.get(beastId).catch((error: Error) => sendErrorForward('movement', error, response))
}

export async function getCombatStats(databaseConnection: any, response: Response, beastId: number): Promise<CombatStat[]> {
    return databaseConnection.beast.combatStat.get(beastId).catch((error: Error) => sendErrorForward('combat', error, response))
}
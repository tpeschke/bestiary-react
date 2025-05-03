import { Response, Error, User } from "../../interfaces/apiInterfaces";
import { Casting, Spell } from "../../interfaces/beastInterfaces/infoInterfaces/castingInfo";
import { LocationVitality, Movement, RawMovement, RawCombatStat } from "../../interfaces/beastInterfaces/infoInterfaces/combatInfoInterfaces";
import { Folklore, Scenario, TablesObject, Table, Row, Size } from "../../interfaces/beastInterfaces/infoInterfaces/generalInfoInterfaces";
import { ArtistObject, ArtistInfo } from "../../interfaces/beastInterfaces/infoInterfaces/ImageInfoInterfaces";
import { Type, ClimateObject, Climate, LocationObject, Variant } from "../../interfaces/beastInterfaces/infoInterfaces/linkedInfoInterfaces";
import { Reagent } from "../../interfaces/beastInterfaces/infoInterfaces/lootInfoInterfaces";
import { Role } from "../../interfaces/beastInterfaces/infoInterfaces/roleInfoInterfaces";
import { Skill } from "../../interfaces/beastInterfaces/infoInterfaces/skillInfoInterfaces";
import { ConflictObject, UnformatedConflict, Archetype } from "../../interfaces/beastInterfaces/infoInterfaces/socialInfo";
import { Alm, Item, Loot, Scroll, SpecificLoot } from "../../interfaces/lootInterfaces";
import { Challenge, Obstacle } from "../../interfaces/skillInterfaces";

import { isOwner } from "../ownerAccess";
import { formatCharacteristics } from '../statCalculators/confrontationCalculator'
import { sendErrorForwardNoFile } from "../sendingFunctions";
import { objectifyItemArray, sortByRank, sortOutAnyToTheBottom, sortTemplateRoles } from "../sorts";
import { formatSkills } from "../statCalculators/skillCalculator";
import { calculateMovements } from "../statCalculators/combatCalculators/movement";
import { calculateCombatStats, CalculateCombatStatsReturn } from "../statCalculators/combatCalculators/combat";

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
    }
    return 'player'
}

export async function getTypes(databaseConnection: any, beastId: number): Promise<Type[]> {
    return databaseConnection.beast.type.get(beastId)
}

export async function getClimates(databaseConnection: any, beastId: number): Promise<ClimateObject> {
    const beast: Climate[] = await databaseConnection.beast.climate.get(beastId)
    return databaseConnection.beast.climate.getAll().then((alllimates: Climate[]) => {
        return {
            beast,
            alllimates
        }
    })
}

export async function getArtistInfo(databaseConnection: any, beastId: number, isEditing: boolean): Promise<ArtistObject> {
    let allArtists: ArtistObject[] = []
    if (isEditing) {
        allArtists = await databaseConnection.beast.artist.getAll(beastId)
    }

    return databaseConnection.beast.artist.get(beastId).then((genericArtistInfo: ArtistInfo[]) => {
        return {
            genericArtistInfo: genericArtistInfo[0],
            roleartists: genericArtistInfo.splice(1),
            allArtists
        }
    })
}

export async function getLocations(databaseConnection: any, beastId: number, isEditing: boolean): Promise<LocationObject> {
    let alllocations: Location[] = []
    if (isEditing) {
        alllocations = await databaseConnection.beast.location.getAll(beastId)
    }

    return databaseConnection.beast.location.get(beastId).then(beast => {
        return {
            beast,
            alllocations
        }
    })
}

export async function getConflict(databaseConnection: any, beastId: number, isEditing: boolean,
    traitlimit: number, relationshiplimit: number, flawlimit: number, socialpoints: number): Promise<ConflictObject> {

    let conflict: ConflictObject = { descriptions: [], convictions: [], relationships: [], flaws: [], burdens: [] }

    if (isEditing) {
        return databaseConnection.beast.conflict.getEdit(beastId).then((characteristics: UnformatedConflict[]) => {
            characteristics.forEach((characteristic: UnformatedConflict) => {
                if (characteristic.type === 't' || characteristic.type === 'c' || !characteristic.type) {
                    conflict.convictions.push(characteristic)
                } else if (characteristic.type === 'd') {
                    conflict.relationships.push(characteristic)
                } else if (characteristic.type === 'f') {
                    conflict.flaws.push(characteristic)
                } else if (characteristic.type === 'b') {
                    conflict.burdens.push(characteristic)
                } else if (characteristic.type === 'h') {
                    conflict.descriptions.push(characteristic)
                }
            })
            return conflict
        })
    } else {
        return databaseConnection.beast.conflict.get(beastId).then((characteristics: UnformatedConflict[]) => {
            characteristics.forEach((characteristic: UnformatedConflict) => {
                if (characteristic.type === 't' || characteristic.type === 'c' || !characteristic.type) {
                    if (traitlimit && conflict.convictions.length < traitlimit) {
                        conflict.convictions.push(formatCharacteristics(socialpoints, characteristic))
                    } else if (!traitlimit) {
                        conflict.convictions.push(formatCharacteristics(socialpoints, characteristic))
                    }
                } else if (characteristic.type === 'd') {
                    if (relationshiplimit && conflict.relationships.length < relationshiplimit) {
                        conflict.relationships.push(formatCharacteristics(socialpoints, characteristic))
                    } else if (!relationshiplimit) {
                        conflict.relationships.push(formatCharacteristics(socialpoints, characteristic))
                    }
                } else if (characteristic.type === 'f') {
                    if (flawlimit && conflict.flaws.length < flawlimit) {
                        conflict.flaws.push(formatCharacteristics(socialpoints, characteristic))
                    } else if (!flawlimit) {
                        conflict.flaws.push(formatCharacteristics(socialpoints, characteristic))
                    }
                } else if (characteristic.type === 'b') {
                    conflict.burdens.push(formatCharacteristics(socialpoints, characteristic))
                } else if (characteristic.type === 'h') {
                    conflict.descriptions.push(formatCharacteristics(socialpoints, characteristic))
                }
            })

            conflict.descriptions = conflict.descriptions.sort(sortByRank)
            conflict.convictions = conflict.convictions.sort(sortByRank)
            conflict.flaws = conflict.flaws.sort(sortOutAnyToTheBottom)
            conflict.burdens = conflict.burdens.sort(sortOutAnyToTheBottom)

            return conflict
        })
    }
}

export async function getSkills(databaseConnection: any, beastId: number, skillpoints: number): Promise<Skill[]> {
    return databaseConnection.beast.skill.get(beastId).then((skills: Skill[]) => {
        skills = skills.map(skill => formatSkills(skillpoints, skill))
        return skills.sort((a, b) => b.rank - a.rank)
    })
}

export async function getChallenges(databaseConnection: any, beastId: number): Promise<Challenge[]> {
    return databaseConnection.skill.challenge.get(beastId)
}

export async function getObstacles(databaseConnection: any, beastId: number): Promise<Obstacle[]> {
    return databaseConnection.skill.obstacle.get(beastId)
}

export async function getVariants(databaseConnection: any, beastId: number): Promise<Variant[]> {
    return databaseConnection.beast.variant.get(beastId)
}

export async function getSpecificLoots(databaseConnection: any, beastId: number): Promise<SpecificLoot[]> {
    return databaseConnection.loot.specific.get(beastId)
}

export async function getLairBasic(databaseConnection: any, beastId: number): Promise<Loot> {
    return databaseConnection.loot.lair.getBasic(beastId)
}

export async function getLairAlms(databaseConnection: any, beastId: number): Promise<Alm[]> {
    return databaseConnection.loot.lair.getAlm(beastId)
}

export async function getLairItems(databaseConnection: any, beastId: number, isEditing: boolean): Promise<Item[] | Object> {
    return databaseConnection.loot.lair.getItem(beastId).then((items: Item[]) => {
        if (isEditing) {
            return objectifyItemArray(items)
        } else {
            return items
        }
    })
}

export async function getLairScrolls(databaseConnection: any, beastId: number): Promise<Scroll[]> {
    return databaseConnection.loot.lair.getScroll(beastId)
}

export async function getCarriedBasic(databaseConnection: any, beastId: number): Promise<Loot> {
    return databaseConnection.loot.carried.getBasic(beastId)
}

export async function getCarriedAlms(databaseConnection: any, beastId: number): Promise<Alm[]> {
    return databaseConnection.loot.carried.getAlm(beastId)
}

export async function getCarriedItems(databaseConnection: any, beastId: number, isEditing: boolean): Promise<Item[] | Object> {
    return databaseConnection.loot.carried.getItem(beastId).then((items: Item[]) => {
        if (isEditing) {
            return objectifyItemArray(items)
        } else {
            return items
        }
    })
}

export async function getCarriedScrolls(databaseConnection: any, beastId: number): Promise<Scroll[]> {
    return databaseConnection.loot.carried.getScroll(beastId)
}

export async function getReagents(databaseConnection: any, beastId: number): Promise<Reagent[]> {
    return databaseConnection.beast.reagent.get(beastId)
}

export async function getLocationalVitalities(databaseConnection: any, beastId: number): Promise<LocationVitality[]> {
    return databaseConnection.beast.locationalVitality.get(beastId)
}

export async function getFolklore(databaseConnection: any, beastId: number): Promise<Folklore[]> {
    return databaseConnection.beast.folklore.get(beastId)
}

export async function getScenarios(databaseConnection: any, beastId: number): Promise<Scenario[]> {
    return databaseConnection.beast.scenario.get(beastId)
}

interface archetypeInfo {
    archetype: string
}

export async function getArchetypes(databaseConnection: any, isEditing: boolean, hasarchetypes: boolean, hasmonsterarchetypes: boolean): Promise<Archetype> {
    if (isEditing && hasarchetypes) {
        return databaseConnection.beast.archetype.get().then((archetypeInfo: archetypeInfo[]) => {
            const chance = Math.floor(Math.random() * 100)
            return {
                archetype: archetypeInfo[0].archetype,
                deviation: chance > 51 && chance < 75,
                reverse: chance > 75
            }
        })
    } else if (isEditing && hasmonsterarchetypes) {
        return databaseConnection.beast.archetype.getMonster()
    }

    return null
}

export async function getFavorite(databaseConnection: any, beastId: number, userId: number): Promise<boolean> {
    if (userId) {
        return databaseConnection.user.favorite.get(userId, beastId).then(result => result.length > 0)
    } else {
        return false
    }
}

export async function getNotes(databaseConnection: any, beastId: number, userId: number): Promise<string> {
    return databaseConnection.user.notes.get(beastId, userId).then(result => result[0])
}

export async function getTables(databaseConnection: any, beastId: number, tables: TablesObject, promiseArray: any[]) {
    const basicTableInfo: Table[] = await databaseConnection.beast.table.getTable(beastId)

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
        }))
    })
}

export async function getCasting(databaseConnection: any, beastId: number): Promise<Casting> {
    return databaseConnection.beast.casting.get(beastId)[0]
}

export async function getSpells(databaseConnection: any, beastId: number): Promise<Spell[]> {
    return databaseConnection.beast.spell.get(beastId)
}

export async function getRoles(databaseConnection: any, beastId: number, beastName: string): Promise<Role[]> {
    return databaseConnection.beast.role.get(beastId).then((roles: Role[]) => {
        if (beastName.includes('Template')) {
            roles = roles.sort(sortTemplateRoles)
        }

        return roles
    })
}

export async function getMovement(databaseConnection: any, beastId: number, combatpoints: number, role: string): Promise<Movement[]> {
    return databaseConnection.beast.movement.get(beastId).then((movements: RawMovement[]) => calculateMovements(movements, combatpoints, role))
}

export async function getCombatStats(databaseConnection: any, beastId: number, combatpoints: number, role: string, size: Size): Promise<CalculateCombatStatsReturn> {
    return databaseConnection.beast.combatStat.get(beastId).then((combatStats: RawCombatStat[]) => calculateCombatStats(combatStats, combatpoints, role, size))
}
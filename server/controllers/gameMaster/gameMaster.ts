import { Response, Request, Error } from "../../interfaces/apiInterfaces"
import { Alm, Item, Loot, Scroll, SpecificLoot } from "../../interfaces/lootInterfaces"
import { Challenge, Obstacle } from "../../interfaces/skillInterfaces"
import { Beast, upsertParameters } from "../../interfaces/beastInterfaces/beastInterfaces"
import { Casting, Spell } from "../../interfaces/beastInterfaces/infoInterfaces/castingInfo"
import { Role } from "../../interfaces/beastInterfaces/infoInterfaces/roleInfoInterfaces"
import { Movement, LocationVitality } from "../../interfaces/beastInterfaces/infoInterfaces/combatInfoInterfaces"
import { Scenario, Folklore } from "../../interfaces/beastInterfaces/infoInterfaces/generalInfoInterfaces"
import { ArtistObject } from "../../interfaces/beastInterfaces/infoInterfaces/ImageInfoInterfaces"
import { Variant, LocationObject, BeastType, ClimateObject } from "../../interfaces/beastInterfaces/infoInterfaces/linkedInfoInterfaces"
import { Pleroma } from "../../interfaces/beastInterfaces/infoInterfaces/lootInfoInterfaces"
import { Skill } from "../../interfaces/beastInterfaces/infoInterfaces/skillInfoInterfaces"
import { ConflictObject, Archetype } from "../../interfaces/beastInterfaces/infoInterfaces/socialInfo"

import getDatabaseConnection from "../../utilities/databaseConnection"
import { isOwner } from "../../utilities/ownerAccess"
import createHash from "../../utilities/hashGeneration"
import upsertBeast from "../../utilities/upserts/upsertBeast"
import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../../utilities/sendingFunctions'
import { getRarity, getScenarios, getFolklore, getTables, getArtistInfo, getVariants, getLocations, getTypes, getClimates, getRoles, getMovement, getCombatStats, getLocationalVitalities, getSkills, getChallenges, getObstacles, getConflict, getArchetypes, getPleroma, getSpecificLoots, getLairBasic, getLairAlms, getLairItems, getLairScrolls, getCarriedBasic, getCarriedAlms, getCarriedItems, getCarriedScrolls, getCasting, getSpells } from "./utilities/getBeast"
import { CalculateCombatStatsReturn } from "./utilities/statCalculators/combatCalculators/combat"
import { calculateVitalityFatigueAndTrauma } from "./utilities/statCalculators/combatCalculators/utilities/vitalityFatigueAndTraumaCalculator"
import { calculateStressAndPanic } from "./utilities/statCalculators/skillCalculator"
import calculateKnockBack from "./utilities/statCalculators/combatCalculators/utilities/knockBackCalculator"

const sendErrorForward = sendErrorForwardNoFile('beast controller')

interface BeastRequest extends Request {
    body: Beast
}

// export async function updateBeast(request: BeastRequest, response: Response) {
//     const databaseConnection = getDatabaseConnection(request)
//     const { body, user } = request

//     const { id, patreon, generalInfo, imageInfo, linkedInfo, roleInfo, combatInfo, skillInfo, socialInfo, lootInfo, castingInfo } = body
//     const { name, plural, intro, habitat, appearance, senses, diet, meta, size, rarity, scenarios, folklores, tables, encounters } = generalInfo
//     const { thumbnail, imagesource, artistInfo } = imageInfo
//     const { variants, locations, types, climates } = linkedInfo
//     const { rolenameorder, defaultrole, roles } = roleInfo
//     const { sp_atk, sp_def, tactics, combatpoints, combatrole, combatsecondary, vitalityInfo, movements, attacks, defenses } = combatInfo
//     const { fatigue, notrauma, knockback, singledievitality, noknockback, rollundertrauma, isincorporeal, weaponbreakagevitality, vitality, locationalVitalities } = vitalityInfo
//     const { panic, stress, skillrole, skillsecondary, skillpoints, atk_skill, def_skill, skills, challenges, obstacles } = skillInfo
//     const { traitlimit, relationshiplimit, flawlimit, passionlimit, socialrole, socialsecondary, socialpoints, descriptionshare, convictionshare, relationshipshare, atk_conf, def_conf, archetypeInfo, conflicts } = socialInfo
//     const { hasarchetypes, hasmonsterarchetypes } = archetypeInfo
//     const { lootnotes, lairLoot, carriedLoot, specificLoots, pleroma } = lootInfo
//     const { casting, spells } = castingInfo

//     const userid = isOwner(user.id) ? null : user.id

//     const effectiveTraitLimit = traitlimit > 0 ? traitlimit : null
//     const effectiveRelationshipLimit = relationshiplimit > 0 ? relationshiplimit : null
//     const effectiveFlawLimit = flawlimit > 0 ? flawlimit : null
//     const effectivePassionLimit = passionlimit > 0 ? passionlimit : null

//     let beastId = id ?? null
//     if (beastId) {
//         await databaseConnection.beast.update(beastId, name, intro, habitat, appearance, senses, diet, meta, sp_atk, sp_def, tactics, size, patreon,
//             vitality, panic, stress, lootnotes, effectiveTraitLimit, effectiveRelationshipLimit, effectiveFlawLimit,
//             effectivePassionLimit, plural, thumbnail, rarity, combatrole, combatpoints, socialrole, socialpoints, combatsecondary, skillrole, skillpoints, fatigue,
//             defaultrole, socialsecondary, notrauma, knockback, singledievitality, noknockback, rolenameorder, descriptionshare, convictionshare, relationshipshare, rollundertrauma,
//             imagesource, isincorporeal, weaponbreakagevitality, hasarchetypes, hasmonsterarchetypes, skillsecondary, atk_skill, def_skill, atk_conf, def_conf)
//             .catch((error: Error) => sendErrorForward('update main', error, response))
//     } else {
//         beastId = await databaseConnection.beast.add(userid, name, intro, habitat, appearance, senses, diet, meta, sp_atk, sp_def, tactics, size, patreon,
//             vitality, panic, stress, createHash(), lootnotes, effectiveTraitLimit, effectiveRelationshipLimit, effectiveFlawLimit,
//             effectivePassionLimit, plural, thumbnail, rarity, combatrole, combatpoints, socialrole, socialpoints, combatsecondary, skillrole, skillpoints, fatigue,
//             defaultrole, socialsecondary, notrauma, knockback, singledievitality, noknockback, rolenameorder, descriptionshare, convictionshare, relationshipshare, rollundertrauma,
//             imagesource, isincorporeal, weaponbreakagevitality, hasarchetypes, hasmonsterarchetypes, skillsecondary, atk_skill, def_skill, atk_conf, def_conf)
//             .catch((error: Error) => sendErrorForward('add main', error, response))[0].id
//     }

//     const updateParameters: upsertParameters = {
//         roles, types, climates, attacks, defenses, conflicts, skills, movements, variants, specificLoots, pleroma, locationalVitalities, locations, artistInfo, scenarios, folklores,
//         casting, deletedSpells, spells, obstacles, challenges, tables, encounters, lairLoot, carriedLoot
//     }

//     if (beastId) {
//         await upsertBeast(databaseConnection, beastId, response, updateParameters)
//     }

//     checkForContentTypeBeforeSending(response, { id: beastId })
// }

interface GetRequest extends Request {
    query?: GetBeastQuery
}

interface GetBeastQuery {
    edit: string
}

export async function getGMVersionOfBeast(request: GetRequest, response: Response) {
    const databaseConnection = getDatabaseConnection(request)
    const beastId = +request.params.beastId
    const isEditing = request.query ? request.query.edit === 'true' : false

    const beast: Beast | void = await getGMVersionOfBeastFromDB(databaseConnection, beastId, isEditing)
    
    if (beast) {
        checkForContentTypeBeforeSending(response, beast)
    } else {
        sendErrorForward('404', { message: 'No Beast Found'}, response)
    }
}

export async function getGMVersionOfBeastFromDB(databaseConnection: any, beastId: number, isEditing: boolean = false): Promise<Beast> {
    const [unsortedBeastInfo] = await databaseConnection.beast.get(beastId)
    const { id, patreon, canplayerview, name, plural, intro, habitat, ecology: appearance, senses, diet, meta, size, rarity, thumbnail, imagesource, rolenameorder, defaultrole, sp_atk,
        sp_def, tactics, combatpoints, role: combatrole, secondaryrole: combatsecondary, fatiguestrength: fatigue, notrauma, knockback, singledievitality, noknockback,
        rollundertrauma, isincorporeal, weaponbreakagevitality, largeweapons, panicstrength: panic, stressstrength: stress, skillrole, skillsecondary, skillpoints, atk_skill,
        def_skill, traitlimit, devotionlimit: relationshiplimit, flawlimit, passionlimit, socialrole, socialsecondary, socialpoints, descriptionshare, convictionshare,
        devotionshare: relationshipshare, atk_conf, def_conf, hasarchetypes, hasmonsterarchetypes, lootnotes } = unsortedBeastInfo
    
    let beast: Beast = {
        id, patreon, canplayerview,
        generalInfo: {
            name, plural, intro, habitat, appearance, senses, diet, meta, size, 
            rarity: getRarity(rarity),
            scenarios: [],
            folklores: [],
            tables: {
                habitat: [],
                attack: [],
                defense: [],
                appearance: []
            }
        },
        imageInfo: {
            thumbnail,
            imagesource,
            artistInfo: {
                genericArtistInfo: {
                    id: 0,
                    artistid: 0,
                    artist: '',
                    tooltip: '',
                    link: '',
                    roleid: ''
                },
                allartists: [],
                roleartists: []
            }
        },
        linkedInfo: {
            variants: [],
            locations: {
                alllocations: [],
                beast: []
            },
            types: [],
            climates: {
                allclimates: [],
                beast: []
            },
        },
        roleInfo: {
            rolenameorder, defaultrole,
            roles: []
        },
        combatInfo: {
            sp_atk, sp_def, tactics, combatpoints, combatrole, combatsecondary,
            initiative: '+0',
            attacks: [],
            defenses: [],
            movements: [],
            vitalityInfo: {
                notrauma, singledievitality, noknockback, rollundertrauma, isincorporeal, weaponbreakagevitality,
                knockback: calculateKnockBack(knockback, size),
                ...calculateVitalityFatigueAndTrauma(combatrole, combatsecondary, combatpoints, largeweapons, fatigue),
                locationalVitalities: []
            }
        },
        skillInfo: {
            skillrole, skillsecondary, skillpoints, atk_skill, def_skill,
            ...calculateStressAndPanic(skillrole, skillsecondary, skillpoints, stress, panic),
            skills: [],
            obstacles: [],
            challenges: [],
        },
        socialInfo: {
            traitlimit, relationshiplimit, flawlimit, passionlimit, socialrole, socialsecondary, socialpoints, descriptionshare, convictionshare, relationshipshare, atk_conf, def_conf,
            conflicts: {
                descriptions: [],
                convictions: [],
                relationships: [],
                flaws: [],
                burdens: []
            },
            archetypeInfo: {
                hasarchetypes, hasmonsterarchetypes
            }
        },
        lootInfo: {
            lootnotes,
            lairLoot: {},
            carriedLoot: {},
            pleroma: [],
            specificLoots: [],
        },
        castingInfo: {
            casting: {
                castingTypesArray: [],
                spellnumberdie: '',
                defaulttype: null,
                beastid: id
            },
            spells: [],
        }
    }
    let promiseArray: any[] = []

    promiseArray.push(getScenarios(databaseConnection, beast.id).then((scenarios: Scenario[]) => beast.generalInfo.scenarios = scenarios))
    promiseArray.push(getFolklore(databaseConnection, beast.id).then((folklores: Folklore[]) => beast.generalInfo.folklores = folklores))
    getTables(databaseConnection, beast.id, beast.generalInfo.tables, promiseArray)

    promiseArray.push(getArtistInfo(databaseConnection, beast.id, isEditing).then((artistInfo: ArtistObject) => beast.imageInfo.artistInfo = artistInfo))

    promiseArray.push(getVariants(databaseConnection, beast.id).then((variants: Variant[]) => beast.linkedInfo.variants = variants))
    promiseArray.push(getLocations(databaseConnection, beast.id, isEditing).then((locations: LocationObject) => beast.linkedInfo.locations = locations))
    promiseArray.push(getTypes(databaseConnection, beast.id).then((types: BeastType[]) => beast.linkedInfo.types = types))
    promiseArray.push(getClimates(databaseConnection, beast.id).then((climates: ClimateObject) => beast.linkedInfo.climates = climates))

    promiseArray.push(getRoles(databaseConnection, beast.id, beast.generalInfo.name).then((roles: Role[]) => beast.roleInfo.roles = roles))

    promiseArray.push(getMovement(databaseConnection, beast.id, combatpoints, combatrole).then((movements: Movement[]) => beast.combatInfo.movements = movements))
    promiseArray.push(getCombatStats(databaseConnection, beast.id, combatpoints, combatrole, size).then((attackAndDefenses: CalculateCombatStatsReturn) => beast.combatInfo = { ...beast.combatInfo, ...attackAndDefenses } ))

    promiseArray.push(getLocationalVitalities(databaseConnection, beast.id).then((locationalVitalities: LocationVitality[]) => beast.combatInfo.vitalityInfo.locationalVitalities = locationalVitalities))

    promiseArray.push(getSkills(databaseConnection, beast.id, skillpoints).then((skills: Skill[]) => beast.skillInfo.skills = skills))
    promiseArray.push(getChallenges(databaseConnection, beast.id).then((challenges: Challenge[]) => beast.skillInfo.challenges = challenges))
    promiseArray.push(getObstacles(databaseConnection, beast.id).then((obstacles: Obstacle[]) => beast.skillInfo.obstacles = obstacles))

    promiseArray.push(getConflict(databaseConnection, beast.id, isEditing, traitlimit, relationshiplimit, flawlimit, socialpoints).then((conflicts: ConflictObject) => beast.socialInfo.conflicts = conflicts))
    promiseArray.push(getArchetypes(databaseConnection, isEditing, hasarchetypes, hasmonsterarchetypes).then((archetypeInfo: Archetype) => beast.socialInfo.archetypeInfo.archetypes = archetypeInfo))

    promiseArray.push(getPleroma(databaseConnection, beast.id).then((pleroma: Pleroma[]) => beast.lootInfo.pleroma = pleroma))
    promiseArray.push(getSpecificLoots(databaseConnection, beast.id).then((specificLoots: SpecificLoot[]) => beast.lootInfo.specificLoots = specificLoots))

    promiseArray.push(getLairBasic(databaseConnection, beast.id).then((basicLoot: Loot) => beast.lootInfo.lairLoot = { ...beast.lootInfo.lairLoot, ...basicLoot }))
    promiseArray.push(getLairAlms(databaseConnection, beast.id).then((alms: Alm[]) => beast.lootInfo.lairLoot = { ...beast.lootInfo.lairLoot, alms }))
    promiseArray.push(getLairItems(databaseConnection, beast.id, isEditing).then((items: Item[] | Object) => beast.lootInfo.lairLoot = { ...beast.lootInfo.lairLoot, items }))
    promiseArray.push(getLairScrolls(databaseConnection, beast.id).then((scrolls: Scroll[]) => beast.lootInfo.lairLoot = { ...beast.lootInfo.lairLoot, scrolls }))

    promiseArray.push(getCarriedBasic(databaseConnection, beast.id).then((basicLoot: Loot) => beast.lootInfo.carriedLoot = { ...beast.lootInfo.carriedLoot, ...basicLoot }))
    promiseArray.push(getCarriedAlms(databaseConnection, beast.id).then((alms: Alm[]) => beast.lootInfo.carriedLoot = { ...beast.lootInfo.carriedLoot, alms }))
    promiseArray.push(getCarriedItems(databaseConnection, beast.id, isEditing).then((items: Item[] | Object) => beast.lootInfo.carriedLoot = { ...beast.lootInfo.carriedLoot, items }))
    promiseArray.push(getCarriedScrolls(databaseConnection, beast.id).then((scrolls: Scroll[]) => beast.lootInfo.carriedLoot = { ...beast.lootInfo.carriedLoot, scrolls }))

    promiseArray.push(getCasting(databaseConnection, beast.id).then((casting: Casting) => beast.castingInfo.casting = casting))
    promiseArray.push(getSpells(databaseConnection, beast.id).then((spells: Spell[]) => beast.castingInfo.spells = spells))

    return Promise.all(promiseArray).then(_ => beast)
}
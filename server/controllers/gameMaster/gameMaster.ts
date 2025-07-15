import { Response, Request, BasicParamsRequest } from "../../interfaces/apiInterfaces"
import { Alm, Item, Loot, Scroll, SpecificLoot } from "../../interfaces/lootInterfaces"
import { Challenge, Obstacle } from "../../interfaces/skillInterfaces"

import getDatabaseConnection from "../../utilities/databaseConnection"
import { isOwner } from "../../utilities/ownerAccess"
import createHash from "../../utilities/hashGeneration"
// import upsertBeast from "../../utilities/upserts/upsertBeast"
import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../../utilities/sendingFunctions'
import { getScenarios, getFolklore, getArtistInfo, getVariants, getLocations, getTypes, getClimates, getLocationalVitalities,
    getPleroma, getSpecificLoots, getLairBasic, getLairAlms, getLairItems, getLairScrolls, getCarriedBasic, 
    getCarriedAlms, getCarriedItems, getCarriedScrolls, getCasting, getSpells } from "./utilities/getBeast"
import { calculateStressAndPanic } from "../../../common/utilities/scalingAndBonus/skill/stressAndPanicCalculator"
import { getRoles } from "./utilities/getUtilities/getRoleInfo"
import { getCombatStats, getMovement } from "./utilities/getUtilities/getCombatInfo"
import { getChallenges } from "./utilities/getUtilities/skillRelatedInfo/getChallenges"
import { getSkills } from "./utilities/getUtilities/skillRelatedInfo/getSkills"
import { getObstacles } from "./utilities/getUtilities/skillRelatedInfo/getObstacles"
import { getArchetypes, GetArchetypesReturn, getConflict } from "./utilities/getUtilities/getConfrontationInfo"
import { CalculateCombatStatsReturn } from "../../../common/utilities/scalingAndBonus/combat/combatCalculation"
import { calculateVitalityFatigueAndTrauma } from "../../../common/utilities/scalingAndBonus/combat/vitalityFatigueAndTraumaCalculator"
import calculateKnockBack from "../../../common/utilities/scalingAndBonus/combat/knockBackCalculator"
import { Beast } from "../../../common/interfaces/beast/beast"
import { Skill } from "../../../common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import { Folklore, Scenario, TablesObject } from "../../../common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { ArtistObject } from "../../../common/interfaces/beast/infoInterfaces/ImageInfoInterfaces"
import { BeastType, ClimateObject, LocationObject, Variant } from "../../../common/interfaces/beast/infoInterfaces/linkedInfoInterfaces"
import { Role } from "../../../common/interfaces/beast/infoInterfaces/roleInfoInterfaces"
import { Pleroma } from "../../../common/interfaces/beast/infoInterfaces/lootInfoInterfaces"
import { getDifficultyDie } from "../../../common/utilities/scalingAndBonus/confrontation/confrontationCalculator"
import { Casting, Spell } from "../../../common/interfaces/beast/infoInterfaces/castingInfo"
import { ConflictObject } from "../../../common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import { getFavorite, getNotes } from "./utilities/getUtilities/getPlayerInfo"
import { Notes } from "../../../common/interfaces/beast/infoInterfaces/playerSpecificInfoInterfaces"
import { getRarity } from "../../utilities/rarity"
import { LocationVitality, Movement } from "../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import getTables from "./utilities/getUtilities/getTables"

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

interface GetRequest extends BasicParamsRequest {
    query?: GetBeastQuery
}

interface GetBeastQuery {
    edit: string
}

export async function getGMVersionOfBeast(request: GetRequest, response: Response) {
    const databaseConnection = getDatabaseConnection(request)
    const beastId = +request.params.beastId
    const isEditing = request.query ? request.query.edit === 'true' : false
    const userID = request.user?.id

    const beast: Beast = await getGMVersionOfBeastFromDB(databaseConnection, beastId, {isEditing, userID})
    
    if (beast) {
        checkForContentTypeBeforeSending(response, beast)
    } else {
        sendErrorForward('404', { message: 'No Beast Found'}, response)
    }
}

interface GetBeastOptions {
    isEditing: boolean,
    userID?: number
}

export async function getGMVersionOfBeastFromDB(databaseConnection: any, beastId: number, options: GetBeastOptions = {isEditing: false}): Promise<Beast> {
    const { isEditing, userID } = options

    const [unsortedBeastInfo] = await databaseConnection.beast.get(beastId)
    const { id, patreon, canplayerview, name, plural, intro, habitat, ecology: appearance, senses, diet, meta, size, rarity, thumbnail, imagesource, rolenameorder, defaultrole, sp_atk,
        sp_def, tactics, combatpoints, role: combatrole, secondaryrole: combatsecondary, fatiguestrength: fatigue, notrauma, knockback, singledievitality, noknockback,
        rollundertrauma, isincorporeal, weaponbreakagevitality, largeweapons, panicstrength: panic, stressstrength: stress, skillrole, skillsecondary, skillpoints, atk_skill,
        def_skill, traitlimit, devotionlimit: relationshiplimit, flawlimit, passionlimit, socialrole, socialsecondary, socialpoints, descriptionshare, convictionshare,
        devotionshare: relationshipshare, atk_conf, def_conf, hasarchetypes, hasmonsterarchetypes, lootnotes } = unsortedBeastInfo

    let beast: Beast = {
        id, patreon, canplayerview,
        playerInfo: {
            favorite: false,
            notes: {
                notes: ''
            }
        },
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
            tactics, combatpoints, combatrole, combatsecondary,
            sp_atk: sp_atk ?? '', 
            sp_def: sp_def ?? '', 
            initiative: '+0',
            attacks: [],
            defenses: [],
            movements: [],
            vitalityInfo: {
                notrauma, singledievitality, noknockback, rollundertrauma, isincorporeal, weaponbreakagevitality,
                vitalityStrength: largeweapons,
                fatigueStrength: fatigue,
                knockback: calculateKnockBack(knockback, size),
                ...calculateVitalityFatigueAndTrauma(combatrole, combatsecondary, combatpoints, largeweapons, fatigue),
                locationalVitalities: []
            }
        },
        skillInfo: {
            skillrole, skillsecondary, skillpoints,
            atk_skill: atk_skill ?? '', 
            def_skill: def_skill ?? '', 
            stressStrength: stress,
            panicStrength: panic,
            ...calculateStressAndPanic(skillrole, skillsecondary, skillpoints, stress, panic),
            skills: [],
            obstacles: [],
            challenges: [],
        },
        socialInfo: {
            traitlimit, relationshiplimit, flawlimit, passionlimit, socialrole, socialsecondary, socialpoints, descriptionshare, convictionshare, relationshipshare, 
            atk_conf: atk_conf ?? '', 
            def_conf: def_conf ?? '',
            conflicts: {
                descriptions: [],
                convictions: [],
                relationships: [],
                flaws: [],
                burdens: []
            },
            archetypeInfo: {
                hasarchetypes, hasmonsterarchetypes,
                difficultyDie: getDifficultyDie(socialpoints) 
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
    
    if (userID) {
        promiseArray.push(getFavorite(databaseConnection, beast.id, userID).then((isFavorite: boolean) => beast.playerInfo.favorite = isFavorite))
        promiseArray.push(getNotes(databaseConnection, beast.id, userID).then((notes: Notes) => beast.playerInfo.notes = notes))
    }

    promiseArray.push(getScenarios(databaseConnection, beast.id).then((scenarios: Scenario[]) => beast.generalInfo.scenarios = scenarios))
    promiseArray.push(getFolklore(databaseConnection, beast.id).then((folklores: Folklore[]) => beast.generalInfo.folklores = folklores))
    promiseArray.push(getTables(databaseConnection, beast.id).then((tables: TablesObject) => beast.generalInfo.tables = tables))

    promiseArray.push(getArtistInfo(databaseConnection, beast.id, isEditing).then((artistInfo: ArtistObject) => beast.imageInfo.artistInfo = artistInfo))

    promiseArray.push(getVariants(databaseConnection, beast.id).then((variants: Variant[]) => beast.linkedInfo.variants = variants))
    promiseArray.push(getLocations(databaseConnection, beast.id, isEditing).then((locations: LocationObject) => beast.linkedInfo.locations = locations))
    promiseArray.push(getTypes(databaseConnection, beast.id).then((types: BeastType[]) => {
        const isABeast = types.find((type: BeastType): boolean => type.typeid === 5)
        if (isABeast) {
            const beastBonus = "<p>When this creature gains a negative Emotional State, it doubles its current Rank in that Emotional State and doubles the Rank it's gaining. Any positive Emotinoal State gain is halved (rounded up).</p>"
            beast.socialInfo.def_conf += beastBonus
        }

        beast.linkedInfo.types = types
    }))
    promiseArray.push(getClimates(databaseConnection, beast.id).then((climates: ClimateObject) => beast.linkedInfo.climates = climates))

    promiseArray.push(getRoles(databaseConnection, beast.id, beast.generalInfo.name).then((roles: Role[]) => beast.roleInfo.roles = roles))

    promiseArray.push(getMovement(databaseConnection, beast.id, combatpoints, combatrole).then((movements: (Movement| null)[]) => beast.combatInfo.movements = movements))
    promiseArray.push(getCombatStats(databaseConnection, beast.id, combatpoints, combatrole, size).then((attackAndDefenses: CalculateCombatStatsReturn) => beast.combatInfo = { ...beast.combatInfo, ...attackAndDefenses } ))

    promiseArray.push(getLocationalVitalities(databaseConnection, beast.id).then((locationalVitalities: LocationVitality[]) => beast.combatInfo.vitalityInfo.locationalVitalities = locationalVitalities))

    promiseArray.push(getSkills(databaseConnection, beast.id, skillpoints).then((skills: Skill[]) => beast.skillInfo.skills = skills))
    promiseArray.push(getChallenges(databaseConnection, beast.id).then((challenges: Challenge[]) => beast.skillInfo.challenges = challenges))
    promiseArray.push(getObstacles(databaseConnection, beast.id).then((obstacles: Obstacle[]) => beast.skillInfo.obstacles = obstacles))

    promiseArray.push(getConflict(databaseConnection, beast.id, isEditing, traitlimit, relationshiplimit, flawlimit, socialpoints).then((conflicts: ConflictObject) => beast.socialInfo.conflicts = conflicts))
    promiseArray.push(getArchetypes(databaseConnection, isEditing).then((archetypeInfo: GetArchetypesReturn) => {
        beast.socialInfo.archetypeInfo = {
            ...beast.socialInfo.archetypeInfo,
            ...archetypeInfo
        }
    }))

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
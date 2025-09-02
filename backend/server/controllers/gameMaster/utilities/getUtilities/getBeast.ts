import { Beast } from "@bestiary/common/interfaces/beast/beast"
import { Casting, Spell } from "@bestiary/common/interfaces/beast/infoInterfaces/castingInfo"
import { Movement, LocationVitality } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Scenario, Folklore, TablesObject } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { ArtistObject } from "@bestiary/common/interfaces/beast/infoInterfaces/ImageInfoInterfaces"
import { Variant, LocationObject, BeastType, ClimateObject } from "@bestiary/common/interfaces/beast/infoInterfaces/linkedInfoInterfaces"
import { Pleroma } from "@bestiary/common/interfaces/beast/infoInterfaces/lootInfoInterfaces"
import { Notes } from "@bestiary/common/interfaces/beast/infoInterfaces/playerSpecificInfoInterfaces"
import { Role } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces"
import { Skill } from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import { ConflictObject } from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import { CalculateCombatStatsReturn } from "@bestiary/common/utilities/scalingAndBonus/combat/combatCalculation"
import { calculateVitalityFatigueAndTrauma } from "@bestiary/common/utilities/scalingAndBonus/combat/vitalityFatigueAndTraumaCalculator"
import { getDifficultyDie } from "@bestiary/common/utilities/scalingAndBonus/confrontation/confrontationCalculator"
import { calculateStressAndPanic } from "@bestiary/common/utilities/scalingAndBonus/skill/stressAndPanicCalculator"
import { SpecificLoot, Loot, Alm, Item, Scroll } from "../../../../interfaces/lootInterfaces"
import { Challenge, Obstacle } from "../../../../interfaces/skillInterfaces"
import { isOwner } from "../../../../utilities/ownerAccess"
import { getRarity } from "../../../../utilities/rarity"
import { getChallenges } from "./utilities/skillRelatedInfo/getChallenges"
import { getCombatStats } from "./utilities/combatRelatedInfo/getCombatInfo"
import { getConflict, getArchetypes, GetArchetypesReturn } from "./utilities/getConfrontationInfo"
import { getFavorite, getNotes } from "./utilities/getPlayerInfo"
import { getRoles } from "./utilities/getRoleInfo"
import getTables from "./utilities/getTables"
import { getScenarios, getFolklore, getArtistInfo, getVariants, getLocations, getTypes, getClimates, getLocationalVitalities, getPleroma, getSpecificLoots, getLairBasic, getLairAlms, getLairItems, getLairScrolls, getCarriedBasic, getCarriedAlms, getCarriedItems, getCarriedScrolls, getCasting, getSpells } from "./utilities/miscInfo/getMiscInfo"
import { getObstacles } from "./utilities/skillRelatedInfo/getObstacles"
import { getSkills } from "./utilities/skillRelatedInfo/getSkills"
import getMovement from "./utilities/combatRelatedInfo/utilities/getMovement"
import calculateKnockBack from "@bestiary/common/utilities/scalingAndBonus/combat/knockBackCalculator"
import GearCacheClass from "../../../gear/model/GearCacheClass"

interface GetBeastOptions {
    isEditing: boolean,
    userID?: number,
    gearCache?: GearCacheClass | undefined
}

export async function getGMVersionOfBeastFromDB(databaseConnection: any, beastId: number, options: GetBeastOptions = { isEditing: false }): Promise<Beast> {
    const { isEditing, userID, gearCache } = options

    const [unsortedBeastInfo] = await databaseConnection.beast.get(beastId)
    const { id, patreon, canplayerview, name, plural, intro, habitat, ecology: appearance, senses, diet, meta, size, rarity, thumbnail, imagesource, rolenameorder, defaultrole, sp_atk,
        sp_def, tactics, combatpoints, role: combatrole, secondaryrole: combatsecondary, fatiguestrength: fatigue, notrauma, knockback, singledievitality, noknockback,
        rollundertrauma, isincorporeal, weaponbreakagevitality, largeweapons, panicstrength: panic, stressstrength: stress, skillrole, skillsecondary, skillpoints, atk_skill,
        def_skill, traitlimit, devotionlimit: relationshiplimit, flawlimit, passionlimit, socialrole, socialsecondary, socialpoints, descriptionshare, convictionshare,
        devotionshare: relationshipshare, atk_conf, def_conf, hasarchetypes, hasmonsterarchetypes, lootnotes, userid: beastOwnerId } = unsortedBeastInfo

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
            beastOwnerId: beastOwnerId,
            canEdit: isOwner(userID) || userID === beastOwnerId,
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

    promiseArray.push(getMovement(databaseConnection, beast.id, combatpoints, combatrole).then((movements: (Movement | null)[]) => beast.combatInfo.movements = movements))
    promiseArray.push(getCombatStats(databaseConnection, beast.id, combatpoints, combatrole, size, gearCache).then((attackAndDefenses: CalculateCombatStatsReturn) => beast.combatInfo = { ...beast.combatInfo, ...attackAndDefenses }))

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
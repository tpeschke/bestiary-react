import { Beast } from "@bestiary/common/interfaces/beast/beast"
import { Casting, Spell } from "@bestiary/common/interfaces/beast/infoInterfaces/castingInfo"
import { Movement, LocationVitality, StrategyNLimits } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Scenario, Folklore, TablesObject, Palette } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { ArtistObject } from "@bestiary/common/interfaces/beast/infoInterfaces/ImageInfoInterfaces"
import { Variant, LocationObject, BeastType, ClimateObject } from "@bestiary/common/interfaces/beast/infoInterfaces/linkedInfoInterfaces"
import { Pleroma } from "@bestiary/common/interfaces/beast/infoInterfaces/lootInfoInterfaces"
import { Notes } from "@bestiary/common/interfaces/beast/infoInterfaces/playerSpecificInfoInterfaces"
import { Role } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces"
import { ConflictObject } from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import { CalculateCombatStatsReturn } from "@bestiary/common/utilities/scalingAndBonus/combat/combatCalculation"
import { SpecificLoot, Loot, Alm, Item, Scroll } from "../../../../interfaces/lootInterfaces"
import { Challenge, Obstacle } from "../../../../interfaces/skillInterfaces"
import { isOwner } from "../../../../utilities/ownerAccess"
import { getRarity } from "../../../../utilities/rarity"
import { getCombatStats } from "./utilities/combatInfo/weaponInfo/getCombatInfo"
import { getFavorite, getNotes } from "./utilities/getPlayerInfo"
import { getRoles } from "./utilities/getRoleInfo"
import getTables from "./utilities/getTables"
import { getScenarios, getFolklore, getArtistInfo, getVariants, getLocations, getTypes, getClimates, getLocationalVitalities, getSpecificLoots, getLairBasic, getLairAlms, getLairItems, getLairScrolls, getCarriedBasic, getCarriedAlms, getCarriedItems, getCarriedScrolls, getCasting, getSpells } from "./utilities/generalInfo/miscInfo/getMiscInfo"
import getMovement from "./utilities/combatInfo/weaponInfo/utilities/getMovement"
import query from "../../../../db/database"
import { getBasicMonsterInfo } from "../../../../db/beast/basicSQL"
import formatSocialInfo from "./utilities/socialInfo/getSocialInfo"
import { getArchetypes, GetArchetypesReturn } from "./utilities/socialInfo/utilities/getArchetypes"
import { getConflict } from "./utilities/socialInfo/utilities/getConflict"
import { getChallenges } from "./utilities/skillInfo/utilities/getChallenges"
import { getObstacles } from "./utilities/skillInfo/utilities/getObstacles"
import formatSkillInfo from "./utilities/skillInfo/getSkillInfo"
import formatCombatInfo from "./utilities/combatInfo/formatCombatInfo"
import getPleroma from "./utilities/lootInfo/getPleroma"
import getPalette from "./utilities/generalInfo/getPalette"
import getStrategiesNLimits from "./utilities/combatInfo/getStrategiesNLimits"

interface GetBeastOptions {
    isEditing: boolean,
    userID?: number,
    gearCache?: any | undefined
}

export async function getGMVersionOfBeastFromDB(beastId: number, options: GetBeastOptions = { isEditing: false }): Promise<Beast> {
    const { isEditing, userID, gearCache } = options

    const [unsortedBeastInfo] = await query(getBasicMonsterInfo, beastId)
    const { id, patreon, canplayerview, name, plural, intro, habitat, ecology: appearance, senses, diet, meta, size, rarity, thumbnail, imagesource, rolenameorder, defaultrole, sp_atk,
        sp_def, combatpoints, role: combatrole, secondaryrole: combatsecondary, notrauma, knockback, singledievitality, noknockback,
        rollundertrauma, isincorporeal, weaponbreakagevitality, skillrole, skillsecondary, skillpoints, atk_skill,
        def_skill, socialrole, socialsecondary, socialpoints, atk_conf, def_conf, hasarchetypes, hasmonsterarchetypes, lootnotes, userid: beastOwnerId,
        combatskulls, socialskulls, skillskulls
    } = unsortedBeastInfo

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
            },
            palette: {
                drives: null,
                needs: null,
                defenses: null,
                logistics: null,
                methods: null,
                groupDescriptions: null
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
        combatInfo: formatCombatInfo(
            combatrole, combatsecondary, combatskulls, combatpoints, sp_atk, sp_def, notrauma, knockback, singledievitality,
            noknockback, rollundertrauma, isincorporeal, weaponbreakagevitality, size
        ),
        skillInfo: formatSkillInfo(skillrole, skillsecondary, skillpoints, skillskulls, atk_skill, def_skill),
        socialInfo: formatSocialInfo(socialrole, socialsecondary, atk_conf, def_conf, socialpoints, socialskulls, hasarchetypes, hasmonsterarchetypes),
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

    let promiseArray: any[] = [
        getScenarios(beast.id).then((scenarios: Scenario[]) => beast.generalInfo.scenarios = scenarios),
        getFolklore(beast.id).then((folklores: Folklore[]) => beast.generalInfo.folklores = folklores),
        getPalette(beast.id).then((palette: Palette) => beast.generalInfo.palette = palette),
        getTables(beast.id).then((tables: TablesObject) => beast.generalInfo.tables = tables),

        getArtistInfo(beast.id, isEditing).then((artistInfo: ArtistObject) => beast.imageInfo.artistInfo = artistInfo),

        getVariants(beast.id).then((variants: Variant[]) => beast.linkedInfo.variants = variants),
        getLocations(beast.id, isEditing).then((locations: LocationObject) => beast.linkedInfo.locations = locations),
        getTypes(beast.id).then((types: BeastType[]) => {
            const isABeast = types.find((type: BeastType): boolean => type.typeid === 5)
            if (isABeast) {
                const beastBonus = "<p>When this creature gains a negative Emotional State, it doubles its current Rank in that Emotional State and doubles the Rank it's gaining. Any positive Emotinoal State gain is halved (rounded up).</p>"
                beast.socialInfo.defenseInfo += beastBonus
            }

            beast.linkedInfo.types = types
        }),
        getClimates(beast.id).then((climates: ClimateObject) => beast.linkedInfo.climates = climates),

        getRoles(beast.id, beast.generalInfo.name).then((roles: Role[]) => beast.roleInfo.roles = roles),

        getMovement(beast.id, beast.combatInfo.skullIndex, beast.combatInfo.combatRole).then((movements: Movement[]) => beast.combatInfo.movements = movements),
        getCombatStats(beast.id, beast.combatInfo.skullIndex, beast.combatInfo.combatRole, size, gearCache).then((attackAndDefenses: CalculateCombatStatsReturn) => beast.combatInfo = { ...beast.combatInfo, ...attackAndDefenses }),
        getStrategiesNLimits(beast.id).then((strategiesNLimits: StrategyNLimits[]) => beast.combatInfo.strategiesNLimits = strategiesNLimits),

        getLocationalVitalities(beast.id).then((locationalVitalities: LocationVitality[]) => beast.combatInfo.vitalityInfo.locationalVitalities = locationalVitalities),

        getChallenges(beast.id).then((challenges: Challenge[]) => beast.skillInfo.challenges = challenges),
        getObstacles(beast.id).then((obstacles: Obstacle[]) => beast.skillInfo.obstacles = obstacles),

        getConflict(beast.id, isEditing, beast.socialInfo.skullIndex, beast.socialInfo.socialRole).then((conflicts: ConflictObject) => beast.socialInfo.conflicts = conflicts),
        getArchetypes(isEditing).then((archetypeInfo: GetArchetypesReturn) => {
            beast.socialInfo.archetypeInfo = {
                ...beast.socialInfo.archetypeInfo,
                ...archetypeInfo
            }
        }),
        
        getPleroma(beast.id).then((pleroma: Pleroma[]) => beast.lootInfo.pleroma = pleroma),
        getSpecificLoots(beast.id).then((specificLoots: SpecificLoot[]) => beast.lootInfo.specificLoots = specificLoots),

        getLairBasic(beast.id).then((basicLoot: Loot) => beast.lootInfo.lairLoot = { ...beast.lootInfo.lairLoot, ...basicLoot }),
        getLairAlms(beast.id).then((alms: Alm[]) => beast.lootInfo.lairLoot = { ...beast.lootInfo.lairLoot, alms }),
        getLairItems(beast.id, isEditing).then((items: Item[] | Object) => beast.lootInfo.lairLoot = { ...beast.lootInfo.lairLoot, items }),
        getLairScrolls(beast.id).then((scrolls: Scroll[]) => beast.lootInfo.lairLoot = { ...beast.lootInfo.lairLoot, scrolls }),

        getCarriedBasic(beast.id).then((basicLoot: Loot) => beast.lootInfo.carriedLoot = { ...beast.lootInfo.carriedLoot, ...basicLoot }),
        getCarriedAlms(beast.id).then((alms: Alm[]) => beast.lootInfo.carriedLoot = { ...beast.lootInfo.carriedLoot, alms }),
        getCarriedItems(beast.id, isEditing).then((items: Item[] | Object) => beast.lootInfo.carriedLoot = { ...beast.lootInfo.carriedLoot, items }),
        getCarriedScrolls(beast.id).then((scrolls: Scroll[]) => beast.lootInfo.carriedLoot = { ...beast.lootInfo.carriedLoot, scrolls }),

        getCasting(beast.id).then((casting: Casting) => beast.castingInfo.casting = casting),
        getSpells(beast.id).then((spells: Spell[]) => beast.castingInfo.spells = spells)
    ]

    if (userID) {
        promiseArray.push(getFavorite(beast.id, userID).then((isFavorite: boolean) => beast.playerInfo.favorite = isFavorite))
        promiseArray.push(getNotes(beast.id, userID).then((notes: Notes) => beast.playerInfo.notes = notes))
    }

    return Promise.all(promiseArray).then(_ => beast)
}
import { Casting, Spell } from "@bestiary/common/interfaces/beast/infoInterfaces/castingInfo"
import { LocationVitality } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Folklore, Scenario } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { ArtistObject, ArtistInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/ImageInfoInterfaces"
import { BeastType, ClimateObject, Climate, Variant, LocationObject, Location } from "@bestiary/common/interfaces/beast/infoInterfaces/linkedInfoInterfaces"
import { User } from "../../../../../../interfaces/apiInterfaces"
import { SpecificLoot, Loot, Alm, Item, Scroll } from "../../../../../../interfaces/lootInterfaces"
import rollDice from "../../../../../../utilities/diceRoller"
import { isOwner } from "../../../../../../utilities/ownerAccess"
import { objectifyItemArray } from "../../../../../../utilities/sorts"
import query from "../../../../../../db/database"
import { getAllArtists, getMonsterArtist } from "../../../../../../db/beast/artist"
import { getVariantInfo } from "../../../../../../db/beast/variant"
import { getAllLocations, getMonsterLocations } from "../../../../../../db/beast/locations"
import { getMonsterTypes } from "../../../../../../db/beast/type"
import { getAllClimates, getMonsterClimates } from "../../../../../../db/beast/climate"
import { getMonsterLocationalVitalities } from "../../../../../../db/beast/locationalVitality"
import { getSpecificMonsterLoot } from "../../../../../../db/loot/specific"
import { getMonsterLairAlmScripts, getMonsterLairBasicLoot, getMonsterLairItems, getMonsterLairScrolls } from "../../../../../../db/loot/lair"
import { getMonsterCarriedAlmScript, getMonsterCarriedBasic, getMonsterCarriedItems, getMonsterCarriedScrolls } from "../../../../../../db/loot/carried"
import { getMonsterCasting } from "../../../../../../db/beast/casting"
import { getMonsterSpells } from "../../../../../../db/beast/spell"
import { getMonsterScenarios } from "../../../../../../db/beast/scenario"
import { getMonsterFolklore } from "../../../../../../db/beast/folklore"

export function hasAppropriatePatreonLevel(user: User | null | undefined, beastPatron: number, canPlayerView: boolean): string {
    if (canPlayerView || (user && isOwner(user.id))) {
        return 'gm'
    } else if (user && user.patreon) {
        const effectivePatreon = beastPatron === 0 ? beastPatron + 3 : beastPatron
        if (effectivePatreon <= user.patreon) {
            return 'gm'
        } else {
            return 'player'
        }
    }
    return 'player'
}

export async function getTypes(beastId: number): Promise<BeastType[]> {
    const beastTypes: BeastType[] = await query(getMonsterTypes, beastId)

    return beastTypes.map(type => {
        return {
            ...type
        }
    })
}

export async function getClimates(beastId: number): Promise<ClimateObject> {
    const beast: Climate[] = await query(getMonsterClimates, beastId)
    const allclimates = await query(getAllClimates)
    return {
        beast,
        allclimates
    }
}

export async function getArtistInfo(beastId: number, isEditing: boolean): Promise<ArtistObject> {
    let allartists: ArtistInfo[] = []
    if (isEditing) {
        allartists = await query(getAllArtists, beastId)
    }

    const genericArtistInfo: ArtistInfo[] = await query(getMonsterArtist, beastId)

    return {
        genericArtistInfo: genericArtistInfo[0],
        roleartists: genericArtistInfo.splice(1),
        allartists
    }
}

export async function getLocations(beastId: number, isEditing: boolean): Promise<LocationObject> {
    let alllocations: Location[] = []
    if (isEditing) {
        alllocations = await query(getAllLocations, beastId)
    }

    const beast: Location[] = await query(getMonsterLocations, beastId)

    return {
        beast,
        alllocations
    }
}

export async function getVariants(beastId: number): Promise<Variant[]> {
    return query(getVariantInfo, beastId)
}

export async function getSpecificLoots(beastId: number): Promise<SpecificLoot[]> {
    return query(getSpecificMonsterLoot, beastId)
}

export async function getLairBasic(beastId: number): Promise<Loot> {
    const [lootInfo] = await query(getMonsterLairBasicLoot, beastId)
    return lootInfo
}

export async function getLairAlms(beastId: number): Promise<Alm[]> {
    return query(getMonsterLairAlmScripts, beastId)
}

export async function getLairItems(beastId: number, isEditing: boolean): Promise<Item[] | Object> {
    const items: Item[] = await query(getMonsterLairItems, beastId)

    if (isEditing) {
        return objectifyItemArray(items)
    } else {
        return items
    }
}

export async function getLairScrolls(beastId: number): Promise<Scroll[]> {
    return query(getMonsterLairScrolls, beastId)
}

export async function getCarriedBasic(beastId: number): Promise<Loot> {
    const [lootInfo] = await query(getMonsterCarriedBasic, beastId)
    return lootInfo
}

export async function getCarriedAlms(beastId: number): Promise<Alm[]> {
    return query(getMonsterCarriedAlmScript, beastId)
}

export async function getCarriedItems(beastId: number, isEditing: boolean): Promise<Item[] | Object> {
    const items: Item[] = await query(getMonsterCarriedItems, beastId)

    if (isEditing) {
        return objectifyItemArray(items)
    } else {
        return items
    }
}

export async function getCarriedScrolls(beastId: number): Promise<Scroll[]> {
    return query(getMonsterCarriedScrolls, beastId)
}

export async function getLocationalVitalities(beastId: number): Promise<LocationVitality[]> {
    const returnedVitalities = await query(getMonsterLocationalVitalities, beastId)

    return returnedVitalities.map((vitality: LocationVitality) => {
        return {
            ...vitality,
            vitality: rollDice(vitality.vitality)
        }
    })
}

export async function getFolklore(beastId: number): Promise<Folklore[]> {
    return query(getMonsterFolklore, beastId)
}

export async function getScenarios(beastId: number): Promise<Scenario[]> {
    return query(getMonsterScenarios, beastId)
}

export async function getCasting(beastId: number): Promise<Casting> {
    const [casting] = await query(getMonsterCasting, beastId)
    const { augur, wild, vancian, manifesting, commanding, bloodpact, spellnumberdie, defaulttype, beastid } = casting

    // currently this is a string but, as I migrate monsters, I want to change it over to just use the index so this is just a temporary stopgap
    const defaultTypeIndexDictionary: { [key: string]: number } = {
        'Augury': 0,
        'Wild Magic': 1,
        'Vancian': 2,
        'Manifesting': 3,
        'Adamic Commanding': 4,
        'Blood Pact': 5
    }

    return {
        spellnumberdie, beastid,
        defaulttype: defaultTypeIndexDictionary[defaulttype],
        castingTypesArray: [augur, wild, vancian, manifesting, commanding, bloodpact]
    }
}

export async function getSpells(beastId: number): Promise<Spell[]> {
    return query(getMonsterSpells, beastId)}
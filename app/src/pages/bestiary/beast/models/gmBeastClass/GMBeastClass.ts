import { BeastInfo } from "../../interfaces/viewInterfaces";
import getSystemString from "@bestiary/common/utilities/get/getSystemString";

interface ModifierIndexDictionaryObject {
    [key: string]: number
}

const modifierIndexDictionary: ModifierIndexDictionaryObject = {
    'NONE': 0,
    'UNIQUE': 5,
    'GREATER': 10,
    'DREAD': 15,
    'THE': 20
}

function getSelectedModifier(modifier: number = 0, modifierFromParam: string | null): number {
    if (modifierFromParam && modifierIndexDictionary[modifierFromParam.toUpperCase()]) {
        return modifierIndexDictionary[modifierFromParam.toUpperCase()]
    } else if (modifierFromParam) {
        return +modifierFromParam
    }

    return modifier
}

/**
 * GMBeastClass is now nothing more than a normalizer: it takes the raw data
 * (optionally with a system override and a `modifier` URL parameter) and exposes
 * a single, fully-formed `BeastInfo` object.
 *
 * All of the data-transformation logic that used to live here has been moved
 * into the redux `activeBeast` selectors (`activeBeastSelectors.ts`).
 */
export default class GMBeastClass {
    private normalizedBeastInfo: BeastInfo

    constructor(beastInfo: BeastInfo, modifier: string | null, newSystem?: 0 | 1 | 2) {
        const system = newSystem || newSystem === 0 ? getSystemString(newSystem) : beastInfo.system
        const roleModifier = getSelectedModifier(beastInfo.roleModifier, modifier)

        this.normalizedBeastInfo = {
            id: beastInfo.id ?? 0,
            patreon: beastInfo.patreon,
            canplayerview: beastInfo.canplayerview,
            system,
            generalInfo: beastInfo.generalInfo,
            playerInfo: beastInfo.playerInfo,
            imageInfo: beastInfo.imageInfo,
            linkedInfo: beastInfo.linkedInfo,
            roleInfo: beastInfo.roleInfo,
            combatInfo: beastInfo.combatInfo,
            skillInfo: beastInfo.skillInfo,
            socialInfo: beastInfo.socialInfo,
            lootInfo: beastInfo.lootInfo,
            castingInfo: {
                casting: {
                    castingTypesArray: beastInfo.castingInfo?.casting?.castingTypesArray ?? [],
                    spellnumberdie: beastInfo.castingInfo?.casting?.spellnumberdie ?? '',
                    defaulttype: beastInfo.castingInfo?.casting?.defaulttype,
                    beastid: beastInfo.id ?? 0
                },
                spells: beastInfo.castingInfo?.spells ?? []
            },
            roleModifier
        }
    }

    get beastInfo(): BeastInfo {
        return this.normalizedBeastInfo
    }
}

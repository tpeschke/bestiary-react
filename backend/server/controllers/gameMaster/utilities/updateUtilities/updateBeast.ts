import { Beast } from "@bestiary/common/interfaces/beast/beast";
import { Request, Response } from "../../../../interfaces/apiInterfaces";
import { isOwner } from "../../../../utilities/ownerAccess";
import { checkForContentTypeBeforeSending } from "../../../../utilities/sendingFunctions";
import { reCacheMonsterIfItExists } from "../../../monsterCache";
import updateAttacks from "./utilities/updateAttacks";
import updateDefense from "./utilities/updateDefenses";
import query from "../../../../db/database";
import { checkIfUserCanEditMonster } from "../../../../db/beast/access";

interface BeastRequest extends Request {
    body: Beast
}

export async function updateBeast(request: BeastRequest, response: Response) {
    const { body: beast, user } = request
    const { id: beastID, combatInfo } = beast
    
    const [result] = await query(checkIfUserCanEditMonster, beastID)
    const beastOwnerID = result.userid

    if (isOwner(user?.id) || beastOwnerID === user?.id) {
        // If my fellow collaborator or I save a monster, we don't want it to save the user id since then it won't appear in the main catalog 
        // const userIDToSaveUnder = isOwner(user?.id) ? null : user?.id

        const { attacks, defenses } = combatInfo
        
        let promiseArray: any = [
            updateAttacks(attacks, beastID),
            updateDefense(beastID, defenses)
        ]

        await Promise.all(promiseArray)

        reCacheMonsterIfItExists(beastID)

        checkForContentTypeBeforeSending(response, { beastID })
    } else {
        checkForContentTypeBeforeSending(response, { color: 'red', message: "You don't own this entry so can't edit it", type: 'message' })
    }

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

}
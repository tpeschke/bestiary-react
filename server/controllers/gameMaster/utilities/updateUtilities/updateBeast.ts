// interface BeastRequest extends Request {
//     body: Beast
// }

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
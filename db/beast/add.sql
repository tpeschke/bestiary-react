insert into bbindividualbeast (userid, name, intro, habitat, ecology, senses, diet, meta, sp_atk, sp_def, tactics, 
size, patreon, largeweapons, panicstrength, stressstrength, hash, lootnotes, traitlimit, devotionlimit, flawlimit, 
passionlimit, plural, thumbnail, rarity, role, combatpoints, socialrole, socialpoints, secondaryrole, skillrole, 
skillpoints, fatiguestrength, defaultrole, socialsecondary, noTrauma, knockback, singledievitality, noknockback, rolenameorder,
descriptionshare, convictionshare, devotionshare, rollundertrauma, imagesource, isIncorporeal, weaponbreakagevitality, hasarchetypes, hasmonsterarchetypes, 
skillsecondary, atk_skill, def_skill, atk_conf, def_conf) 
values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, 
$28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54)
RETURNING *;
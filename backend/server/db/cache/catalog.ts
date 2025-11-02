export const getCatalogTilesByLetter = `select id, name, patreon, canplayerview, thumbnail, hash, role, secondaryrole, socialrole, skillrole, defaultrole, socialsecondary, rarity, skillsecondary, notupdating from bbindividualbeast 
where UPPER(name) like $1 ||'%' and UPPER(name) not like 'TEMPLATE,%' and userid is null
order by name asc`

export const getFreeCatalogTiles = `select id, name, patreon, canplayerview, thumbnail, hash, role, secondaryrole, socialrole, skillrole, defaultrole, socialsecondary, rarity, skillsecondary, notupdating from bbindividualbeast 
where canplayerview is true
order by name asc`

export const getRolesForCatalogTile = `select id, hash, name, role, secondaryrole, socialrole, skillrole, socialsecondary, skillsecondary from bbroles r
where r.beastid = $1
order by name`

export const getTemplateRolesForCatalogTile = `select id, hash, name, role, secondaryrole, socialrole, skillrole, socialsecondary, skillsecondary from bbroles r
where r.beastid = $1
order by name = 'Novice' desc, name = 'Apprentice' desc, name = 'Journeyman' desc, name = 'Expert' desc, name = 'Master' desc, name = 'Grandmaster' desc, name = 'Legendary' desc, name = 'Mythic' desc`

export const getTemplateForCatalog = `select id, name, patreon, canplayerview, thumbnail, hash, role, secondaryrole, socialrole, skillrole, defaultrole, socialsecondary, rarity, skillsecondary, notupdating from bbindividualbeast 
where UPPER(name) like 'TEMPLATE,%' and userid is null
order by name asc`
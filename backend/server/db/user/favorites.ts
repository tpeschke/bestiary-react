export const getWhetherMonsterIsFavorite = `select * from favorites
where userid = $1 and beastid = $2`

export const getUserFavorites = `select b.id, name, patreon, canplayerview, thumbnail, hash, role, secondaryrole, socialrole, skillrole, defaultrole, socialsecondary, rarity, skillsecondary, notupdating from bbindividualbeast b 
join favorites f on f.beastid = b.id
where f.userid = $1
order by name asc`

export const addMonsterToUserFavorites = `insert into favorites (userid, beastid) values 
($1, $2)`

export const getSingleUserFavorite = `select b.id, name, patreon, canplayerview, thumbnail, hash, role, secondaryrole, socialrole, skillrole, defaultrole, socialsecondary, rarity, skillsecondary, notupdating from bbindividualbeast b 
join favorites f on f.beastid = b.id
where f.userid = $1 and b.id = $2
order by name asc`

export const removeMonsterFromUserFavoriates = `delete from favorites
where userid = $1 and beastid = $2`
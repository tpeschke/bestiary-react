export const searchAccess = `select id from bbindividualbeast
where patreon = $1`

export const searchBody = `select DISTINCT(id) from bbindividualbeast
where UPPER(intro) like UPPER(( '%' || $1 || '%' ))
or
UPPER(habitat) like UPPER(( '%' || $1 || '%' ))
or
UPPER(ecology) like UPPER(( '%' || $1 || '%' ))`

export const searchClimate = `select DISTINCT(beastid) as id from bbbeastclimate
where climateid = $1`

export const searchMaxChallengeRating = `select id from bbindividualbeast b
where b.skillpoints <= $1 and NOT EXISTS (	SELECT 1 
                   							FROM   bbroles r 
                  							WHERE  b.id = r.beastid)
union
select beastid as id from bbroles r
where r.skillpoints <= $1`

export const searchMaxCombatRating = `select id from bbindividualbeast b
where b.combatpoints <= $1 and NOT EXISTS (	SELECT 1 
                   							FROM   bbroles r 
                  							WHERE  b.id = r.beastid)
union
select beastid as id from bbroles r
where r.combatpoints <= $1`

export const searchMaxConfrontationRating = `select id from bbindividualbeast b
where b.socialpoints <= $1 and NOT EXISTS (	SELECT 1 
                   							FROM   bbroles r 
                  							WHERE  b.id = r.beastid)
union
select beastid as id from bbroles r
where r.socialpoints <= $1`

export const searchMinChallengeRating = `select id from bbindividualbeast b
where b.skillpoints >= $1 and NOT EXISTS (	SELECT 1 
                   							FROM   bbroles r 
                  							WHERE  b.id = r.beastid)
union
select beastid as id from bbroles r
where r.skillpoints >= $1`

export const searchMinCombatRating = `select id from bbindividualbeast b
where b.combatpoints >= $1 and NOT EXISTS (	SELECT 1 
                   							FROM   bbroles r 
                  							WHERE  b.id = r.beastid)
union
select beastid as id from bbroles r
where r.combatpoints >= $1`

export const searchMinConfrontationRating = `select id from bbindividualbeast b
where b.socialpoints >= $1 and NOT EXISTS (	SELECT 1 
                   							FROM   bbroles r 
                  							WHERE  b.id = r.beastid)
union
select beastid as id from bbroles r
where r.socialpoints >= $1`

export const searchName = `select b.id from bbindividualbeast b
join (select id, concat_ws(' ', parts[2], parts[1]) as searchablename
		from (
  		select id, string_to_array(name, ', ') as parts
  		from bbindividualbeast
	) t) as t on t.id = b.id
where UPPER(name) like  UPPER(( '%' || $1 || '%' )) or UPPER(searchablename) like  UPPER(( '%' || $1 || '%' ));`

export const searchNotes = `select beastid as id from bbbeastusernotes
where userid = $1`

export const searchPlayerCanView = `select id from bbindividualbeast
where canplayerview is true`

export const searchRarity = `select id from bbindividualbeast
where rarity = $1`

export const searchChallengeRoles = `select distinct(b.id) from bbindividualbeast b
left join bbroles b2 on b2.beastid = b.id
where UPPER(b.skillrole) like UPPER(( '%' || $1 || '%' )) or UPPER(b.skillsecondary) like UPPER(( '%' || $1 || '%' ))
or UPPER(b2.skillrole) like UPPER(( '%' || $1 || '%' )) or UPPER(b2.skillsecondary) like UPPER(( '%' || $1 || '%' ))`

export const searchCombatRoles = `select distinct(b.id) from bbindividualbeast b
left join bbroles b2 on b2.beastid = b.id
where UPPER(b.role) like UPPER(( '%' || $1 || '%' )) or UPPER(b.secondaryrole) like UPPER(( '%' || $1 || '%' ))
or UPPER(b2.role) like UPPER(( '%' || $1 || '%' )) or UPPER(b2.secondaryrole) like UPPER(( '%' || $1 || '%' ));`

export const searchConfrontationRoles = `select distinct(b.id) from bbindividualbeast b
left join bbroles b2 on b2.beastid = b.id
where UPPER(b.socialrole) like UPPER(( '%' || $1 || '%' )) or UPPER(b.socialsecondary) like UPPER(( '%' || $1 || '%' ))
or UPPER(b2.socialrole) like UPPER(( '%' || $1 || '%' )) or UPPER(b2.socialsecondary) like UPPER(( '%' || $1 || '%' ));`

export const searchSize = `select id from bbindividualbeast
where UPPER(size) like UPPER(( '%' || $1 || '%' ))`

export const searchTypes = `select DISTINCT(beastid) as id from bbbeasttype
where typeid = $1`
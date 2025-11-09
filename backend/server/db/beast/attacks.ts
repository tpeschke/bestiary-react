export const getMonsterAttacks = `select 
	c.*,
	coalesce(c.roleid, a.roleid),
	r.combatpoints, r.role, 
	a.oldid, a.id as attackid, a.situation, a.tactic, a.reference, a.damagetype, a.roleid as attackrole,
	index
from bbcombatstats c
left join bbroles r on r.id = c.roleid
right join bbattacks a on a.oldid = c.id
where c.beastid = $1 or a.beastid = $1
order by index;`

export const removeMissingAttackIDsFromDB = `delete from bbattacks
where oldid in (
    select id from bbcombatstats
    where beastid = $1
)
and not (id = any($2));`

export const updateWeaponInfo = `update bbattacks
set oldid = $2, index = $3, situation = $4, tactic = $5, damageType = $6, beastid = $7
where id = $1`

export const addWeaponToDB = `insert into bbattacks (oldid, index, situation, tactic, roleid, damageType, beastid)
values ($1, $2, $3, $4, $5, $6, $7)`

export const updateReferenceInfo = `update bbattacks
set index = $2, reference = $3, tactic = $4, situation = $5, beastid = $6
where id = $1`

export const addReferenceToDB = `insert into bbattacks (index, reference, tactic, situation, roleid, beastid)
values ($1, $2, $3, $4, $5, $6)`
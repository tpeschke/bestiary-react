export const getMonsterDefenses = `select 
    c.*, 
    r.combatpoints, r.role, 
    d.oldid, d.id as defenseid, d.name as defensename,
    index 
from bbcombatstats c
left join bbroles r on r.id = c.roleid
join bbdefenses d on d.oldid = c.id
where c.beastid = $1
order by index;`

export const removeMissingDefenseIDsFromDB = `delete from bbdefenses
where oldid in (
    select id from bbcombatstats
    where beastid = $1
)
and not (id = any($2));`

export const updateDefenseInfo = `update bbdefenses
set oldid = $2, beastID = $3, index = $4, name = $5
where id = $1`

export const addDefenseToDB = `insert into bbdefenses (oldid, beastid, index, name)
values ($1, $2, $3, $4)`
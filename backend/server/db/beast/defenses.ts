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
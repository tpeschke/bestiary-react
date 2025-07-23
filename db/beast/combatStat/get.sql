select 
	c.*, 
	r.combatpoints, r.role, 
	a.oldid, a.id as attackid, a.situation, a.tactic,
	index
from bbcombatstats c
left join bbroles r on r.id = c.roleid
left join bbattacks a on a.oldid = c.id
where c.beastid = $1
order by index;
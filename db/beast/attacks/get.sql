select 
	c.*,
	coalesce(c.roleid, a.roleid),
	r.combatpoints, r.role, 
	a.oldid, a.id as attackid, a.situation, a.tactic, a.reference, a.roleid as attackrole,
	index
from bbcombatstats c
left join bbroles r on r.id = c.roleid
join bbattacks a on a.oldid = c.id
where c.beastid = $1 or a.beastid = $1
order by index;
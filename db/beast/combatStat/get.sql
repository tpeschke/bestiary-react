select c.*, r.combatpoints, r.role from bbcombatstats c
left join bbroles r on r.id = c.roleid
where c.beastid = $1
order by weaponname, weapon, armor, shield;
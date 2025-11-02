export const getMonsterMovement = `select m.*, r.combatpoints, r.role from bbmovement m
left join bbroles r on r.id = m.roleid
where m.beastid = $1`
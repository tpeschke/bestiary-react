select c.*, r.socialrole, r.socialpoints from bbconflict c
left join bbroles r on r.id = c.socialroleid
where c.beastid = $1
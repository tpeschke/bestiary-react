select b.id, name, patreon, canplayerview, thumbnail, hash, role, secondaryrole, socialrole, skillrole, defaultrole, socialsecondary, rarity, skillsecondary, notupdating from bbindividualbeast b 
join favorites f on f.beastid = b.id
where f.userid = $1 and b.id = $2
order by name asc
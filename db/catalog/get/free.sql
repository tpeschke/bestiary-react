select id, name, patreon, canplayerview, thumbnail, hash, role, secondaryrole, socialrole, skillrole, defaultrole, socialsecondary, rarity, skillsecondary, notupdating from bbindividualbeast 
where canplayerview is true
order by name asc
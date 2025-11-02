export const getFavoriteMonsters = `select beastid, count(beastid) from favorites f
group by beastid
order by count desc
limit $1;`

export const getFreeAndUpdating = `select id as beastid from bbindividualbeast b 
where canplayerview = true or notupdating = false`
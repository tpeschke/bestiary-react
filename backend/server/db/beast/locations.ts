export const getMonsterLocations = `select bl.id, locationid, beastid, location, link from bbbeastlocation bl
join bblocations l on l.id = bl.locationid
where bl.beastid = $1
order by location`

export const getAllLocations = `select * from bblocations
where id not in (select locationid from bbbeastlocation where beastid = $1)
order by location`
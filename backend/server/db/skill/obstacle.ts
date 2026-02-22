export const getObstacleByName = `select * from obbase o
where name = $1`

export const getObstacleComplications = `select * from obcomplications
where stringid = $1
order by index asc`

export const getSkullVariants = `select * from obSkullVariant
where stringid = $1
order by skullValue asc`

export const getObstaclePairs = `select * from obpairs
where stringid = $1 and type = $2
order by index asc`

export const getMonsterObstacles = `select * from bbbeastsingleobstacle b 
join obbase o on o.id = b.obstacleid
where beastid = $1`
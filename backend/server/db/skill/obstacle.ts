export const getSkullVariants = `select * from obSkullVariant
where stringid = $1
order by skullValue asc`

export const getMonsterObstacles = `select * from bbbeastsingleobstacle b 
join obbase o on o.id = b.obstacleid
where beastid = $1`
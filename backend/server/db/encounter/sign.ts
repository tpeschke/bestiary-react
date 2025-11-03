export const getWeightedSign = `select RANDOM() * Weight AS Weight, sign from bbbeastsigns bs
join bbsigns t on t.id = bs.signid
where bs.beastid = $1
order by weight desc
limit 1`

export const getAllSignsOrderedByWeight = `select bs.id, beastid, signid, weight, sign from bbbeastsigns bs
join bbsigns t on t.id = bs.signid
where bs.beastid = $1
order by weight desc;`
export const getWeightedGroupLabel = `select RANDOM() * Weight AS RandWeight, l.*, b.name from bbindividualbeast b 
left join bbencounterlabels l on b.id = l.beastid
where b.id = $1
order by RandWeight desc
limit 1;`

export const getGroupByID = `select * from bbroleweights
where beastid = $1 and labelid = $2
order by weight desc`
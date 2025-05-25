select RANDOM() * Weight AS RandWeight, l.*, b.name from bbindividualbeast b 
left join bbencounterlabels l on b.id = l.beastid
where b.id = $1
order by RandWeight desc
limit 1;
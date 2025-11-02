select RANDOM() * Weight AS Weight, rank, name, plural, beast.id, number from bbrankinfo ri
join bbrank r on r.id = ri.rankid
join bbindividualbeast beast on beast.id = ri.beastid
where ri.beastid = $1
order by weight desc
limit 1;
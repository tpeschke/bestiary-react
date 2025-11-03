export const getRivalForEncounter = `select b.id, name, plural, number From bbindividualbeast b
left join bbrankinfo ri on ri.beastid = b.id
where b.id in (select Distinct(beastid) from bbbeastclimate
                where climateid in (select climateid from bbbeastclimate
                                    where beastid = $1) and beastid != $1 and beastid != 205)
order by random()
limit 1`

export const getEncounterBackUp = `select RANDOM() * Weight AS Weight, rank, name, plural, beast.id, number from bbrankinfo ri
join bbrank r on r.id = ri.rankid
join bbindividualbeast beast on beast.id = ri.beastid
where ri.beastid = $1
order by weight desc
limit 1;`
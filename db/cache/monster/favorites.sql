select beastid, count(beastid) from favorites f
group by beastid
order by count desc
limit $1;
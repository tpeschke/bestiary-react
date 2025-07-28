delete from bbattacks
where oldid in (
    select id from bbcombatstats
    where beastid = $1
)
and not (id = any($2));
delete from bbdefenses
where oldid in (
    select id from bbcombatstats
    where beastid = $1
);
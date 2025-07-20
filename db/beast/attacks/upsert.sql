insert into bbattacks (oldid, index)
values ($2, $3)
on conflict (id)
do 
    update set id = $1, oldid = $2, index = $3
delete from bbroles where beastid = $1 and id != ANY($2)
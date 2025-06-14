select s.*, r.skillpoints, r.skillrole from bbskills s
left join bbroles r on r.id = s.skillroleid
where s.beastid = $1
order by s.skill
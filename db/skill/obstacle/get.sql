select * from bbbeastsingleobstacle b 
join obbase o on o.id = b.obstacleid
where beastid = $1
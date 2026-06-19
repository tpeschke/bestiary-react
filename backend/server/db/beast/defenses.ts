export const getMonsterDefenses = `select 
	d.id, d.oldid, d.index, d.beastid,
	d.name as defensename,
	COALESCE(d.roleid, c.roleid) as roleid,
	c.weapontype, c.isspecial, c.eua, c.addsizemod,
	c.shield, c.armor, c.showonlydefenses, c.swarmbonus,
	c.tdr, c.info, c.info_hm
from bbdefenses d
left join bbcombatstats c on d.oldid = c.id
where d.beastid = $1
order by index`

export const removeMissingDefenseIDsFromDB = `delete from bbdefenses
where beastID = $1 and Not (id = any($2))`

export const updateDefenseInfo = `update bbdefenses
set oldid = $2, beastID = $3, index = $4, name = $5
where id = $1`

export const addDefenseToDB = `insert into bbdefenses (oldid, beastid, index, name, roleid)
values ($1, $2, $3, $4, $5)`
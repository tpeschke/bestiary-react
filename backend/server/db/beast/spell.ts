export const getMonsterSpells = `select * from bbspells where beastid = $1
order by name`
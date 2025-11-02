export const getMonsterTypes = `select bbbeasttype.id as id, type, typeid, description from bbbeasttype
join bbtypelist on bbtypelist.id = bbbeasttype.typeid
 where beastid = $1;`
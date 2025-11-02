export const getMonsterLairBasicLoot = `select beastid, copper, enchanted, id, potion, talisman from bblairlootbasic
where beastid = $1`

export const getMonsterLairAlmScripts = `select * from bblairlootalms
where beastid = $1`

export const getMonsterLairItems = `select id, beastid, itemcategory as category, materialrarity as rarity, detailing as detail, number, chance from bblairitems
where beastid = $1`

export const getMonsterLairScrolls = `select * from bblairlootscrolls
where beastid = $1`
export const getMonsterCarriedBasic = `select beastid, enchanted, id, potion, talisman from bbcarriedlootbasic
where beastid = $1`

export const getMonsterCarriedAlmScript = `select * from bbcarriedlootalms
where beastid = $1`

export const getMonsterCarriedItems = `select id, beastid, itemcategory as category, materialrarity as rarity, detailing as detail, number, chance from bbcarrieditems
where beastid = $1`

export const getMonsterCarriedScrolls = `select * from bbcarriedlootscrolls
where beastid = $1`
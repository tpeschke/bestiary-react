select id, beastid, itemcategory as category, materialrarity as rarity, detailing as detail, number, chance from bbcarrieditems
where beastid = $1
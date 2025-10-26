select id, beastid, itemcategory as category, materialrarity as rarity, detailing as detail, number, chance from bblairitems
where beastid = $1
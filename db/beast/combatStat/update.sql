update bbcombatstats
set beastid = $2, roleid = $3, piercingweapons = $4, slashingweapons = $5, crushingweapons = $6, weaponsmallslashing = $7,
              weaponsmallcrushing = $8, weaponsmallpiercing = $9, andslashing = $10, andcrushing = $11, flanks = $12, 
              alldefense = $13, allaround = $14, armorandshields = $15, unarmored = $15, attack = $17, isspecial = $18, 
              eua = $19, addsizemod = $20, weapon = $21, shield = $22, armor = $23, weaponname = $24, rangeddefense = $25, 
              initiative = $26, measure = $27, recovery = $28, showonlydefenses = $29, weapontype = $30, rangedistance = $31, 
              swarmbonus = $32, adjustment = $33, tdr = $34, info = $35
where id = $1
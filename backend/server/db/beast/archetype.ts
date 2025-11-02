export const getRandomArchetype = `select * from bbarchetypes 
order by random()
limit 1`

export const getRandomMonsterArchetypes = `select * from bbmonsterarchetypes 
order by random()
limit 2`
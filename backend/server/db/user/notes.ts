export const getUserNotesForMonster = `select id, notes from bbbeastusernotes
where beastid = $1 and userid = $2`

export const updateUserNotes = `update bbbeastusernotes
set notes = $2
where id = $1`

export const getCountOfUserNotes = `select count(id) from bbbeastusernotes
where userid = $1`

export const addUserNotes = `insert into bbbeastusernotes (beastid, userid, notes) values 
($1, $2, $3)
returning id`
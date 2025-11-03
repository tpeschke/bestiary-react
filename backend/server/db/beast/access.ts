export const checkAccess = `select canplayerview, patreon from bbindividualbeast
where id = $1`

export const checkIfUserCanEditMonster = `select userid from bbindividualbeast
where id = $1`
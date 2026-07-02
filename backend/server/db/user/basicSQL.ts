export const createUser = `insert into usersAuth (username, auth0, system, tooltip, email)
values ($1, $2, 2, '1', $3)
RETURNING *;`

export const findUser = `select * 
from usersAuth
where auth0 = $1`

export const findSession = `select * 
from usersAuth
where id = $1`

export const updateEmail = `update usersAuth 
set email = $2 
where id = $1`
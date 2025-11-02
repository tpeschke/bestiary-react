export const createUser = `insert into usersAuth (username, auth0, tooltip)
values ($1, $2, '1')
RETURNING *;`

export const findUser = `select * 
from usersAuth
where auth0 = $1`

export const findSession = `select * 
from usersAuth
where id = $1`
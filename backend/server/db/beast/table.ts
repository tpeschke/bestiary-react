export const getTableInfo = `select * from bbtableinfo
where id in (select tableid as id from bbtablebeast
              where beastid = $1)
order by label`

export const getRowInfo = `select * from bbtablerows
where tableid = $1
order by weight desc, value`
import { Table, TablesObject, Row } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import query from "../../../../../db/database"
import { getRowInfo, getTableInfo } from "../../../../../db/beast/table"

export default async function getTables(beastId: number) {
    const basicTableInfo: Table[] = await query(getTableInfo, beastId)

    let tables: TablesObject = {
        habitat: [],
        attack: [],
        defense: [],
        appearance: []
    }
    let promiseArray: Promise<boolean>[] = []

    basicTableInfo.forEach(async (table: Table) => {
        promiseArray.push(getAndFormatRows(table, tables))
    })

    return Promise.all(promiseArray).then(_ => tables)
}

async function getAndFormatRows(table: Table, tables: TablesObject): Promise<boolean> {
    const rows: Row[] = await query(getRowInfo, table.id)

    if (table.section === 'ap') {
        tables.appearance.push({
            ...table,
            rows
        })
    } else if (table.section === 'ha') {
        tables.habitat.push({
            ...table,
            rows
        })
    } else if (table.section === 'at') {
        tables.attack.push({
            ...table,
            rows
        })
    } else if (table.section === 'de') {
        tables.defense.push({
            ...table,
            rows
        })
    }

    return true
}
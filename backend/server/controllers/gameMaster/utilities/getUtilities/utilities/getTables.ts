import { Table, TablesObject, Row } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"

export default async function getTables(databaseConnection: any, beastId: number) {
    const basicTableInfo: Table[] = await databaseConnection.beast.table.getTable(beastId)

    let tables: TablesObject = {
        habitat: [],
        attack: [],
        defense: [],
        appearance: []
    }
    let promiseArray: Promise<Row>[] = []

    basicTableInfo.forEach(async (table: Table) => {
        promiseArray.push(databaseConnection.beast.table.getRow(table.id).then((rows: Row[]) => {
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
        }))
    })

    return Promise.all(promiseArray).then(_ => tables)
}
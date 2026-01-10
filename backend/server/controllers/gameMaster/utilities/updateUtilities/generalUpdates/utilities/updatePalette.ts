import { Palette } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces";
import query from "../../../../../../db/database";

const updatePaletteSQL = `update bbPalette
set drives = $3, needs = $4, defenses = $5, logistics = $6, methods = $7, groupDescriptions = $8
where beastID = $1 and id = $2`

const addPaletteSQL = `insert into bbPalette (beastID, drives, needs, defenses, logistics, methods, groupDescriptions)
values ($1, $2, $3, $4, $5, $6, Z$7)`

export default async function updatePalette(beastID: number, palette: Palette) {
    const { id, drives, needs, defenses, logistics, methods, groupDescriptions } = palette

    if (id) {
        return query(updatePaletteSQL, [beastID, id, drives, needs, defenses, logistics, methods, groupDescriptions])
    }

    return query(addPaletteSQL, [beastID, drives, needs, defenses, logistics, methods, groupDescriptions])
}
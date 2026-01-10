import { Palette } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import query from "../../../../../../db/database"

const getPaletteSQL = `select * from bbPalette where beastID = $1`

export default async function getPalette(beastID: number): Promise<Palette> {
    const [palette] = await query(getPaletteSQL, beastID)

    return {
        ...palette,
        groupDescriptions: palette.groupdescriptions
    }
}
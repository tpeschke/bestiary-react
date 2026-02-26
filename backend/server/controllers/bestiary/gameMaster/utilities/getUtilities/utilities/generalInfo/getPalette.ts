import { Palette } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import query from "../../../../../../../db/database"

const getPaletteSQL = `select * from bbPalette where beastID = $1`

const getCommonAlliesSQL = `(
	select ca.*, name, plural from bbCommonAllies ca
	join bbIndividualBeast m on m.id = ca.allyID
	where beastID = $1
	order by name
) union (
	select ca.id, allyID as beastID, beastID as allyID, name, plural from bbCommonAllies ca
	join bbIndividualBeast m on m.id = ca.beastID
	where allyID = $1
	order by name
)`

export default async function getPalette(beastID: number): Promise<Palette> {
    const [palette] = await query(getPaletteSQL, beastID)
    const commonAllies = await query(getCommonAlliesSQL, beastID)

    if (palette) {
        return {
            ...palette,
            commonAllies,
            groupDescriptions: palette.groupdescriptions
        }
    }

    return {
        drives: null,
        needs: null,
        defenses: null,
        logistics: null,
        methods: null,
        groupDescriptions: null,
        commonAllies
    }
}
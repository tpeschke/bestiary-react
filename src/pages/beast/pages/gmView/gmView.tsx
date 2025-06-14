import GMBeastClass from "../../models/GMBeastClass"
import { MiscInfo } from "./components/rightColumn/components/miscInfoDisplay/MiscInfoDisplay"

import NameHeader from "../../components/UI/nameHeader/nameHeader"
import DoubleColumn from "../../components/UI/doubleColumn/doubleColumn"
import RightColumn from "./components/rightColumn/RightColumn"
import LeftColumn from "./components/leftColumn/LeftColumn"
import Weirdshaping from "./components/weirdshaping/Weirdshaping"

interface Props {
    beast: GMBeastClass
}

export default function GMView({ beast }: Props) {
    const { generalInfo, imageInfo, socialInfo, skillInfo, combatInfo, linkedInfo, lootInfo, castingInfo, spells, maxPoints, roleInfo, updateSelectedRole, selectedRoleId } = beast
    const { name, appearance, intro, habitat, folklores, size, scenarios, senses, diet, rarity, meta } = generalInfo
    const { types, climates, variants, locations } = linkedInfo

    const { beast: locationsInfo } = locations

    const miscInfo: MiscInfo = {
        senses,
        diet,
        rarity,
        climates: climates.beast
    }

    return (
        <>
            <NameHeader name={name} />
            <DoubleColumn 
                LeftColumn={LeftColumn({ beastId: beast.id, beastName: name, imageInfo, socialInfo, skillInfo, combatInfo, size, roleInfo, updateSelectedRole, selectedRoleId })}
                RightColumn={RightColumn({ appearance, intro, habitat, folklores, scenarios, types, miscInfo, variants, meta, locationsInfo, lootInfo, maxPoints })}
            />
            {/* This will often return undefined after the beast info gets changed */}
            <Weirdshaping castingTypes={castingInfo} spells={spells} />
        </>
    )
}
import GMBeastClass from "../../models/GMBeastClass"

import NameHeader from "../../components/UI/nameHeader/nameHeader"
import DoubleColumn from "../../components/UI/doubleColumn/doubleColumn"
import RightColumn from "./components/rightColumn/RightColumn"
import LeftColumn from "./components/leftColumn/LeftColumn"

interface Props {
    beast: GMBeastClass
}

export default function GMView({ beast }: Props) {
    const { generalInfo, imageInfo, socialInfo, skillInfo, combatInfo } = beast
    const { name, appearance, intro, habitat, folklores, size, scenarios } = generalInfo
    return (
        <>
            <NameHeader name={name} />
            <DoubleColumn 
                LeftColumn={LeftColumn({ beastId: beast.id, beastName: name, imageInfo, socialInfo, skillInfo, combatInfo, size })}
                RightColumn={RightColumn({ appearance, intro, habitat, folklores, scenarios })}
            />
        </>
    )
}
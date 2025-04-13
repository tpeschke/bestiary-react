import GMBeastClass from "../../models/GMBeastClass"

import NameHeader from "../../components/nameHeader/nameHeader"
import DoubleColumn from "../../components/doubleColumn/doubleColumn"
import RightColumn from "./components/rightColumn/RightColumn"
import LeftColumn from "./components/leftColumn/LeftColumn"

interface Props {
    beast: GMBeastClass
}

export default function GMView({ beast }: Props) {
    const { generalInfo, imageInfo, socialInfo } = beast
    return (
        <>
            <NameHeader name={generalInfo.name} />
            <DoubleColumn 
                LeftColumn={LeftColumn({ beastId: beast.id, beastName: generalInfo.name, imageInfo, socialInfo })}
                RightColumn={RightColumn()}
            />
        </>
    )
}
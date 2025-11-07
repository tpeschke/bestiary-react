import { AttackInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import SpecialInfo from "../../../specialInfo/specialInfo"
import AttackStats from "./components/AttackStats"
import ReferenceView from "./components/ReferenceView"

interface Props {
    attackInfo: string,
    attacks: AttackInfo[]
}

export default function AttackDisplay({ attackInfo, attacks }: Props) {
    const showSection = attackInfo || attacks.length > 0
    return (
        <>
            {showSection &&
                <>
                    <h3>Attack Info</h3>
                    <SpecialInfo info={attackInfo} />
                    {attacks.map((attack, index) => {
                        if (attack.infoType === 'weapon') {
                            return <AttackStats key={index} attackStat={attack} />
                        } else if (attack.infoType === 'reference') {
                            return <ReferenceView key={index} referenceInfo={attack} />
                        }
                    })}
                </>
            }
        </>
    )
}
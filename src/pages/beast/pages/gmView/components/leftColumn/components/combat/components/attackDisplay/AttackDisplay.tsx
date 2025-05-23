import { AttackInfo } from "../../../../../../../../interfaces/infoInterfaces/combatInfoInterfaces"

import SpecialInfo from "../../../specialInfo/specialInfo"
import AttackStats from "./components/AttackStats"

interface Props {
    sp_atk: string,
    attacks: AttackInfo[]
}

export default function AttackDisplay({ sp_atk, attacks }: Props) {
    return (
        <>
            <h3>Attack Info</h3>
            <SpecialInfo info={sp_atk} />
            {attacks.map((attack, index) => <AttackStats key={index} attacksStats={attack} />)}
        </>
    )
}
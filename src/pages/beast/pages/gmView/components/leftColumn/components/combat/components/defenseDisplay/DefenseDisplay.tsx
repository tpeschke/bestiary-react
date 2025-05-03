import { DefenseInfo } from "../../../../../../../../interfaces/infoInterfaces.ts/combatInfoInterfaces"

import SpecialInfo from "../../../specialInfo/specialInfo"
import DefenseStats from "./components/DefenseStats"

interface Props {
    sp_def: string,
    defenses: DefenseInfo[]
}

export default function DefenseDisplay({ sp_def, defenses }: Props) {
    return (
        <>
            <h3>Defense Info</h3>
            <SpecialInfo info={sp_def} />
            {defenses.map((defense, index) => <DefenseStats key={index} defenseStats={defense} />)}
        </>
    )
}
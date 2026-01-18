import { DefenseInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import SpecialInfo from "../../../specialInfo/specialInfo"
import DefenseStats from "./components/DefenseStats"

interface Props {
    defenseInfo: string,
    defenses: DefenseInfo[]
}

export default function DefenseDisplay({ defenseInfo, defenses }: Props) {
    const hasDefenses = defenses.length > 0
    const hasSpecialDefenses = !!defenseInfo

    const showSection = hasSpecialDefenses || hasDefenses

    const hasSpecificName = defenses[0]?.name || defenses[0]?.defensename
    const hasMultipleDefenses = defenses.length > 1

    const showDefenseNameBanner: boolean = !!(hasMultipleDefenses || (!hasMultipleDefenses && hasSpecialDefenses) || (!hasMultipleDefenses && hasSpecificName))

    return (
        <>
            {showSection &&
                <>
                    <h3>Defense Info</h3>
                    <SpecialInfo info={defenseInfo} />
                    {defenses.map((defense, index) => <DefenseStats key={index} defenseStats={defense} showDefenseNameBanner={showDefenseNameBanner} />)}
                </>
            }
        </>
    )
}
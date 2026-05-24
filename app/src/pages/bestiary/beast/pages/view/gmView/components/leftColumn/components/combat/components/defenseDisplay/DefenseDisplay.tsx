import { SystemOption } from "@bestiary/common/interfaces/beast/beast"
import { DefenseInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { SystemInfoValue } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { hasSystemInfoContent } from "@bestiary/common/utilities/get/getSystemInfo"
import SpecialInfo from "../../../specialInfo/specialInfo"
import DefenseStats from "./components/DefenseStats"

interface Props {
    defenseInfo: SystemInfoValue,
    defenses: DefenseInfo[],
    system: SystemOption
}

export default function DefenseDisplay({ defenseInfo, defenses, system }: Props) {
    const hasDefenses = defenses.length > 0
    const hasSpecialDefenses = hasSystemInfoContent(defenseInfo, system)

    const showSection = hasSpecialDefenses || hasDefenses

    const hasSpecificName = defenses[0]?.name || defenses[0]?.defensename
    const hasMultipleDefenses = defenses.length > 1

    const showDefenseNameBanner: boolean = !!(hasMultipleDefenses || (!hasMultipleDefenses && hasSpecialDefenses) || (!hasMultipleDefenses && hasSpecificName))

    return (
        <>
            {showSection &&
                <>
                    <h3>Defense Info</h3>
                    <SpecialInfo info={defenseInfo} system={system} />
                    {defenses.map((defense, index) => <DefenseStats key={index} defenseStats={defense} showDefenseNameBanner={showDefenseNameBanner} />)}
                </>
            }
        </>
    )
}
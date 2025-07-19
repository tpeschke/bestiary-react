import CombatInfo from "../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import AttackEditDisplay from "./components/AttackEditDisplay"

interface Props {
    combatInfo: CombatInfo
}

export default function CombatEdit({ combatInfo } : Props) {
    const { attacks } = combatInfo

    return (
        <>
            <AttackEditDisplay attacks={attacks} />
        </>
    )
}
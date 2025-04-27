import CombatInfo from "../../../../../../interfaces/infoInterfaces.ts/combatInfoInterfaces"

import Pair from "../../../../../../components/UI/pair/Pair"
import RoleTitle from "../../../roleTitle/RoleTitle"
import SpecialInfo from "../specialInfo/specialInfo"
import TraumaDisplay from './components/traumaDisplay/TraumaDisplay'
import Movement from "./components/movement/MovementInfo"
import CombatTables from "./components/combatTables/CombatTables"
import Body from "../../../../../../components/UI/body/Body"
import TacticsAndStrategy from "./components/tacticsAndStrategy/TacticsAndStrategy"

interface Props {
    combatInfo: CombatInfo
}

export default function CombatSection({ combatInfo }: Props) {
    const { combatrole, combatpoints, sp_atk, sp_def, combatsecondary, vitalityInfo, movements, attacks, defenses, tactics } = combatInfo
    const { vitality, fatigue, rollundertrauma, notrauma, trauma } = vitalityInfo

    let vitalityString = `${vitality}`
    if (fatigue && fatigue < vitality) { vitalityString = `(${fatigue}) ` + vitalityString }
    if (fatigue && fatigue >= vitality) { vitalityString = `(N) ` + vitalityString }

    return (
        <>
            <RoleTitle title='Combat' points={combatpoints} role={combatrole} secondaryRole={combatsecondary} />
            <Pair title={"Vitality (Fatigue)"} info={vitalityString} format={{ heading: true }} />
            <TraumaDisplay trauma={trauma} notrauma={notrauma} rollundertrauma={rollundertrauma} />
            <SpecialInfo type="Defense" info={sp_def} />
            <SpecialInfo type="Attack" info={sp_atk} />
            {/* <Body>
                <CombatTables combatStats={combatStats} />
            </Body> */}
            <Movement movements={movements} />
            <TacticsAndStrategy tactics={tactics} />
        </>
    )
}
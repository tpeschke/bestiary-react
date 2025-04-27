import CombatInfo from "../../../../../../interfaces/infoInterfaces.ts/combatInfoInterfaces"

import Pair from "../../../../../../components/UI/pair/Pair"
import RoleTitle from "../../../roleTitle/RoleTitle"
import TraumaDisplay from './components/traumaDisplay/TraumaDisplay'
import Movement from "./components/movement/MovementInfo"
import TacticsAndStrategy from "./components/tacticsAndStrategy/TacticsAndStrategy"
import DefenseDisplay from "./components/defenseDisplay/DefenseDisplay"
import AttackDisplay from "./components/attackDisplay/AttackDisplay"

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
            <DefenseDisplay defenses={defenses} sp_def={sp_def} />
            <AttackDisplay attacks={attacks} sp_atk={sp_atk} />
            <Movement movements={movements} />
            <TacticsAndStrategy tactics={tactics} />
        </>
    )
}
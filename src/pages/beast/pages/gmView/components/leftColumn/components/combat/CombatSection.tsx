import CombatInfo from "../../../../../../interfaces/infoInterfaces/combatInfoInterfaces"

import Pair from "../../../../../../components/UI/pair/Pair"
import RoleTitle from "../../../roleTitle/RoleTitle"
import Movement from "./components/movement/MovementInfo"
import TacticsAndStrategy from "./components/tacticsAndStrategy/TacticsAndStrategy"
import DefenseDisplay from "./components/defenseDisplay/DefenseDisplay"
import AttackDisplay from "./components/attackDisplay/AttackDisplay"
import CombatSubtitle from "./components/combatSubtitle/CombatSubtitle"

import { Size } from "../../../../../../../../../common/interfaces/beast/infoInterfaces/generalInfoInterfaces"

interface Props {
    combatInfo: CombatInfo,
    size: Size
}

export default function CombatSection({ combatInfo, size }: Props) {
    const { combatrole, combatpoints, sp_atk, sp_def, combatsecondary, vitalityInfo, movements, attacks, defenses, tactics, initiative } = combatInfo
    const { vitality, fatigue, rollundertrauma, notrauma, trauma, knockback, noknockback } = vitalityInfo

    let vitalityString = `${vitality}`
    if (fatigue && fatigue < vitality) { vitalityString = `(${fatigue}) ` + vitalityString }
    if (fatigue && fatigue >= vitality) { vitalityString = `(N) ` + vitalityString }

    const traumaInfo = {
        trauma,
        notrauma,
        rollundertrauma
    }

    const knockbackInfo = {
        knockback, 
        noknockback, 
        size
    }

    return (
        <>
            <RoleTitle title='Combat' points={combatpoints} role={combatrole} secondaryRole={combatsecondary} />
            <Pair title={"Vitality (Fatigue)"} info={vitalityString} format={{ heading: true }} />
            <CombatSubtitle traumaInfo={traumaInfo} initiative={initiative} knockbackInfo={knockbackInfo} />
            <DefenseDisplay defenses={defenses} sp_def={sp_def} />
            <AttackDisplay attacks={attacks} sp_atk={sp_atk} />
            <Movement movements={movements} />
            <TacticsAndStrategy tactics={tactics} />
        </>
    )
}
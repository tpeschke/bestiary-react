import RoleTitle from "../../../roleTitle/RoleTitle"
import Movement from "./components/movement/MovementInfo"
import TacticsAndStrategy from "./components/tacticsAndStrategy/TacticsAndStrategy"
import DefenseDisplay from "./components/defenseDisplay/DefenseDisplay"
import AttackDisplay from "./components/attackDisplay/AttackDisplay"
import CombatSubtitle from "./components/combatSubtitle/CombatSubtitle"

import LocationVitalities from "./components/locationalVitalities/LocationalVitalities"
import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import Pair, { PairIconSettings } from "../../../../../../../components/UI/pair/Pair"
import CombatInfo from "../../../../../../../interfaces/infoInterfaces/combatInfoInterfaces"

interface Props {
    combatInfo: CombatInfo,
    size: Size
}

export default function CombatSection({ combatInfo, size }: Props) {
    const { combatrole, combatpoints, sp_atk, sp_def, combatsecondary, vitalityInfo, movements, attacks, defenses, tactics, initiative } = combatInfo
    const { vitality, fatigue, rollundertrauma, notrauma, trauma, knockback, noknockback, locationalVitalities, weaponbreakagevitality, isincorporeal } = vitalityInfo

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

    const vitalityIconSetting: (PairIconSettings | null) = getVitalityIconSetting(weaponbreakagevitality, isincorporeal)

    return (
        <>
            <RoleTitle title='Combat' points={combatpoints} role={combatrole} secondaryRole={combatsecondary} />
            <Pair title={"Vitality (Fatigue)"} info={vitalityString} format={{ heading: true }} icon={vitalityIconSetting} />
            <CombatSubtitle traumaInfo={traumaInfo} initiative={initiative} knockbackInfo={knockbackInfo} />
            <LocationVitalities locationalVitalities={locationalVitalities} />
            <DefenseDisplay defenses={defenses} sp_def={sp_def} />
            <AttackDisplay attacks={attacks} sp_atk={sp_atk} />
            <Movement movements={movements} />
            <TacticsAndStrategy tactics={tactics} />
        </>
    )
}

function getVitalityIconSetting(weaponbreakagevitality: boolean, isincorporeal: boolean): PairIconSettings | null {
    if (weaponbreakagevitality) {
        return {
            iconName: 'crack',
            tooltip: 'This creature only takes damage when it would take Wear on a 1-to-1 basis'
        }

    } else if (isincorporeal) {
        return {
            iconName: 'ghost',
            tooltip: 'This creature takes no damage from any source except those specifically called out'
        }
    }
    return null
}
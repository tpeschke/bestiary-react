import RoleTitle from "../../../roleTitle/RoleTitle"
import Movement from "./components/movement/MovementInfo"
import TacticsAndStrategy from "./components/tacticsAndStrategy/TacticsAndStrategy"
import DefenseDisplay from "./components/defenseDisplay/DefenseDisplay"
import AttackDisplay from "./components/attackDisplay/AttackDisplay"
import CombatSubtitle from "./components/combatSubtitle/CombatSubtitle"

import LocationVitalities from "./components/locationalVitalities/LocationalVitalities"
import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import Pair, { PairIconSettings } from "../../../../../../../components/UI/pair/Pair"
import CombatInfo from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"

interface Props {
    combatInfo: CombatInfo,
    size: Size
}

export default function CombatSection({ combatInfo, size }: Props) {
    const { combatRole, combatSkulls, attackInfo, defenseInfo, combatSecondary, vitalityInfo, movements, attacks, defenses, initiative } = combatInfo
    const { vitality, rollUnderTrauma, noTrauma, trauma, knockback, noKnockback, locationalVitalities, weaponBreakageVitality, isIncorporeal } = vitalityInfo

    const traumaInfo = {
        trauma,
        noTrauma,
        rollUnderTrauma
    }

    const knockbackInfo = {
        knockback,
        noKnockback,
        size
    }

    const vitalityIconSetting: (PairIconSettings | null) = getVitalityIconSetting(weaponBreakageVitality, isIncorporeal)

    return (
        <>
            <RoleTitle title='Combat' skulls={combatSkulls} role={combatRole} secondaryRole={combatSecondary} />
            <Pair title={"Damage Threshold"} info={vitality} format={{ heading: true }} icon={vitalityIconSetting} />
            <CombatSubtitle traumaInfo={traumaInfo} initiative={initiative} knockbackInfo={knockbackInfo} />
            <LocationVitalities locationalVitalities={locationalVitalities} />
            <DefenseDisplay defenses={defenses} defenseInfo={defenseInfo} />
            <AttackDisplay attacks={attacks} attackInfo={attackInfo} />
            <Movement movements={movements} />
        </>
    )
}

function getVitalityIconSetting(weaponBreakageVitality: boolean, isIncorporeal: boolean): PairIconSettings | null {
    if (weaponBreakageVitality) {
        return {
            iconName: 'crack',
            tooltip: 'This creature only takes damage when it would take Wear on a 1-to-1 basis'
        }

    } else if (isIncorporeal) {
        return {
            iconName: 'ghost',
            tooltip: 'This creature takes no damage from any source except those specifically called out'
        }
    }
    return null
}
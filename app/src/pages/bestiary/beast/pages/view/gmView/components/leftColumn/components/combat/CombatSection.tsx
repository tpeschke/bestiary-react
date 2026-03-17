import RoleTitle from "../../../roleTitle/RoleTitle"
import Movement from "./components/movement/MovementInfo"
import DefenseDisplay from "./components/defenseDisplay/DefenseDisplay"
import AttackDisplay from "./components/attackDisplay/AttackDisplay"
import CombatSubtitle from "./components/combatSubtitle/CombatSubtitle"

import LocationVitalities from "./components/locationalVitalities/LocationalVitalities"
import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { PairIconSettings } from "../../../../../../../components/UI/pair/Pair"
import CombatInfo from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import Icon from "../../../../../../../../../../components/icon/Icon"

interface Props {
    combatInfo: CombatInfo,
    size: Size
}

export default function CombatSection({ combatInfo, size }: Props) {
    console.log(combatInfo)
    const {
        combatRole, combatSkulls, attackInfo, defenseInfo, combatSecondary, vitalityInfo, movements, attacks,
        defenses, initiative, type
    } = combatInfo

    const {
        vitality, rollUnderTrauma, noTrauma, trauma, knockback, noKnockback, locationalVitalities, weaponBreakageVitality,
        isIncorporeal, defenseNFleeDice
    } = vitalityInfo

    const { defense, flee } = defenseNFleeDice

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
console.log(type, combatSkulls)
    return (
        <>
            <RoleTitle title='Combat' skulls={combatSkulls} role={combatRole} secondaryRole={combatSecondary} />
            <div className="pair-shell heading three">
                <h3>Damage Threshold</h3>
                <p>
                    <span data-tooltip-id="my-tooltip" data-tooltip-content="At this dice size, the enemy becomes defensive and fleeing is free."><Icon iconName="shield" color='blue' /> {defense}</span>
                    <span> / </span>
                    <span data-tooltip-id="my-tooltip" data-tooltip-content="At this dice size, the enemy flees the battlefield."><Icon iconName="run" color='blue' /> {flee}</span>
                </p>
                <p>{vitality} {vitalityIconSetting && <Icon iconName={vitalityIconSetting.iconName} tooltip={vitalityIconSetting.tooltip} color='black' />}</p>
            </div>
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
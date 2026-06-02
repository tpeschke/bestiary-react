import RoleTitle from "../../../roleTitle/RoleTitle"
import Movement from "./components/movement/MovementInfo"
import DefenseDisplay from "./components/defenseDisplay/DefenseDisplay"
import AttackDisplay from "./components/attackDisplay/AttackDisplay"
import CombatSubtitle from "./components/combatSubtitle/CombatSubtitle"

import LocationVitalities from "./components/locationalVitalities/LocationalVitalities"
import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { PairIconSettings } from "../../../../../../../components/UI/pair/Pair"
import { BonfireCombatInfo, HackMasterCombatInfo, SpecificCombatInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import Icon from "../../../../../../../../../../components/icon/Icon"
import { SystemOption } from "@bestiary/common/interfaces/beast/beast"

interface Props {
    combatInfo: SpecificCombatInfo,
    size: Size
}

export default function CombatSection({ combatInfo, size }: Props) {
    if (combatInfo.type === "Bonfire") {
        return <BonfireCombatInfoDisplay combatInfo={combatInfo as BonfireCombatInfo} size={size} />
    } else if (combatInfo.type === 'HackMaster') {
        return <HackMasterCombatInfoDisplay combatInfo={combatInfo as HackMasterCombatInfo} size={size} />
    }

    return <></>
}

function HackMasterCombatInfoDisplay({ combatInfo, size }: { combatInfo: HackMasterCombatInfo, size: Size }) {
    const {
        combatRole, combatEpValue, attackInfo, defenseInfo, combatSecondary, vitalityInfo, movements, attacks,
        defenses, initiative, type
    } = combatInfo

    const {
        vitality, rollUnderTrauma, noTrauma, trauma, knockback, noKnockback, locationalVitalities, weaponBreakageVitality,
        isIncorporeal, defenseNFleeDice, isSwarm
    } = vitalityInfo

    const { defense, flee } = defenseNFleeDice

    const traumaInfo = {
        trauma,
        noTrauma,
        rollUnderTrauma,
        type
    }

    const knockbackInfo = {
        knockback,
        noKnockback,
        size
    }

    const vitalityIconSetting: (PairIconSettings | null) = getVitalityIconSetting('HackMaster', weaponBreakageVitality, isIncorporeal, isSwarm)

    const defenseTotal = getTotal(vitality, defense, Math.floor)
    const fleeTotal = getTotal(vitality, flee, Math.ceil)

    return (
        <>
            <RoleTitle title='Combat' epValue={combatEpValue} role={combatRole} secondaryRole={combatSecondary} />
            <div className="pair-shell heading three">
                <h3>Hit Points</h3>
                <p>
                    <span data-tooltip-id="my-tooltip" data-tooltip-content="At this damage, the enemy becomes defensive and fleeing is free."><Icon iconName="fear" color='blue' /> {defenseTotal}</span>
                    <span> / </span>
                    <span data-tooltip-id="my-tooltip" data-tooltip-content="At this damage, the enemy flees the battlefield."><Icon iconName="run" color='blue' /> {fleeTotal}</span>
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

function getTotal(vitality: number | string, percentage: number | null, mathFunction: Function) {
    if (percentage && typeof vitality === 'number') {
        return mathFunction(percentage * vitality)
    }

    return 'Always'
}

function BonfireCombatInfoDisplay({ combatInfo, size }: { combatInfo: BonfireCombatInfo, size: Size }) {
    const {
        combatRole, combatSkulls, attackInfo, defenseInfo, combatSecondary, vitalityInfo, movements, attacks,
        defenses, initiative, type
    } = combatInfo

    const {
        vitality, rollUnderTrauma, noTrauma, trauma, knockback, noKnockback, locationalVitalities, weaponBreakageVitality,
        isIncorporeal, isSwarm
    } = vitalityInfo

    const traumaInfo = {
        trauma,
        noTrauma,
        rollUnderTrauma,
        type
    }

    const knockbackInfo = {
        knockback,
        noKnockback,
        size
    }

    const vitalityIconSetting: (PairIconSettings | null) = getVitalityIconSetting('Bonfire', weaponBreakageVitality, isIncorporeal, isSwarm)

    return (
        <>
            <RoleTitle title='Combat' skulls={combatSkulls} role={combatRole} secondaryRole={combatSecondary} />
            <div className="pair-shell heading three">
                <h3>Damage Threshold</h3>
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

function getVitalityIconSetting(system: SystemOption, weaponBreakageVitality: boolean, isIncorporeal: boolean, isSwarm: boolean): PairIconSettings | null {
    if (weaponBreakageVitality && system === 'Bonfire') {
        return {
            iconName: 'crack',
            tooltip: 'This creature only takes damage when it would take Wear on a 1-to-1 basis'
        }
    } else if (isIncorporeal) {
        return {
            iconName: 'ghost',
            tooltip: 'This creature takes no damage from any source except those specifically called out'
        }
    } else if (isSwarm && system === 'Bonfire') {
        return {
            iconName: 'locust',
            tooltip: "This creature is a swarm; It doesn't increase its Damage Die.\nIf it qualifies for a Swarm Bonus, it lowers that by 1.\nIf no Swarm Bonus, it receives a cumulative -1 Atk & +1 Def Pos. At H1 Atk, the swarm dissolves."
        }
    } else if (isSwarm && system === 'HackMaster') {
        return {
            iconName: 'locust',
            tooltip: "This creature is a swarm; It doesn't die when its damage goes over this amount.\nIf it qualifies for a Swarm Bonus, it lowers that by 1.\nIf no Swarm Bonus, it receives a cumulative -2 Atk & +1 Def. At -10 Atk, the swarm dissolves."
        }
    }
    return null
}
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import RoleTitle from "../../../roleTitle/RoleTitle";
import Movement from "./components/movement/MovementInfo";
import TacticsAndStrategy from "./components/tacticsAndStrategy/TacticsAndStrategy";
import DefenseDisplay from "./components/defenseDisplay/DefenseDisplay";
import AttackDisplay from "./components/attackDisplay/AttackDisplay";
import CombatSubtitle from "./components/combatSubtitle/CombatSubtitle";
import LocationVitalities from "./components/locationalVitalities/LocationalVitalities";
import Pair from "../../../../../../../components/UI/pair/Pair";
export default function CombatSection({ combatInfo, size }) {
    const { combatrole, combatpoints, sp_atk, sp_def, combatsecondary, vitalityInfo, movements, attacks, defenses, tactics, initiative } = combatInfo;
    const { vitality, fatigue, rollundertrauma, notrauma, trauma, knockback, noknockback, locationalVitalities, weaponbreakagevitality, isincorporeal } = vitalityInfo;
    let vitalityString = `${vitality}`;
    if (fatigue && fatigue < vitality) {
        vitalityString = `(${fatigue}) ` + vitalityString;
    }
    if (fatigue && fatigue >= vitality) {
        vitalityString = `(N) ` + vitalityString;
    }
    const traumaInfo = {
        trauma,
        notrauma,
        rollundertrauma
    };
    const knockbackInfo = {
        knockback,
        noknockback,
        size
    };
    const vitalityIconSetting = getVitalityIconSetting(weaponbreakagevitality, isincorporeal);
    return (_jsxs(_Fragment, { children: [_jsx(RoleTitle, { title: 'Combat', points: combatpoints, role: combatrole, secondaryRole: combatsecondary }), _jsx(Pair, { title: "Vitality (Fatigue)", info: vitalityString, format: { heading: true }, icon: vitalityIconSetting }), _jsx(CombatSubtitle, { traumaInfo: traumaInfo, initiative: initiative, knockbackInfo: knockbackInfo }), _jsx(LocationVitalities, { locationalVitalities: locationalVitalities }), _jsx(DefenseDisplay, { defenses: defenses, sp_def: sp_def }), _jsx(AttackDisplay, { attacks: attacks, sp_atk: sp_atk }), _jsx(Movement, { movements: movements }), _jsx(TacticsAndStrategy, { tactics: tactics })] }));
}
function getVitalityIconSetting(weaponbreakagevitality, isincorporeal) {
    if (weaponbreakagevitality) {
        return {
            iconName: 'crack',
            tooltip: 'This creature only takes damage when it would take Wear on a 1-to-1 basis'
        };
    }
    else if (isincorporeal) {
        return {
            iconName: 'ghost',
            tooltip: 'This creature takes no damage from any source except those specifically called out'
        };
    }
    return null;
}

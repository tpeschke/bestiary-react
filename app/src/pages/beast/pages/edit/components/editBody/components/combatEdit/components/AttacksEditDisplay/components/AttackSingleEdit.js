import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Select from 'react-select';
import getSituationOptions from "./utilities/situationOptions";
import { getTacticOptionsForEdit } from '../../../../../../../../../utilities/tacticOptions';
import Icon from '../../../../../../../../../../../components/icon/Icon';
export default function AttackSingleEdit({ attackInfo, updateAttackInfo, combatRoleType, removeAttack }) {
    const { name, weapon, overAllIndex, situation, tactic } = attackInfo;
    return (_jsxs("div", { className: 'attack-edit-row', children: [_jsx("p", { children: name ? name : '' }), _jsx("p", { children: weapon ? weapon : '' }), _jsx("div", { className: 'attack-edit-select-shell', children: _jsx(Select, { isSearchable: true, value: { value: situation, label: situation }, options: getSituationOptions(combatRoleType), onChange: (event) => updateAttackInfo('situation', event.value, overAllIndex) }) }), _jsx("p", { className: 'input-header' }), _jsx("div", { className: 'attack-edit-select-shell', children: _jsx(Select, { isSearchable: true, value: { value: tactic, label: tactic }, options: getTacticOptionsForEdit(), onChange: (event) => updateAttackInfo('tactic', event.value, overAllIndex) }) }), _jsx("button", { className: "orange", onClick: _ => removeAttack(overAllIndex), children: _jsx(Icon, { iconName: 'trash', color: 'white' }) })] }));
}

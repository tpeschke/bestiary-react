import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Select from 'react-select';
import getSituationOptions from './utilities/situationOptions';
import { getTacticOptionsForEdit } from '../../../../../../../../../utilities/tacticOptions';
export default function ReferenceEdit({ attackReference, combatRoleType, updateAttackInfo }) {
    const { reference, overAllIndex, situation, tactic } = attackReference;
    return (_jsxs("div", { className: 'attack-edit-row', children: [_jsx("p", {}), _jsx("p", {}), _jsx("div", { className: 'attack-edit-select-shell', children: _jsx(Select, { isSearchable: true, value: { value: situation, label: situation }, options: getSituationOptions(combatRoleType), onChange: (event) => updateAttackInfo('situation', event.value, overAllIndex) }) }), _jsx("div", { className: 'attack-edit-select-shell', children: _jsx(Select, { isSearchable: true, value: { value: reference, label: reference }, options: getSituationOptions(combatRoleType), onChange: (event) => updateAttackInfo('reference', event.value, overAllIndex) }) }), _jsx("div", { className: 'attack-edit-select-shell', children: _jsx(Select, { isSearchable: true, value: { value: tactic, label: tactic }, options: getTacticOptionsForEdit(), onChange: (event) => updateAttackInfo('tactic', event.value, overAllIndex) }) })] }));
}

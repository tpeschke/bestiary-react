import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import './DefenseEditDisplay.css';
import Icon from "../../../../../../../../../../components/icon/Icon";
import Body from "../../../../../../../../components/UI/body/Body";
import MoveOrderButton from "../AttacksEditDisplay/components/MoveOrderButton";
export default function DefenseEditDisplay({ defenses, updateDefenseOrder, removeDefense, updateDefenseInfo }) {
    return (_jsx(Body, { children: _jsxs(_Fragment, { children: [_jsx("h2", { className: "border", children: "Defenses" }), _jsxs("div", { className: "defense-edit-header", children: [_jsx("div", {}), _jsx("p", { children: "Name" })] }), defenses.map((attack, index) => {
                    const nextUp = defenses[index - 1]?.overAllIndex;
                    const nextDown = defenses[index + 1]?.overAllIndex;
                    return DefenseEdit(attack, index, defenses.length, nextUp, nextDown, updateDefenseOrder, removeDefense, updateDefenseInfo);
                })] }) }));
}
function DefenseEdit({ overAllIndex, defensename }, index, arrayLength, nextUp, nextDown, updateDefenseOrder, removeDefense, updateDefenseInfo) {
    return (_jsxs("div", { className: "defense-edit-row", children: [MoveOrderButton(index > 0, 'up', updateDefenseOrder, overAllIndex, nextUp), MoveOrderButton(index < arrayLength - 1, 'down', updateDefenseOrder, overAllIndex, nextDown), _jsx("input", { value: defensename ? defensename : '', onChange: event => updateDefenseInfo('defensename', event.target.value, overAllIndex) }), _jsx("button", { className: "orange", onClick: _ => removeDefense(overAllIndex), children: _jsx(Icon, { iconName: 'trash', color: 'white' }) })] }, index));
}

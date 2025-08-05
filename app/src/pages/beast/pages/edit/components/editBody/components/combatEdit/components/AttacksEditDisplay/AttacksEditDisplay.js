import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Icon from '../../../../../../../../../../components/icon/Icon';
import Body from '../../../../../../../../components/UI/body/Body';
import './AttacksEditDisplay.css';
import AttackSingleEdit from './components/AttackSingleEdit';
import MoveOrderButton from './components/MoveOrderButton';
import ReferenceEdit from './components/ReferenceEdit';
export default function AttacksEditDisplay({ attacks, updateAttackOrder, updateAttackInfo, addAttack, removeAttack, combatRoleType }) {
    const getCorrectAttackEditOption = (attackInfo, updateAttackInfo, combatRoleType) => {
        if (attackInfo.infoType === 'weapon') {
            return (_jsx(AttackSingleEdit, { attackInfo: attackInfo, updateAttackInfo: updateAttackInfo, combatRoleType: combatRoleType, removeAttack: removeAttack }));
        }
        else if (attackInfo.infoType === 'reference') {
            return (_jsx(ReferenceEdit, { attackReference: attackInfo, updateAttackInfo: updateAttackInfo, combatRoleType: combatRoleType }));
        }
    };
    return (_jsx(Body, { children: _jsxs(_Fragment, { children: [_jsx("h2", { className: "border", children: "Attacks" }), _jsxs("div", { className: 'attack-edit-header', children: [_jsx("div", {}), _jsx("p", { children: "Name" }), _jsx("p", { children: "Weapon" }), _jsx("p", { className: 'input-header', children: "Situation" }), _jsx("p", { className: 'input-header', children: "Reference" }), _jsx("p", { className: 'input-header', children: "Tactic" })] }), attacks.map((attack, index) => {
                    const nextUp = attacks[index - 1]?.overAllIndex;
                    const nextDown = attacks[index + 1]?.overAllIndex;
                    return (_jsxs("div", { className: 'attack-edit-shell', children: [MoveOrderButton(index > 0, 'up', updateAttackOrder, attack.overAllIndex, nextUp), MoveOrderButton(index < attacks.length - 1, 'down', updateAttackOrder, attack.overAllIndex, nextDown), getCorrectAttackEditOption(attack, updateAttackInfo, combatRoleType)] }, index));
                }), _jsx("div", { className: 'add-attack-button-shell', children: _jsxs("button", { onClick: _ => addAttack({ infoType: 'reference', reference: '', overAllIndex: 0 }), children: [_jsx(Icon, { iconName: 'plus', color: 'black' }), " Reference"] }) })] }) }));
}

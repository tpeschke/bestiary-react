import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./RoleTitle.css";
import Icon from "../../../../../../../components/icon/Icon";
export default function RoleTitle({ title, points, role, secondaryRole, hasBottomBorder }) {
    const showRightSide = (points || points === 0) && role;
    let shellClass = 'role-shell';
    if (hasBottomBorder) {
        shellClass += ' title-bottom-border';
    }
    const tooltip = "This indicates how dangerous this entry is.\nRed Skulls represent a particularly dangerous entry";
    return (_jsxs("div", { className: shellClass, children: [_jsx("h2", { children: title }), showRightSide &&
                _jsxs("div", { className: "skull-frame", children: [_jsxs("p", { children: [role, " ", secondaryRole ? `(${secondaryRole})` : ''] }), _jsx("span", { "data-tooltip-id": "my-tooltip", "data-tooltip-content": tooltip, children: getSkullNumber(points).map((_, index, array) => _jsx(Icon, { iconName: "skull", iconSize: 'h2', color: array.length >= 7 ? 'red' : 'white', tooltip: tooltip }, index)) })] })] }));
}
function getSkullNumber(points) {
    if (points <= 3) {
        return [...Array(1).keys()];
    }
    else if (points <= 8) {
        return [...Array(2).keys()];
    }
    else if (points <= 13) {
        return [...Array(3).keys()];
    }
    else if (points <= 18) {
        return [...Array(4).keys()];
    }
    else if (points <= 23) {
        return [...Array(5).keys()];
    }
    else if (points <= 28) {
        return [...Array(6).keys()];
    }
    else if (points <= 33) {
        return [...Array(7).keys()];
    }
    else {
        return [...Array(8).keys()];
    }
}

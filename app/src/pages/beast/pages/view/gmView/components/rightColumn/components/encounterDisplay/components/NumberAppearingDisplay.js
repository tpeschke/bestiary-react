import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import '../EncounterDisplay.css';
export default function NumberAppearingDisplay({ groupInfo }) {
    const { label, roleNumbers } = groupInfo;
    function formatNumberAppearing(roles) {
        return Object.keys(roles).reduce((totalString, role, index, roleArray) => {
            const number = roles[role];
            const roleName = number > 1 ? role + 's' : role;
            const roleString = ` ${number} ${roleName}`;
            if (index > 0 && index === roleArray.length - 1) {
                return totalString + ', and ' + roleString;
            }
            else if (index > 0) {
                return totalString + ', ' + roleString;
            }
            return totalString += ` ${number} ${roleName}`;
        }, '');
    }
    return (_jsxs("div", { className: 'number-appearing-shell', children: [_jsx("h3", { children: "Number Appearing " }), _jsxs("p", { children: ["A ", label, " of ", formatNumberAppearing(roleNumbers)] })] }));
}

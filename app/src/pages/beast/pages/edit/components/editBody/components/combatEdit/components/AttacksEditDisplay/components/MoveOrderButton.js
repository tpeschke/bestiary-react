import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import Icon from "../../../../../../../../../../../components/icon/Icon";
export default function MoveOrderButton(active, direction, updateOrderCallback, overAllIndex, indexToMoveTo) {
    return (_jsx(_Fragment, { children: active ? (_jsx("button", { onClick: _ => updateOrderCallback(overAllIndex, indexToMoveTo), children: _jsx(Icon, { iconName: direction, color: 'black' }) })) : (_jsx("button", { disabled: true, children: _jsx(Icon, { iconName: direction, color: 'white' }) })) }));
}

import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Icon from '../../../../../../../../../../../../../components/icon/Icon';
import './TraumaDisplay.css';
export default function TraumaDisplay({ trauma, notrauma, rollundertrauma }) {
    const traumaString = `${trauma} (${rollundertrauma})`;
    const showTrauma = !notrauma && trauma;
    return (_jsx(_Fragment, { children: showTrauma &&
            _jsxs("div", { className: "trauma-pair-shell", children: [_jsxs("div", { children: [_jsx("p", { children: "Trauma (" }), " ", _jsx(Icon, { iconName: "downArrow", color: 'black', tooltip: 'What you need to roll under for the Trauma Check' }), _jsx("p", { children: ")" })] }), _jsx("p", { children: traumaString })] }) }));
}

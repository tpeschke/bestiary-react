import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from '../../../../../../../../../../components/icon/Icon';
import '../EncounterDisplay.css';
export default function TemperamentDisplay({ temperamentInfo }) {
    const { temperament, tooltip } = temperamentInfo;
    return (_jsxs("div", { className: 'pair-shell', children: [_jsx("h3", { children: "Temperament" }), _jsxs("p", { children: [temperament, " ", _jsx(Icon, { iconName: 'info', tooltip: tooltip })] })] }));
}

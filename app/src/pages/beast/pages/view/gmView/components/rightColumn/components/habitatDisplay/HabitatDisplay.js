import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import ScenarioDisplay from './components/ScenarioDisplay';
import InfoDisplay from '../infoDisplay/InfoDisplay';
export default function HabitatDisplay({ info, scenarios }) {
    return (_jsxs(_Fragment, { children: [_jsx(InfoDisplay, { section: "Habitat / Society", info: info }), scenarios.length > 0 &&
                _jsx(ScenarioDisplay, { scenarios: scenarios })] }));
}

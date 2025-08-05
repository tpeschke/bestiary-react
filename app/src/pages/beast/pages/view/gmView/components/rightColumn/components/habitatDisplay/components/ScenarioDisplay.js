import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Body from '../../../../../../../../components/UI/body/Body';
export default function ScenarioDisplay({ scenarios }) {
    return (_jsxs(_Fragment, { children: [_jsx("h3", { children: "Scenarios" }), _jsx(Body, { children: _jsx("ul", { children: scenarios.map(({ scenario }, index) => {
                        return (_jsx("li", { children: scenario }, index));
                    }) }) })] }));
}

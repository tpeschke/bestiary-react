import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Icon from "../../../../../../../../../../components/icon/Icon";
import Table from "../../../../../../../../../../components/table/Table";
import "../EncounterDisplay.css";
export default function SignDisplay({ signInfo }) {
    const { beastSign, allSigns } = signInfo;
    const allSignsTable = {
        title: 'All Signs for Entry',
        headerRow: ['Value', 'Weight'],
        rows: allSigns.map(sign => [sign.sign, sign.weight])
    };
    const htmlTooltip = {
        component: Table({ table: allSignsTable, textAlign: "second-column-center" }),
        id: 'sign-table'
    };
    return (_jsx(_Fragment, { children: signInfo &&
            _jsx("div", { className: "sign-display-shell", children: _jsxs("div", { className: "pair-shell secondary-div", children: [_jsxs("h3", { children: ["Sign ", _jsx(Icon, { iconName: "info", tooltip: "Signs are evidence of the monster's passing or evidence that the monster is near. They can be sights, sounds, leavings, victims, tracks, smells & vapors, environmental damage, and/or intentional markings." })] }), _jsxs("div", { children: [_jsx("p", { children: beastSign.sign }), " ", _jsx(Icon, { iconName: "table", htmlTooltip: htmlTooltip })] })] }) }) }));
}

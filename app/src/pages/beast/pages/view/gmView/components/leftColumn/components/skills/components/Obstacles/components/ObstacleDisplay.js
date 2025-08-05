import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import '../ObstaclesDisplay.css';
import Icon from '../../../../../../../../../../../../components/icon/Icon';
import HTMLDisplay from '../../../../../../../../../../components/UI/htmlDisplay/htmlDisplay';
export default function ObstacleDisplay({ obstacle }) {
    if (!obstacle) {
        return _jsx(_Fragment, {});
    }
    const { name, difficulty, time, threshold, complicationsingle, complications = [], failure, success, information, notes, pairsOne } = obstacle;
    return (_jsx("div", { className: "obstacle-shell", children: _jsxs("table", { children: [_jsx("thead", { children: _jsx("tr", { children: _jsxs("th", { colSpan: 2, children: [_jsx(Icon, { iconName: "obstacle", color: 'white' }), " ", name] }) }) }), _jsxs("tbody", { children: [difficulty && _jsxs("tr", { className: 'standard-row', children: [_jsx("td", { children: _jsx("strong", { children: "Risk" }) }), _jsx("td", { children: difficulty })] }), time && _jsxs("tr", { className: 'standard-row', children: [_jsx("td", { children: _jsx("strong", { children: "Time" }) }), _jsx("td", { children: time })] }), threshold && _jsxs("tr", { className: 'standard-row', children: [_jsx("td", { children: _jsx("strong", { children: "Ease" }) }), _jsx("td", { children: threshold })] }), complicationsingle && _jsxs("tr", { className: 'standard-row', children: [_jsx("td", { children: _jsx("strong", { children: "Complication" }) }), _jsx("td", { children: complicationsingle })] }), complications.length > 0 && (_jsxs(_Fragment, { children: [_jsx("tr", { className: 'standard-row', children: _jsx("td", { colSpan: 2, children: _jsx("strong", { children: "Complications" }) }) }), complications.map(({ name, body }, index) => {
                                    return (_jsxs("tr", { className: 'standard-row', children: [_jsx("td", { children: name }), _jsx("td", { children: body })] }, index));
                                })] })), failure && _jsxs("tr", { className: 'standard-row', children: [_jsx("td", { children: _jsx("strong", { children: "Failure" }) }), _jsx("td", { children: failure })] }), success && _jsxs("tr", { className: 'standard-row', children: [_jsx("td", { children: _jsx("strong", { children: "Success" }) }), _jsx("td", { children: success })] }), pairsOne && (pairsOne.map(({ name, body }) => {
                            return (_jsxs("tr", { className: 'standard-row', children: [_jsx("td", { children: _jsx("strong", { children: name }) }), _jsx("td", { children: body })] }));
                        })), information && _jsx(HTMLDisplay, { html: information }), notes && (_jsx("tr", { className: 'standard-row', children: _jsxs("td", { colSpan: 2, children: [_jsx("strong", { children: "Notes" }), _jsx(HTMLDisplay, { html: notes })] }) }))] })] }) }));
}

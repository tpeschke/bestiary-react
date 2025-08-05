import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from "../../../../../components/icon/Icon";
import "./Pair.css";
export default function Pair({ title, info, format, icon }) {
    let shellClassString = "pair-shell";
    format?.heading ? shellClassString += " heading" : null;
    format?.noBorder ? shellClassString += " noBorder" : null;
    format?.position ? shellClassString += " opposite" : null;
    let titleClassString = "";
    format?.titleJustified === 'right' ? titleClassString += "justifiedRight" : null;
    format?.titleJustified === 'left' ? titleClassString += "justifiedLeft" : null;
    let infoClassString = "";
    format?.info ? infoClassString += ' minor' : null;
    format?.infoWidth === 'unset' ? infoClassString += ' unsetWith' : null;
    return (_jsxs("div", { className: shellClassString, children: [format?.title === 'none' ?
                _jsx("p", { className: titleClassString, children: title })
                :
                    _jsx("h3", { className: titleClassString, children: title }), _jsxs("p", { className: infoClassString, children: [info, " ", icon && _jsx(Icon, { iconName: icon.iconName, tooltip: icon.tooltip, color: 'black' })] })] }));
}

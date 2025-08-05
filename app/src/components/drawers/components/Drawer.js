import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from '../../icon/Icon';
import './Drawer.css';
export default function Drawer({ label, subtitle, innards, isOpen, index, openDrawer }) {
    let classShellString = 'drawer-shell';
    isOpen ? classShellString += ' open' : '';
    index > 0 && isOpen ? classShellString += ' open-top-margin' : '';
    const indexToSetTo = isOpen ? null : index;
    return (_jsxs("div", { className: classShellString, onClick: _ => openDrawer(indexToSetTo), children: [_jsxs("div", { className: 'drawer-header-shell', children: [_jsx("h3", { children: label }), subtitle && _jsx("p", { children: subtitle }), _jsx("div", { className: 'icon-shell', children: _jsx(Icon, { iconName: isOpen ? 'up' : 'down' }) })] }), _jsx("div", { className: 'drawer-innards', children: innards })] }));
}

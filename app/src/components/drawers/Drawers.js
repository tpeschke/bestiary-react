import { jsx as _jsx } from "react/jsx-runtime";
import Drawer from './components/Drawer';
import './Drawers.css';
import { useEffect, useState } from 'react';
export default function Drawers({ drawerInnards, closeDrawer = false }) {
    const [openIndex, setOpenIndex] = useState(null);
    useEffect(() => {
        if (closeDrawer) {
            setOpenIndex(null);
        }
    }, [closeDrawer]);
    return (_jsx("div", { className: 'drawers-shell', children: drawerInnards.map(({ label, subtitle, innards }, index) => _jsx(Drawer, { label: label, subtitle: subtitle, innards: innards, isOpen: openIndex === index, index: index, openDrawer: setOpenIndex }, index)) }));
}

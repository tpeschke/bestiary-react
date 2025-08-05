import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './RatingModifierDisplay.css';
import QuickLink from '../../../../../../../components/QuickLink';
export default function RatingModifierDisplay({ updateRoleModifier, modifierIndex, copyQuickLink, hasModifier }) {
    const modifierDictionary = [
        'None',
        'Unique',
        'Greater',
        'Dread',
        'THE'
    ];
    return (_jsxs("div", { className: 'rating-modifier-shell', children: [_jsx("h2", { children: "Skull Modifier" }), _jsx("select", { value: modifierIndex, onChange: event => updateRoleModifier(+event.target.value), children: modifierDictionary.map((modifier, index) => {
                    return _jsx("option", { value: index, children: modifier }, index);
                }) }), hasModifier && _jsx(QuickLink, { copyQuickLink: copyQuickLink, hasModifier: hasModifier })] }));
}

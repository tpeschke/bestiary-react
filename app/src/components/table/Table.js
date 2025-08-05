import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Table.css';
export default function Table({ table, textAlign }) {
    const { title, headerRow, rows } = table;
    let classString = '';
    switch (textAlign) {
        case 'second-column-center':
            classString += ' second-column-center';
            break;
    }
    return (_jsxs("table", { className: classString, children: [_jsxs("thead", { children: [title &&
                        _jsx("tr", { children: _jsx("th", { colSpan: rows.length, children: title }) }), headerRow &&
                        _jsx("tr", { className: 'header-row', children: headerRow.map((column, index) => _jsx("th", { children: column }, index)) })] }), _jsx("tbody", { children: rows.map((row, index) => {
                    return (_jsx("tr", { className: 'standard-row', children: row.map((column, index) => _jsx("td", { children: column }, index)) }, index));
                }) })] }));
}

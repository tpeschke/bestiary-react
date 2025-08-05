import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function SearchSelect({ stopPropagationAndCaptureQuery, param, label, dictionary }) {
    return (_jsxs("div", { children: [label && _jsx("label", { children: label }), _jsxs("select", { onChange: event => stopPropagationAndCaptureQuery(param, event), children: [_jsx("option", { value: 'none', children: "I Don't Care" }), dictionary.map((value, index) => {
                        if (typeof value === 'string') {
                            return _jsx("option", { value: value, children: value }, index);
                        }
                        else {
                            return _jsx("option", { value: value.id, children: value.value }, index);
                        }
                    })] })] }));
}

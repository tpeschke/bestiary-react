import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from "../../../../../../../../../../../../components/icon/Icon";
export default function TalismanDisplay({ talisman }) {
    const { skill, explanation } = talisman;
    return (_jsxs("li", { children: [skill, _jsx(Icon, { iconName: "info", margin: 'left', tooltip: explanation })] }));
}

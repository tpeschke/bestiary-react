import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from "../../../../../../../../../../../../components/icon/Icon";
export default function AlmScriptDisplay({ script }) {
    return (_jsxs("li", { children: [script, _jsx(Icon, { iconName: "info", margin: 'left', tooltip: "Destroying this script awards the noted Favor that must immediately be spent. It can take you above your Max Favor." })] }));
}

import { jsx as _jsx } from "react/jsx-runtime";
import Icon from "../../../components/icon/Icon";
export default function QuickLink({ copyQuickLink, hasModifier }) {
    const tooltip = `This gives you a quick link to this Role${hasModifier ? ' with this Modifier.' : '.'}`;
    return (_jsx("button", { onClick: _ => copyQuickLink(), "data-tooltip-id": "my-tooltip", "data-tooltip-content": tooltip, children: _jsx(Icon, { iconName: "link", tooltip: tooltip }) }));
}

import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Tooltip } from "react-tooltip";
import ObstacleDisplay from "./ObstacleDisplay";
import Icon from "../../../../../../../../../../../../components/icon/Icon";
export default function ObstacleItem({ obstacle }) {
    return (_jsxs(_Fragment, { children: [_jsxs("p", { "data-tooltip-id": obstacle.stringid, children: [obstacle.name, _jsx(Icon, { iconName: "eye", margin: 'left' })] }), _jsx(Tooltip, { id: obstacle.stringid, children: _jsx(ObstacleDisplay, { obstacle: obstacle }) })] }));
}

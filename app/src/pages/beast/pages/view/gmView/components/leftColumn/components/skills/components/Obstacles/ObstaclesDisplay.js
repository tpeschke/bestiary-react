import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Body from '../../../../../../../../../components/UI/body/Body';
import './ObstaclesDisplay.css';
import ObstacleItem from "./components/ObstacleItem";
export default function ObstaclesDisplay({ obstacles }) {
    return (_jsxs("div", { className: 'obstacles-display-shell', children: [_jsx("h3", { children: "Obstacles" }), _jsx(Body, { children: _jsx(_Fragment, { children: obstacles.map((obstacle, index) => _jsx(ObstacleItem, { obstacle: obstacle }, index)) }) })] }));
}

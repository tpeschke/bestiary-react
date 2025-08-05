import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Tile.css';
import ImageNotFound from '../../../../assets/images/404.png';
import { Link } from "react-router-dom";
import { imageBase } from '../../../../frontend-config';
import TileIcon from './components/TileIcon';
export default function Tile({ tile }) {
    const { id, thumbnail, name, canplayerview, patreon, notupdating } = tile;
    function handleImageError({ currentTarget }) {
        currentTarget.onerror = null;
        currentTarget.src = ImageNotFound;
    }
    const tooltip = notupdating ? "This entry isn't being updated currently. If you need it, let Peschke know and he'll update it for you. \nYou can still view it." : null;
    return (_jsx(Link, { to: `/beast/${id}`, children: _jsxs("div", { className: notupdating ? 'tile not-updating' : 'tile', "data-tooltip-id": "my-tooltip", "data-tooltip-content": tooltip, children: [_jsxs("div", { className: 'image-frame', children: [_jsx("div", { className: 'icon-frame', children: _jsx(TileIcon, { canplayerview: canplayerview, patreon: patreon }) }), _jsx("img", { src: imageBase + id, style: { 'objectPosition': thumbnail ?? 'top' }, onError: handleImageError })] }), _jsx("span", { className: 'name-frame', children: _jsx("h2", { children: name }) })] }) }));
}

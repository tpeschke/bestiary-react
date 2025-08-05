import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import '../../Catalog.css';
import Icon from '../../../../components/icon/Icon';
import Tile from '../tile/Tile';
export default function Row({ title, catalogTiles }) {
    const displayedTitle = title ?? catalogTiles[0].name.substring(0, 1);
    return (_jsxs("div", { className: 'row', children: [_jsxs("h1", { children: [displayedTitle, " ", displayedTitle === 'Templates' && _jsx(Icon, { iconName: 'info', tooltip: "A template is the purist expression of a monster - a platonic version, if you will. It is, in fact, so pure that they do not exist in the game world. Templates monsters are baselines that you can use to improve monsters that are not in the Bestiary on the fly." })] }), _jsx("div", { className: 'tile-row', children: catalogTiles.map((tile, index) => _jsx(Tile, { tile: tile }, index)) })] }));
}

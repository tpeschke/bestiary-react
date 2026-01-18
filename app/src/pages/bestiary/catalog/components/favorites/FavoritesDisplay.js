import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Row from "../row/Row";
export default function FavoritesDisplay({ userIsLoggedIn, favorites }) {
    if (!userIsLoggedIn) {
        return _jsx(_Fragment, {});
    }
    return (_jsx(_Fragment, { children: favorites.length > 0 ? (_jsx(Row, { catalogTiles: favorites, title: 'Favorites' })) : (_jsxs("div", { className: 'row', children: [_jsx("h1", { children: "Favorites" }), _jsx("div", { className: 'tile-row', children: _jsx("p", { className: 'warning paragraph-padding', children: "You have no Favorites (yet)" }) })] })) }));
}

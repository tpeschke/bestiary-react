import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Catalog.css';
import catalogItemStates from './hooks/catalogItemStates';
import Row from './components/row/Row';
import Rows from './components/row/Rows';
import { useEffect, useState } from 'react';
import { isUserLoggedOn } from '../../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import FavoritesDisplay from './components/favorites/FavoritesDisplay';
export default function Catalog({ setLoading }) {
    document.title = 'Bonfire Bestiary';
    const { templates, freeBeasts, catalogItems, updatingCatalogItems, favorites } = catalogItemStates();
    const userIsLoggedIn = useSelector(isUserLoggedOn);
    const [showAll, setShowAll] = useState(false);
    useEffect(() => {
        if (setLoading) {
            setLoading(catalogItems.length > 0);
        }
    }, [catalogItems]);
    return (_jsxs("div", { className: 'card-background catalog', children: [!userIsLoggedIn && _jsx(Row, { catalogTiles: freeBeasts, title: 'Free Entries' }), _jsx(FavoritesDisplay, { userIsLoggedIn: userIsLoggedIn, favorites: favorites }), showAll && _jsx(Row, { catalogTiles: templates, title: 'Templates' }), _jsx(Rows, { catalogItems: showAll ? catalogItems : updatingCatalogItems }), _jsxs("button", { onClick: _ => setShowAll(!showAll), className: 'orange', children: [showAll ? 'Hide' : 'Show', " Entire Catalog"] })] }));
}

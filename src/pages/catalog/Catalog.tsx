import './Catalog.css'

import catalogItemStates from './hooks/catalogItemStates';

import Row from './components/row/Row';
import Rows from './components/row/Rows';
import { useState } from 'react';
import { isUserLoggedOn } from '../../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import FavoritesDisplay from './components/favorites/FavoritesDisplay';

export default function Catalog(setLoading: Function) {
    const { templates, freeBeasts, catalogItems, updatingCatalogItems, favorites } = catalogItemStates()
    const userIsLoggedIn = useSelector(isUserLoggedOn)
    
    const [showAll, setShowAll] = useState(false)

    setLoading(templates.length === 0 && freeBeasts.length === 0 && catalogItems.length === 0)

    return (
        <div className='card-background catalog'>
            {!userIsLoggedIn && <Row catalogTiles={freeBeasts} title={'Free Entries'} />}
            <FavoritesDisplay userIsLoggedIn={userIsLoggedIn} favorites={favorites} />
            {showAll && <Row catalogTiles={templates} title={'Templates'} />}
            <Rows catalogItems={showAll ? catalogItems : updatingCatalogItems} />
            <button onClick={_ => setShowAll(!showAll)} className='orange'>{showAll ? 'Hide' : 'Show'} Entire Catalog</button>
        </div>
    )
}
import './Catalog.css'

import catalogItemStates from './hooks/catalogItemStates';

import Row from './components/row/Row';
import Rows from './components/row/Rows';
import { useEffect, useState } from 'react';
import { isUserLoggedOn } from '../../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import FavoritesDisplay from './components/favorites/FavoritesDisplay';
import { SetLoadingFunction } from '../../components/loading/Loading';

interface Props {
    setLoading?: SetLoadingFunction
}

export default function Catalog({ setLoading }: Props) {
    const { templates, freeBeasts, catalogItems, updatingCatalogItems, favorites } = catalogItemStates()
    const userIsLoggedIn = useSelector(isUserLoggedOn)

    const [showAll, setShowAll] = useState(false)

    useEffect(() => {
        if (setLoading) {
            setLoading(catalogItems.length > 0)
        }
    }, [catalogItems])

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
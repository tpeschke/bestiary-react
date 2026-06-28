import './Catalog.css'

import catalogItemStates from './hooks/catalogItemStates';

import Row from './components/row/Row';
import Rows from './components/row/Rows';
import { useEffect, useState } from 'react';
import { getUserPatreon, isUserLoggedOn } from '../../../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import FavoritesDisplay from './components/favorites/FavoritesDisplay';
import { SetLoadingFunction } from '../../../components/loading/Loading';
import { EARLY_ACCESS } from '@bestiary/common/utilities/get/getAccessLevel';

interface Props {
    setLoading?: SetLoadingFunction
}

export default function Catalog({ setLoading }: Props) {
    document.title = 'Bonfire Bestiary'
    
    const { templates, freeBeasts, AllCatalogItems, catalogItems, favorites } = catalogItemStates()
    const userIsLoggedIn = useSelector(isUserLoggedOn)
    const usersPatreon = useSelector(getUserPatreon)

    const [showAll, setShowAll] = useState(false)

    useEffect(() => {
        if (setLoading) {
            setLoading(catalogItems.length > 0)
        }
    }, [catalogItems])

    return (
        <div className='card-background catalog'>
            {usersPatreon === EARLY_ACCESS && <button onClick={_ => setShowAll(!showAll)} className='orange'>{showAll ? 'Hide' : 'Also Show'} Early Access</button>}
            {!userIsLoggedIn && <Row catalogTiles={freeBeasts} title={'Free Entries'} />}
            <FavoritesDisplay userIsLoggedIn={userIsLoggedIn} favorites={favorites} />
            {showAll && <Row catalogTiles={templates} title={'Templates'} />}
            <Rows catalogItems={showAll ? AllCatalogItems : catalogItems} />
        </div>
    )
}
import './Catalog.css'

import catalogItemStates from './hooks/catalogItemStates';

import Row from './components/Row';
import Rows from './components/Rows';
import { useState } from 'react';

export default function Catalog(setLoading: Function) {
    const { templates, freeBeasts, catalogItems, updatingCatalogItems } = catalogItemStates()

    const [showAll, setShowAll] = useState(false)

    setLoading(templates.length === 0 && freeBeasts.length === 0 && catalogItems.length === 0)

    return (
        <div className='card-background catalog'>
            <Row catalogTiles={freeBeasts} title={'Free Entries'} />
            {showAll && <Row catalogTiles={templates} title={'Templates'} />}
            <Rows catalogItems={showAll ? catalogItems : updatingCatalogItems} />
            <button onClick={_ => setShowAll(!showAll)} className='orange'>{showAll ? 'Hide' : 'Show'} Entire Catalog</button>
        </div>
    )
}
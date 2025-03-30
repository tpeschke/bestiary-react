import './Catalog.css'

import { useEffect } from 'react';
import axios from 'axios';
import { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux'

import { catalogURL } from '../../frontend-config'


import Row from './Row';
import { CatalogTile } from './catalogInterfaces';

import { saveCatalog } from '../../redux/slices/catalogSlice';

export default function Catalog() {
    const templates: CatalogTile[] = useSelector((state: RootState) => state.catalog.templates)
    const freeBeasts: CatalogTile[] = useSelector((state: RootState) => state.catalog.freeBeasts)
    const catalogItems: CatalogTile[][] = useSelector((state: RootState) => state.catalog.catalogItems)
    const dispatch = useDispatch()

    useEffect(() => {
        if (catalogItems.length === 0) {
            axios.get(catalogURL + '/').then(({ data }) => {
                dispatch(saveCatalog(data))
            })
        }
    }, []);

    return (
        <div className='card-background catalog'>
            <Row catalogTiles={freeBeasts} title={'Free Entries'} />
            <Row catalogTiles={templates} title={'Templates'} />
            {catalogItems.map((catalogItem: CatalogTile[], index: number) => {
                return <Row key={index} catalogTiles={catalogItem} />
            })}
        </div>
    )
}
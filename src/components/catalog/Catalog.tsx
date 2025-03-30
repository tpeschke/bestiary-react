import { useState, useEffect } from 'react';
import axios from 'axios';

import { catalogURL } from '../../frontend-config'

import './Catalog.css'
import Row from './Row';
import { CatalogTile } from './catalogInterfaces';

export default function Catalog() {
    const [catalogItems, setCatalogItems] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [freeBeasts, setfreeBeasts] = useState([]);

    useEffect(() => {
        axios.get(catalogURL + '/').then(({ data }) => {
            setTemplates(data.templates)
            setfreeBeasts(data.freeBeasts)
            setCatalogItems(data.catalog);
        })
    }, []);

    return (
        <div className='card-background'>
            <Row catalogTiles={freeBeasts} title={'Free Entries'}/>
            <Row catalogTiles={templates} title={'Templates'}/>
            {catalogItems.map((catalogItem: CatalogTile[], index: number) => {
                return <Row key={index} catalogTiles={catalogItem}/>
            })}
        </div>
    )
}
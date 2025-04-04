import './Catalog.css'

import Row from './components/Row';
import { CatalogTile } from './catalogInterfaces';

import catalogItemStates from './hooks/catalogItemStates';

export default function Catalog() {
    const { templates, freeBeasts, catalogItems } = catalogItemStates()

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
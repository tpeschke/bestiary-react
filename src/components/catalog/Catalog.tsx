import './Catalog.css'

import catalogItemStates from './hooks/catalogItemStates';

import Row from './components/Row';
import Rows from './components/Rows';

export default function Catalog() {
    const { templates, freeBeasts, catalogItems } = catalogItemStates()

    return (
        <div className='card-background catalog'>
            <Row catalogTiles={freeBeasts} title={'Free Entries'} />
            <Row catalogTiles={templates} title={'Templates'} />
            <Rows catalogItems={catalogItems}/>
        </div>
    )
}
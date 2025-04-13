import './Catalog.css'

import catalogItemStates from './hooks/catalogItemStates';

import Row from './components/Row';
import Rows from './components/Rows';

export default function Catalog(setLoading: Function) {
    const { templates, freeBeasts, catalogItems } = catalogItemStates()

    setLoading(templates.length === 0 && freeBeasts.length === 0 && catalogItems.length === 0)

    return (
        <div className='card-background catalog'>
            <Row catalogTiles={freeBeasts} title={'Free Entries'} />
            <Row catalogTiles={templates} title={'Templates'} />
            <Rows catalogItems={catalogItems} />
        </div>
    )
}
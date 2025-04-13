import Row from './Row';
import { CatalogTile } from '../catalogInterfaces';

interface Props {
    catalogItems: CatalogTile[][]
}

export default function CatalogRows({ catalogItems }: Props) {
    return (
        <>
            {catalogItems.map((catalogItem: CatalogTile[], index: number) => {
                return <Row key={index} catalogTiles={catalogItem} />
            })}
        </>
    )
}
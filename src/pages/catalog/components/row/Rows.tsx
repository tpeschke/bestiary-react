import { CatalogTile } from '../../catalogInterfaces';
import Row from './Row';

interface Props {
    catalogItems: CatalogTile[][]
}

export default function CatalogRows({ catalogItems }: Props) {
    return (
        <>
            {catalogItems.reduce((filteredArray: any[], catalogItem: CatalogTile[], index: number) => {
                if (catalogItem.length > 0) {
                    filteredArray.push(<Row key={index} catalogTiles={catalogItem} />)
                }
                return filteredArray
            }, [])}
        </>
    )
}
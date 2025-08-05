import { CatalogTile } from "../../catalogInterfaces"
import Row from "../row/Row"

interface Props {
    userIsLoggedIn: boolean,
    favorites: CatalogTile[]
}

export default function FavoritesDisplay({ userIsLoggedIn, favorites }: Props) {
    if (!userIsLoggedIn) {
        return <></>
    }

    return (
        <>
            {favorites.length > 0 ? (
                <Row catalogTiles={favorites} title={'Favorites'} />
            ) : (
                <div className='row'>
                    <h1>Favorites</h1>
                    <div className='tile-row'>
                        <p className='warning paragraph-padding'>You have no Favorites (yet)</p>
                    </div>
                </div>
            )}
        </>
    )
}
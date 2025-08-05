import { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { catalogURL } from '../../../frontend-config';
import { saveCatalog } from '../../../redux/slices/catalogSlice';
export default function catalogItemStates() {
    const templates = useSelector((state) => state.catalog.templates);
    const freeBeasts = useSelector((state) => state.catalog.freeBeasts);
    const favorites = useSelector((state) => state.catalog.favorites);
    const catalogItems = useSelector((state) => state.catalog.catalogItems);
    const updatingCatalogItems = useSelector((state) => state.catalog.updatingCatalogItems);
    const dispatch = useDispatch();
    useEffect(() => {
        if (catalogItems.length === 0) {
            axios.get(catalogURL + '/').then(({ data }) => {
                dispatch(saveCatalog(data));
            });
        }
    }, [catalogItems]);
    return {
        templates,
        freeBeasts,
        catalogItems,
        updatingCatalogItems,
        favorites
    };
}

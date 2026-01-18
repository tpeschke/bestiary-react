import { useEffect } from 'react';
import axios from 'axios';
import { RootState } from '../../../redux/store';
import { useSelector, useDispatch } from 'react-redux'

import { obstacleCatalogURL } from '../../../frontend-config'

import { ObstacleTile } from '@bestiary/common/interfaces/obstacles/obstacleCatalog'

import { saveObstacleCatalog } from '../../../redux/slices/obstacles/obstacleCatalog';

export default function obstacleCatalogHook() {
    const catalogItems: ObstacleTile[][] = useSelector((state: RootState) => state.obstacleCatalog.catalog)

    const dispatch = useDispatch()

    useEffect(() => {
        if (catalogItems.length === 0) {
            axios.get(obstacleCatalogURL + '/').then(({ data }) => {
                dispatch(saveObstacleCatalog(data))
            })
        }
    }, [catalogItems]);

    return {
        catalogItems
    }
}
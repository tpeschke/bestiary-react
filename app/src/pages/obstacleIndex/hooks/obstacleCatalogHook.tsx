import { useEffect } from 'react';
import axios from 'axios';
import { RootState } from '../../../redux/store';
import { useSelector, useDispatch } from 'react-redux'

import { obstacleCatalogURL } from '../../../frontend-config'

import { Challenge, Obstacle, ObstacleTile } from '@bestiary/common/interfaces/obstacles/obstacleCatalog'

import { cacheChallenge, cacheObstacle, saveObstacleCatalog } from '../../../redux/slices/obstacles/obstacleCatalog';

export default function obstacleCatalogHook() {
    const catalogItems: ObstacleTile[][] = useSelector((state: RootState) => state.obstacleCatalog.catalog)
    const obstacleCache: {[key: number]: Obstacle} = useSelector((state: RootState) => state.obstacleCatalog.obstacleCache)
    const challengeCache: {[key: number]: Challenge} = useSelector((state: RootState) => state.obstacleCatalog.challengeCache)

    const dispatch = useDispatch()

    useEffect(() => {
        if (catalogItems.length === 0) {
            axios.get(obstacleCatalogURL + '/').then(({ data }) => {
                dispatch(saveObstacleCatalog(data))
            })
        }
    }, [catalogItems]);

    const saveToCache = (obstacle: Obstacle) => {
        dispatch(cacheObstacle(obstacle))
    }

    const saveChallengeToCache = (challenge: Challenge) => {
        dispatch(cacheChallenge(challenge))
    }

    return {
        catalogItems,
        obstacleCache,
        challengeCache,
        saveToCache,
        saveChallengeToCache
    }
}
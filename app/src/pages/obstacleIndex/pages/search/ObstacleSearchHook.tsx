import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ObstacleTile } from "@bestiary/common/interfaces/obstacles/obstacleCatalog";
import { obstacleSearchCatalogURL } from "../../../../frontend-config";

export default function ObstacleSearchHooks(): ObstacleTile[] | null {
    const [currentQueries, setCurrentQueries] = useState('')
    const [searchResults, setSearchResults] = useState<ObstacleTile[] | null>(null)

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.toString() && currentQueries !== searchParams.toString()) {
            setSearchResults(null)
            setCurrentQueries(searchParams.toString())
            
            axios.get(obstacleSearchCatalogURL + '?' + searchParams.toString()).then(({ data }) => {
                setSearchResults(data)
            })
        }
    }, [searchParams]);

    return searchResults
}
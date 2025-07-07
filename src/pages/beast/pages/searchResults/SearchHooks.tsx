import axios from "axios";

import { SearchResult } from '../../../../../common/interfaces/search'
import { useState, useEffect } from "react";
import { NavigateFunction, useNavigate, useSearchParams } from "react-router-dom";
import { searchURL } from "../../../../frontend-config";
import sortResults from "./utilities/searchSorts";

export type NavigateToRandomResultFunction = (searchResults: SearchResult[], navigate: NavigateFunction) => void

export type SortingOptions = SortingOptionAlphabetical | SortingOptionRarity | 'maxcombat' | 'maxsocial' | 'maxskill' | 'size'
export type SortingOptionRarity = 'rarity'
export type SortingOptionAlphabetical = 'name'
export type SortingDirection = 'asc' | 'dsc'

export interface SortingMethodObject {
    sortingMethod: SortingOptions
    changeMethod: Function
}

export interface SortingDirectionObject {
    sortingDirection: SortingDirection
    toggleDirection: Function
}

interface Return {
    searchResults: SearchResult[],
    navigateToRandomResult: NavigateToRandomResultFunction,
    sortingMethodInfo: SortingMethodObject,
    sortingDirectionInfo: SortingDirectionObject
}

export default function SearchHooks(): Return {
    const [currentQueries, setCurrentQueries] = useState('')
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])

    const [sortingMethod, setSortingMethod] = useState<SortingOptions>('name')
    const [sortingDirection, setSortingDirection] = useState<SortingDirection>('dsc')

    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    useEffect(() => {
        if (currentQueries !== searchParams.toString()) {
            setSearchResults([])
            setCurrentQueries(searchParams.toString())

            axios.get(searchURL + '?' + searchParams.toString()).then(({ data }) => {
                const goDirectlyTo = searchParams.get('goDirectlyTo') === 'true'
                if (goDirectlyTo) {
                    navigateToRandomResult(data, navigate)
                } else {
                    sortAndSetResults(data)
                }
            })
        }
    }, [searchParams]);

    function sortAndSetResults(results: SearchResult[]) {
        const sortedResults: SearchResult[] = results.sort(sortResults(sortingMethod, sortingDirection))
        setSearchResults(sortedResults)
    }

    function navigateToRandomResult(searchResults: SearchResult[], navigate: NavigateFunction) {
        if (searchResults.length > 0) {
            const randomResult = searchResults[Math.floor(Math.random() * searchResults.length)];
            navigate(`/beast/${randomResult.id}`)
        }
    }

    function changeMethod(newMethod: SortingOptions) {
        setSortingDirection('dsc')
        setSortingMethod(newMethod)
        
        const sortedResults: SearchResult[] = searchResults.sort(sortResults(newMethod, 'dsc'))
        setSearchResults(sortedResults)
    }

    function toggleDirection() {
        let newDirection: SortingDirection = 'asc'
        if (sortingDirection === 'dsc') {
            setSortingDirection(newDirection)
        } else {
            newDirection = 'dsc'
            setSortingDirection(newDirection)
        }
        const sortedResults: SearchResult[] = searchResults.sort(sortResults(sortingMethod, newDirection))
        setSearchResults(sortedResults)
    }

    return {
        searchResults,
        navigateToRandomResult,
        sortingMethodInfo: {
            sortingMethod,
            changeMethod
        },
        sortingDirectionInfo: {
            sortingDirection,
            toggleDirection
        }
    }
}
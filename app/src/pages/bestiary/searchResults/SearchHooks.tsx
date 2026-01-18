import axios from "axios";

import { useState, useEffect } from "react";
import { NavigateFunction, useNavigate, useSearchParams } from "react-router-dom";
import sortResults from "./utilities/searchSorts";
import { SearchResult } from '@bestiary/common/interfaces/search'
import { searchURL } from "../../../frontend-config";

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
    searchResults: SearchResult[] | null,
    navigateToRandomResult: NavigateToRandomResultFunction,
    sortingMethodInfo: SortingMethodObject,
    sortingDirectionInfo: SortingDirectionObject
}

export default function SearchHooks(): Return {
    const [currentQueries, setCurrentQueries] = useState('')
    const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null)

    const [sortingMethod, setSortingMethod] = useState<SortingOptions>('name')
    const [sortingDirection, setSortingDirection] = useState<SortingDirection>('dsc')

    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    useEffect(() => {
        if (searchParams.toString() && currentQueries !== searchParams.toString()) {
            setSearchResults(null)
            setCurrentQueries(searchParams.toString())

            axios.get(searchURL + '?' + searchParams.toString()).then(({ data }) => {
                const goDirectlyTo = searchParams.get('goDirectlyTo') === 'true'
                if (goDirectlyTo) {
                    navigateToRandomResult(data, navigate)
                } else {
                    sortAndSetResults(data)
                }
            })
        } else if (!searchParams.toString()) {
            sortAndSetResults([])
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
        if (searchResults) {
            setSortingDirection('dsc')
            setSortingMethod(newMethod)

            const sortedResults: SearchResult[] = searchResults.sort(sortResults(newMethod, 'dsc'))
            setSearchResults(sortedResults)
        }
    }

    function toggleDirection() {
        if (searchResults) {
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
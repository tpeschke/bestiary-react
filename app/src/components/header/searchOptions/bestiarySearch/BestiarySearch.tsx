import { useState, useEffect } from "react";
import { useNavigate, useLocation, createSearchParams } from "react-router-dom";
import Icon from "../../../icon/Icon";
import AdvancedSearch from "../advancedSearch/AdvancedSearch";
import { QueryArrayParams, QueryBasicParams, QueryParams, QueryParamsObject } from "../advancedSearch/interfaces/SearchInterfaces";
import SearchStatusHook from "../../../../hooks/SearchStatusHook";

interface Props {
    clearInputs: () => void,
    clearSelects: () => void
}

export default function BestiarySearch({ clearInputs, clearSelects }: Props) {
    const { isOnSearch } = SearchStatusHook()
    
    const [timeoutID, setTimeoutID] = useState<any | null>(null)

    const [queryParams, setQueryParams] = useState<QueryParamsObject>({})

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!isOnSearch) {
            clearInputs()
            clearSelects()
        }
    }, [isOnSearch])

    useEffect(() => {
        handleOldStyleLinks()
    }, [location])

    function handleOldStyleLinks() {
        const splitURL = location.pathname.split(';')
        if (splitURL.length > 1) {
            let queryParams: any = {}

            splitURL.forEach(urlSection => {
                const [param, value] = urlSection.split('=')
                if (value) {
                    queryParams[param] = value
                }
            })

            navigate({
                pathname: '/search',
                search: createSearchParams(queryParams).toString()
            })
        }
    }

    function captureQueryArray(param: QueryArrayParams, id: number, checked: boolean) {
        let currentArray: number[] = [];

        if (queryParams[param]) {
            currentArray = [...queryParams[param]]
        }

        if (checked) {
            currentArray.push(id)
        } else {
            const indexToRemove = currentArray.indexOf(id)
            currentArray.splice(indexToRemove, 1)
        }

        let newQueryParams: QueryParamsObject = { ...queryParams }
        if (currentArray.length === 0) {
            delete newQueryParams[param]
        } else {
            newQueryParams[param] = currentArray
        }

        debounceQuery(newQueryParams, param)
    }

    function captureQuery(param: QueryBasicParams, value: string) {
        if (timeoutID) { clearTimeout(timeoutID) }

        let newQueryParams: QueryParamsObject = { ...queryParams }
        if (value === 'none' || value === '' || !value) {
            delete newQueryParams[param]
        } else {
            newQueryParams[param] = value
        }

        debounceQuery(newQueryParams, param)
    }

    function debounceQuery(newQueryParams: any, param: QueryParams) {
        setQueryParams(newQueryParams)

        const newTimeoutID = setTimeout(() => {
            if (queryParams[param] !== newQueryParams[param]) {
                navigate({
                    pathname: '/search',
                    search: createSearchParams(newQueryParams).toString()
                })
            }
        }, 1000)
        setTimeoutID(newTimeoutID)
    }
    
    return (
        <span>
            <Icon iconName='magnifying-glass' margin='right' color='black' />
            <input onChange={e => captureQuery('name', e.target.value)} placeholder='Search by Entry Name' />
            <AdvancedSearch captureQuery={captureQuery} captureQueryArray={captureQueryArray} />
        </span>
    )
}
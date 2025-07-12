import './SearchOptions.css'

import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'

import Icon from '../../icon/Icon'
import { useEffect, useState } from 'react'
import AdvancedSearch from './advancedSearch/AdvancedSearch'
import { QueryParamsObject, QueryArrayParams, QueryBasicParams, QueryParams } from './advancedSearch/interfaces/SearchInterfaces'

export default function SearchOptions() {
    const [isOnSearch, setIsOnSearch] = useState(false)
    const [timeoutID, setTimeoutID] = useState<any | null>(null)

    const [queryParams, setQueryParams] = useState<QueryParamsObject>({})

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        handleOldStyleLinks()

        if (location.pathname === '/search') {
            setIsOnSearch(true)
        } else if (isOnSearch) {
            setIsOnSearch(false)
            clearInputs()
            clearSelects()
        }
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

    function clearInputs() {
        const inputs = document.getElementsByClassName('search-options-shell')[0].querySelectorAll('input');
        inputs.forEach(input => input.value = '')
        inputs.forEach(input => input.checked = false)
    }

    function clearSelects() {
        const selects = document.getElementsByClassName('search-options-shell')[0].querySelectorAll('select');
        selects.forEach(input => input.value = 'none')
    }

    return (
        <div className='search-options-shell'>
            <span>
                <Icon iconName='magnifying-glass' margin='right' color='black' />
                <input onChange={e => captureQuery('name', e.target.value)} placeholder='Search by Name' />
                <AdvancedSearch captureQuery={captureQuery} captureQueryArray={captureQueryArray} />
            </span>
        </div>
    )
}
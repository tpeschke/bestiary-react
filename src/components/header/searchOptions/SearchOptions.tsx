import './SearchOptions.css'

import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'

import Icon from '../../icon/Icon'
import { useEffect, useState } from 'react'
import AdvancedSearch from './advancedSearch/AdvancedSearch'

export type CaptureQueryFunction = (param: QueryParams, value: string) => void

type QueryParamsObject = {
    name?: string,
    body?: string,
    size?: string,
    rarity?: string,
    access?: string
}

export type QueryParams = keyof QueryParamsObject

export default function SearchOptions() {
    const [isOnSearch, setIsOnSearch] = useState(false)
    const [timeoutID, setTimeoutID] = useState<any | null>(null)

    const [queryParams, setQueryParams] = useState<QueryParamsObject>({})

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/search') {
            setIsOnSearch(true)
        } else if (isOnSearch) {
            setIsOnSearch(false)
            clearInputs()
        }
    }, [location])

    function captureQuery(param: QueryParams, value: string) {
        if (timeoutID) { clearTimeout(timeoutID) }

        let newQueryParams: QueryParamsObject = { ...queryParams }
        if (value === 'none' || value === '') {
            delete newQueryParams[param]
        } else {
            newQueryParams[param] = value
        }

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
    }

    return (
        <div className='search-options-shell'>
            <span>
                <Icon iconName='magnifying-glass' margin='right' color='black' />
                <input onChange={e => captureQuery('name', e.target.value)} placeholder='Search by Name' />
                <AdvancedSearch captureQuery={captureQuery} />
            </span>
        </div>
    )
}
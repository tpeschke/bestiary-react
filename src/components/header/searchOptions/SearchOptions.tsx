import './SearchOptions.css'

import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'

import Icon from '../../icon/Icon'
import { useEffect, useState } from 'react'
import AdvancedSearch from './advancedSearch/AdvancedSearch'

export type CaptureQueryFunction = (param: string, value: string) => void

export default function SearchOptions() {
    const [isOnSearch, setIsOnSearch] = useState(false)
    const [timeoutID, setTimeoutID] = useState<any | null>(null)

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

    function captureQuery(param: string, value: string) {
        if (timeoutID) { clearTimeout(timeoutID) }

        const newTimeoutID = setTimeout(() => {
            if (value) {
                navigate({
                    pathname: '/search',
                    search: createSearchParams({ [param]: value }).toString()
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
                <AdvancedSearch captureQuery={captureQuery}/>
            </span>
        </div>
    )
}
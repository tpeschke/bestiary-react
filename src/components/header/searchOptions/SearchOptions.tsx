import './SearchOptions.css'

import { createSearchParams, useNavigate } from 'react-router-dom'

import Icon from '../../icon/Icon'
import { useState } from 'react'

export default function SearchOptions() {
    const [timeoutID, setTimeoutID] = useState<any | null>(null)

    const navigate = useNavigate()

    function captureQuery(value: string) {
        if (timeoutID) {clearTimeout(timeoutID)}

        const newTimeoutID = setTimeout(() => {
            if (value) {
                navigate({
                    pathname: '/search',
                    search: createSearchParams({name: value}).toString()
                })
            }
        }, 1000)
        setTimeoutID(newTimeoutID)
    }

    return (
        <div className='search-options-shell'>
            <span>
                <Icon iconName='magnifying-glass' margin='right' color='black' />
                <input onChange={e => captureQuery(e.target.value)} placeholder='Search by Name'/>
            </span>
        </div>
    )
}
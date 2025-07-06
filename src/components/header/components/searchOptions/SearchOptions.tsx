import './SearchOptions.css'

import { createSearchParams, useNavigate } from 'react-router-dom'

import Icon from '../../../icon/Icon'

export default function SearchOptions() {
    const navigate = useNavigate()

    function captureQuery(value: string) {
        if (value) {
            navigate({
                pathname: '/search',
                search: createSearchParams({name: value}).toString()
            })
        }
    }
    
    return (
        <div className='search-options-shell'>
            <span>
                <Icon iconName='magnifying-glass' margin='right' color='black' />
                <input onBlur={e => captureQuery(e.target.value)} placeholder='Search by Name' />
            </span>
        </div>
    )
}
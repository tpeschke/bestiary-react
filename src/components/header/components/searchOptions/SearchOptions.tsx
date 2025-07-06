import './SearchOptions.css'

import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'

import Icon from '../../../icon/Icon'

export default function SearchOptions() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();

    function captureQuery(value: string) {
        if (value) {
            navigate({
                pathname: '/search',
                search: createSearchParams({name: value}).toString()
            })
        }
    }

    const nameParam: string = getStringValueFromParam(searchParams.get('name'))
    
    return (
        <div className='search-options-shell'>
            <span>
                <Icon iconName='magnifying-glass' margin='right' color='black' />
                <input onBlur={e => captureQuery(e.target.value)} placeholder='Search by Name' value={nameParam} />
            </span>
        </div>
    )
}

function getStringValueFromParam(paramValue: string | null): string {
    return paramValue ? paramValue : ''
}
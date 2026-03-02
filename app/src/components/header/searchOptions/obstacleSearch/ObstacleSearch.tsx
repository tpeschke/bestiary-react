import { useState, useEffect } from "react";
import { useNavigate, useLocation, createSearchParams } from "react-router-dom";
import Icon from "../../../icon/Icon";
import SearchStatusHook from "../../../../hooks/SearchStatusHook";

export interface QueryObstacleParamsObject {
    keyword?: string,
    type?: string
}

export type BasicObstacleParams = keyof QueryObstacleParamsObject

interface Props {
    clearInputs: () => void,
    clearSelects: () => void
}

export default function ObstacleSearch({ clearInputs, clearSelects }: Props) {
    const { isOnSearch } = SearchStatusHook()

    const [timeoutID, setTimeoutID] = useState<any | null>(null)

    const [queryParams, setQueryParams] = useState<QueryObstacleParamsObject>({})

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!isOnSearch) {
            clearInputs()
            clearSelects()
        }
    }, [isOnSearch])

    function captureQuery(param: BasicObstacleParams, value: string) {
        if (timeoutID) { clearTimeout(timeoutID) }

        let newQueryParams: QueryObstacleParamsObject = { ...queryParams }
        if (value === 'none' || value === '' || !value) {
            delete newQueryParams[param]
        } else {
            newQueryParams[param] = value
        }

        debounceQuery(newQueryParams, param)
    }

    function debounceQuery(newQueryParams: any, param: BasicObstacleParams) {
        setQueryParams(newQueryParams)

        const newTimeoutID = setTimeout(() => {
            if (queryParams[param] !== newQueryParams[param]) {
                navigate({
                    pathname: 'obstacles/search',
                    search: createSearchParams(newQueryParams).toString()
                })
            }
        }, 1000)
        setTimeoutID(newTimeoutID)
    }

    return (
        <span>
            <Icon iconName='magnifying-glass' margin='right' color='black' />
            <input onChange={e => captureQuery('keyword', e.target.value)} placeholder='Search by Key Word' />
            <div>
                <span>
                    <input type="checkbox" />
                    <p>All</p>
                </span>
            </div>
        </span>
    )
}
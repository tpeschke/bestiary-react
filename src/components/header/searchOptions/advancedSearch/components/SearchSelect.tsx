import { QueryParams } from "../../SearchOptions"
import { StopPropagationAndCaptureQuery } from "../AdvancedSearchInnards"
import { SearchObject } from "../utilities/searchDictionaries"

interface Props {
    stopPropagationAndCaptureQuery: StopPropagationAndCaptureQuery,
    param: QueryParams,
    dictionary: SearchObject[] | string[]
}

export default function SearchSelect({ stopPropagationAndCaptureQuery, param, dictionary }: Props) {
    return (
        <select onChange={event => stopPropagationAndCaptureQuery(param, event)}>
            <option value='none'>I Don't Care</option>
            {dictionary.map((value: SearchObject | string, index: number) => {
                if (typeof value === 'string') {
                    return <option key={index} value={value}>{value}</option>
                } else {
                    return <option key={index} value={value.id}>{value.value}</option>
                }
            })}
        </select>
    )
}
import './DrawerSearch.css'

import Checkbox from "../../../../../checkbox/Checkbox";
import { climateSearchDictionary } from "../../utilities/searchDictionaries";

interface Props {
    stopPropagationAndCaptureQueryFromCheckBoxForArray: Function
}

export default function ClimateSearch({ stopPropagationAndCaptureQueryFromCheckBoxForArray }: Props) {
    return (
        <>
            {climateSearchDictionary.map(({ id, code, climate, examples }, index) => {
                const tooltip = `${examples}${code ? '\nKöppen Climate Classification: ' + code : ''}`
                return (
                    <Checkbox key={index} label={climate} onClick={stopPropagationAndCaptureQueryFromCheckBoxForArray('climate', id)} tooltip={tooltip} />
                )
            })}
        </>
    )
}
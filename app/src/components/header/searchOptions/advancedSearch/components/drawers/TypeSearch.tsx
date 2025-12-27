import './DrawerSearch.css'

import { typeSearchDictionary } from "../../utilities/searchDictionaries";
import Checkbox from '../../../../../checkbox/Checkbox';

interface Props {
    stopPropagationAndCaptureQueryFromCheckBoxForArray: Function
}

export default function TypeSearch({ stopPropagationAndCaptureQueryFromCheckBoxForArray }: Props) {
    return (
        <>
            {typeSearchDictionary.map(({ id, value }, index) => {
                return <Checkbox key={index} label={value} onClick={stopPropagationAndCaptureQueryFromCheckBoxForArray('types', id)} />
            })}
        </>
    )
}
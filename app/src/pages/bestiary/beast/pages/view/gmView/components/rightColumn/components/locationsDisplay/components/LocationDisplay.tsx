import './LocationDisplay.css'

import { Location } from '../../../../../../../../interfaces/infoInterfaces/linkedInfoInterfaces'

interface Props {
    locationInfo: Location
}

export default function LocationDisplay({ locationInfo }: Props) {
    const { location, link } = locationInfo
    return (
        <a href={link} target='_blank'>
            <button className='location-display'>{location}</button>
        </a>
    )
}
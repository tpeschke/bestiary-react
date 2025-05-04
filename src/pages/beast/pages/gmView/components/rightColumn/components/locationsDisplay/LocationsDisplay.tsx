import Body from "../../../../../../components/UI/body/Body"
import { Location } from "../../../../../../interfaces/infoInterfaces.ts/linkedInfoInterfaces"
import LocationDisplay from "./components/LocationDisplay"

interface Props {
    locationsInfo: Location[]
}

export default function LocationsDisplay({ locationsInfo }: Props) {

    return (
        <div className='variants-shell'>
            <h2 className='border'>Locations & Adventures</h2>
            <Body>
                <div>
                    {locationsInfo.map((location, index) => <LocationDisplay key={index} locationInfo={location} />)}
                </div>
            </Body>
        </div>
    )
}
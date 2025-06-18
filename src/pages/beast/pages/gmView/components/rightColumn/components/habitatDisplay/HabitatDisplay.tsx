import { Scenario } from '../../../../../../interfaces/infoInterfaces/generalInfoInterfaces'

import ScenarioDisplay from './components/ScenariosDisplay/ScenarioDisplay'
import InfoDisplay from '../infoDisplay/InfoDisplay'

interface Props {
    info: string,
    scenarios: Scenario[]
}

export default function HabitatDisplay({ info, scenarios }: Props) {

    return (
        <>
            <InfoDisplay section="Habitat / Society" info={info} />
            {scenarios.length > 0 &&
                <ScenarioDisplay scenarios={scenarios} />
            }
        </>
    )
}
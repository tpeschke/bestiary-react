import { Scenario } from '../../../../../../interfaces/infoInterfaces/generalInfoInterfaces'

import Body from '../../../../../../components/UI/body/Body'

interface Props {
    scenarios: Scenario[]
}

export default function ScenarioDisplay({ scenarios }: Props) {

    return (
        <>
            <h3>Scenarios</h3>
            <Body>
                <ul>
                    {scenarios.map(({ scenario }: Scenario, index) => {
                        return (
                            <li key={index}>
                                {scenario}
                            </li>
                        )
                    })}
                </ul>
            </Body>
        </>
    )
}
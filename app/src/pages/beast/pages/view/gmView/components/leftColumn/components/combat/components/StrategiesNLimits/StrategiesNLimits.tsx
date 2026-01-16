import { StrategyNLimits } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import Body from "../../../../../../../../../components/UI/body/Body"
import HTMLDisplay from "../../../../../../../../../components/UI/htmlDisplay/htmlDisplay"

interface Props {
    strategiesNLimits: StrategyNLimits[] | undefined
}

export default function StrategiesNLimits({ strategiesNLimits }: Props) {

    function formatDiminish(diminish: number | null) {
        if (!diminish) {
            return '+0'
        } else if (diminish > 0) {
            return `+${diminish}`
        }
        return diminish
    }

    function returnDashIfNull(value: number | string | null) {
        if (value) {
            return value
        }
        return '-'
    }

    return (
        <>
            <br />
            <h2 className="border">Strategies & Limits</h2>
            <Body>
                <table className="light-weight-table">
                    <thead>
                        <tr>
                            <th>Group</th>
                            <th className="center-text">Chaos</th>
                            <th className="center-text">Diminish</th>
                            <th className="center-text">Strategies</th>
                            <th className="center-text">Baseline Strategies</th>
                            <th>Treasure</th>
                        </tr>
                    </thead>
                    <tbody>
                        {strategiesNLimits && strategiesNLimits.map(({ group, chaos, chaosNote, diminish, strategies, strategiesNote, baselineStrategies, treasure }, index) => {
                            return (
                                <tr key={index} >
                                    <td>{group}</td>
                                    <td className="center-text">{returnDashIfNull(chaos)}{chaosNote ? '*' : ''}</td>
                                    <td className="center-text">{formatDiminish(diminish)}</td>
                                    <td className="center-text">{returnDashIfNull(strategies)}{strategiesNote ? '*' : ''}</td>
                                    <td className="center-text">{returnDashIfNull(baselineStrategies)}</td>
                                    <td>{returnDashIfNull(treasure)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Body>
        </>
    )
}
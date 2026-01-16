import { StrategyNLimits } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import Body from "../../../../../../../../../components/UI/body/Body"
import HTMLDisplay from "../../../../../../../../../components/UI/htmlDisplay/htmlDisplay"
import { Link } from "react-router-dom"

interface Props {
    strategiesNLimits: StrategyNLimits[] | undefined,
    limitNotes: string
}

export default function StrategiesNLimits({ strategiesNLimits, limitNotes }: Props) {

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

    const chaosNDiminishTooltip = 'Chaos and Diminish limits are both explained in R.2 on the SRD.'
    const strategiesTooltip = 'This is the base number of Strategies that this group can employ in response to the players\'s actions. See below for options.'
    const baselineStrategiesTooltip = 'This is base number of Strategies that this group has already employed in / near their base of operations.'
    const treasureTooltip = 'See the Treasure page (via the chest icon in the header) for more info\n(or just click since this is a link to it).'

    return (
        <>
            <br />
            <h2 className="border">Strategies & Limits</h2>
            <Body>
                <>
                    <table className="light-weight-table">
                        <thead>
                            <tr>
                                <th>Group</th>
                                <th className="center-text">
                                    <a data-tooltip-id="my-tooltip" data-tooltip-content={chaosNDiminishTooltip} href="https://bonfire.stone-fish.com/rules/2#gm-during-rests" target="_blank">
                                        Chaos
                                    </a>
                                </th>
                                <th data-tooltip-id="my-tooltip" data-tooltip-content={chaosNDiminishTooltip} className="center-text">
                                    <a data-tooltip-id="my-tooltip" data-tooltip-content={chaosNDiminishTooltip} href="https://bonfire.stone-fish.com/rules/2#gm-during-rests" target="_blank">
                                        Diminish
                                    </a>
                                </th>
                                <th data-tooltip-id="my-tooltip" data-tooltip-content={strategiesTooltip} className="center-text">Strategies</th>
                                <th data-tooltip-id="my-tooltip" data-tooltip-content={baselineStrategiesTooltip} className="center-text">Baseline Strategies</th>
                                <th>
                                    <Link to="/treasure" data-tooltip-id="my-tooltip" data-tooltip-content={treasureTooltip}>
                                        Treasure
                                    </Link>
                                </th>
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
                        
                    <br/>
                    <HTMLDisplay html={limitNotes} />
                </>
            </Body>
        </>
    )
}
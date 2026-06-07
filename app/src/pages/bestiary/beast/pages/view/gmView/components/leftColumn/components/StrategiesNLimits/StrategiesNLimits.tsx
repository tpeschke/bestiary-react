import { StrategyNLimits } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import Body from "../../../../../../../components/UI/body/Body"
import HTMLDisplay from "../../../../../../../components/UI/htmlDisplay/htmlDisplay"
import { Link } from "react-router-dom"
import { getSystemPreference } from "../../../../../../../../../../redux/slices/userSlice"
import { useSelector } from "react-redux"
import { BONFIRE, HACKMASTER } from "@bestiary/common/utilities/get/getSystemString"

interface Props {
    strategiesNLimits: StrategyNLimits[] | undefined,
    limitNotes: string
}

export default function StrategiesNLimits({ strategiesNLimits, limitNotes }: Props) {
    const systemPreference = useSelector(getSystemPreference) as 0 | 1 | 2 | undefined
    const isBonfire = systemPreference === BONFIRE

    function formatDiminish(diminish: number | null) {
        if (systemPreference === HACKMASTER) {
            return formatHackMasterDiminish(diminish)
        }

        return formatBonfireDiminish(diminish)
    }

    function formatBonfireDiminish(diminish: number | null) {
        if (!diminish) {
            return '+0'
        } else if (diminish > 0) {
            return `+${diminish}`
        }
        return diminish
    }

    function formatHackMasterDiminish(diminish: number | null) {
        if (!diminish) {
            return '50%'
        }

        const diminishPercentDictionary = [
            '10%', // -3
            '35%', // -2
            '35%', // -1
            '50%', // 0
            '75%', // 1
            '85%', // 2
            '95%', // 3
        ]

        return diminishPercentDictionary[diminish + 3]
    }

    function returnDashIfNull(value: number | string | null) {
        if (value) {
            return value
        }
        return '-'
    }

    const chaosNDiminishTooltip = 'Chaos and Diminish limits are explained in R.2 on the SRD.'

    const chaosTooltip = isBonfire ? chaosNDiminishTooltip : 'This is the number of enemies that need to be killed to trigger a Diminish Check.'
    const diminishTooltip = isBonfire ? chaosNDiminishTooltip : 'This is the chance of the Diminish Check being successful.'

    const strategiesTooltip = 'This is the base number of Strategies that this group can employ in response to the players\'s actions. See below for options.'
    const baselineStrategiesTooltip = 'This is base number of Strategies that this group has already employed in / near their base of operations.'
    const treasureTooltip = 'See the Treasure page (via the chest icon in the header) for more info\n(or just click since this is a link to it).'

    if (strategiesNLimits?.length === 0) {
        return <></>
    }

    return (
        <>
            <br />
            <h2 className="border">Strategies & Limits</h2>
            {!isBonfire && <em>Hover the title of each column to learn more about it.</em>}
            <Body>
                <table className="light-weight-table">
                    <thead>
                        <tr>
                            <th>Group</th>
                            <th data-tooltip-id="my-tooltip" data-tooltip-content={chaosTooltip} className="center-text">
                                {isBonfire ? (
                                    <a href="https://bonfire.stone-fish.com/rules/2#gm-during-rests" target="_blank">
                                        Chaos
                                    </a>
                                ) : (
                                    'Chaos'
                                )}
                            </th>
                            <th data-tooltip-id="my-tooltip" data-tooltip-content={diminishTooltip} className="center-text">
                                {isBonfire ? (
                                    <a href="https://bonfire.stone-fish.com/rules/2#gm-during-rests" target="_blank">
                                        Diminish
                                    </a>
                                ) : (
                                    'Diminish'
                                )}
                            </th>
                            <th data-tooltip-id="my-tooltip" data-tooltip-content={strategiesTooltip} className="center-text">Strategies</th>
                            <th data-tooltip-id="my-tooltip" data-tooltip-content={baselineStrategiesTooltip} className="center-text">Baseline Strategies</th>
                            <th data-tooltip-id="my-tooltip" data-tooltip-content={treasureTooltip}>
                                <Link to="/treasure">
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
                                    <td className="center-text">{returnDashIfNull(strategies)}{strategiesNote ? chaosNote ? '**' : '*' : ''}</td>
                                    <td className="center-text">{returnDashIfNull(baselineStrategies)}</td>
                                    <td>{returnDashIfNull(treasure)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <br />
                <HTMLDisplay html={limitNotes} />
            </Body>
        </>
    )
}
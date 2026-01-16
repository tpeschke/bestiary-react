import { StrategyNLimits } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { UpdateFunction } from "../../../../../../hooks/updateUtilities/interfaces/updateInterfaces"

interface Props {
    strategiesNLimits: StrategyNLimits[] | undefined,
    updateCombatInfo: UpdateFunction
}

export default function StrategyEdit({ strategiesNLimits, updateCombatInfo }: Props) {

    function updateStrategies(indexToChange: number, key: string, value: string | number) {
        const alteredStrategies = strategiesNLimits?.map((strategy, index) => {
            if (index === indexToChange) {
                return {
                    ...strategy,
                    [key]: value
                }
            }
            return strategy
        })

        updateCombatInfo('strategiesNLimits', alteredStrategies)
    }

    function updateStrategiesOnClick(indexToChange: number, key: string, event: any) {
        const {checked} = event.target

        const alteredStrategies = strategiesNLimits?.map((strategy, index) => {
            if (index === indexToChange) {
                return {
                    ...strategy,
                    [key]: checked
                }
            }
            return strategy
        })

        updateCombatInfo('strategiesNLimits', alteredStrategies)
    }

    return (
        <>
            <h2 className="border">Limits by Group</h2>
            <table>
                <thead>
                    <tr>
                        <th>Group</th>
                        <th className="center-text">Chaos</th>
                        <th className="center-text">Chaos Note?</th>
                        <th className="center-text">Diminish</th>
                        <th className="center-text">Strategies</th>
                        <th className="center-text">Strategies Note?</th>
                        <th className="center-text">Baseline Strategies</th>
                        <th>Treasure</th>
                    </tr>
                </thead>
                <tbody>
                    {strategiesNLimits && strategiesNLimits.map(({ group, chaos, chaosNote, diminish, strategies, strategiesNote, baselineStrategies, treasure }, index) => {
                        return (
                            <tr key={index} >
                                <td>{group}</td>
                                <td className="center-text"><input type="number" onChange={event => updateStrategies(index, 'chaos', +event.target.value)} value={chaos ?? 0} /></td>
                                <td className="center-text"><input type="checkbox" defaultChecked={chaosNote} onClick={event => updateStrategiesOnClick(index, 'chaosNote', event)} /></td>
                                <td className="center-text"><input type="number" onChange={event => updateStrategies(index, 'diminish', +event.target.value)} value={diminish ?? 0} /></td>
                                <td className="center-text"><input type="text" onChange={event => updateStrategies(index, 'strategies', event.target.value)} value={strategies ?? ""} /></td>
                                <td className="center-text"><input type="checkbox" defaultChecked={strategiesNote} /></td>
                                <td className="center-text"><input type="text" onChange={event => updateStrategies(index, 'baselineStrategies', event.target.value)} value={baselineStrategies ?? ""} /></td>
                                <td><input type="text" onChange={event => updateStrategies(index, 'treasure', event.target.value)} value={treasure ?? ""} /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <h2 className="border">Strategies</h2>
            Obstacles
            Skill Challenges
            Common Allies
            Other
        </>
    )
}
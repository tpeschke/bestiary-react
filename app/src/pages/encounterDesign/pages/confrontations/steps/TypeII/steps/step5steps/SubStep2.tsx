import Icon from "../../../../../../../../components/icon/Icon"
import formatSkulls from "../../../../../../utilities/FormatSkulls"

export default function SubStep2() {
    const ranksForSkulls = [
        [0, 1, 3, 6, 9, 9],
        [0, 1, 3, 6, 9, 9],
        [0, 1, 4, 7, 11, 11],
        [0, 1, 4, 7, 11, 11],
        [0, 1, 4, 8, 12, 12],
        [0, 1, 4, 8, 12, 12],
        [0, 1, 5, 10, 15, 15]
    ]

    const numberConvictionReputation = [
        [2, 1],
        [2, 1],
        [3, 2],
        [3, 2],
        [4, 2],
        [4, 3],
        [5, 3]
    ]

    return (
        <div>
            <table className="float-right">
                <thead>
                    <tr>
                        <th> </th>
                        <th colSpan={4}>Ranks</th>
                    </tr>
                    <tr>
                        <th>Skull Rating</th>
                        <th>Suite</th>
                        <th>Conviction</th>
                        <th>Relationship</th>
                        <th>Reputation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{<Icon iconName="skull-outline" iconSize='h2' />}</th>
                        <td>0</td>
                        <td>1</td>
                        <td>-1</td>
                        <td>0</td>
                    </tr>
                    {ranksForSkulls.map((ranks, index) => {
                        const [suite, conviction, relationship, reputation] = ranks
                        return (
                            <tr key={index}>
                                <th>{formatSkulls(index + 1)}</th>
                                <td>{suite}</td>
                                <td>{conviction}</td>
                                <td>{relationship}</td>
                                <td>{reputation}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <h1>Social Skill Suites</h1>
            <p>You’ll want a strong Suite and a weak Suite. Count the strong Suite at +2 Ranks and the weak Suite as -2 Ranks. The other 2 Suites will use the base Rank.</p>
            <h2>Descriptions</h2>
            <p>You might also include a few specific Descriptions (generally 1 - 3 for a basic NPC). These should provide a bonus equal to half the base Suite’s Rank or +1, whichever is higher.</p>
            <h1>Convictions</h1>
            <p>Refer to the following table for the baseline Convictions an NPC will have.</p>
            <p>Especially smart NPCs will have 2 more Convictions than average; dumb NPCs, -1 (minimum 0).</p>

            <table className="float-right">
                <thead>
                    <tr>
                        <th>Skull Rating</th>
                        <th>Convic Num</th>
                        <th>Rep Num</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{<Icon iconName="skull-outline" iconSize='h2' />}</th>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    {ranksForSkulls.map((ranks, index) => {
                        const [conviction, reputation] = ranks
                        return (
                            <tr key={index}>
                                <th>{formatSkulls(index + 1)}</th>
                                <td>{conviction}</td>
                                <td>{reputation}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <h1>Relationships</h1>
            <p>Applicable Relationships can make a Confrontation way easier or way harder so apply judiciously.</p>
            <h1>Reputations</h1>
            <p>Only unique NPCs should have Reputations; weirdos, lieutenants, bosses, captains, etc.</p>
            <p>Refer to the following table to determine the number:</p>
            <h1>Other Stats</h1>
            <p>Finally, you might sketch out other applicable stats. Temperaments for NPCs are the obvious one but you might also include a few other Skills if the NPC is good at Lecturing.</p>
            <p><strong>For Temperaments</strong>, if you’ve already made the NPC, they should already be defined. Otherwise, you can roll random on the following table:</p>

            <table>
                <tbody>
                    <tr>
                        <td>1 - 2</td>
                        <td>Very Low</td>
                    </tr>
                    <tr>
                        <td>3 - 4</td>
                        <td>Low</td>
                    </tr>
                    <tr>
                        <td>5 - 6</td>
                        <td>Medium</td>
                    </tr>
                    <tr>
                        <td>7 - 8</td>
                        <td>High</td>
                    </tr>
                    <tr>
                        <td>9 - 10</td>
                        <td>Very High</td>
                    </tr>
                </tbody>
            </table>

            <p><strong>For Skills</strong>, you can use the Suite Ranks column, although you might adjust the Skull Rating to reflect the NPC’s Skill Skull Rating.</p>
        </div>
    )
}
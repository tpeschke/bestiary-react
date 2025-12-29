export default function Example() {
    return (
        <div className="italic">
            <h1>Capacity</h1>
            <p>So, our captain’s Capacity looks like this:</p>

            <table>
                <thead>
                    <tr>
                        <th>No And</th>
                        <th>No</th>
                        <th>No But</th>
                        <th>Yes But</th>
                        <th>Yes</th>
                        <th>Yes And</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>&lt;0</td>
                        <td>≤1</td>
                        <td>≤3</td>
                        <td>≤6</td>
                        <td>≤9</td>
                        <td>&gt;9</td>
                    </tr>
                </tbody>
            </table>

            <p>But our additional brainstorm for each looks like:</p>
            <br />
            <p><strong>No And</strong> The captain spreads rumors of the nature of the characters and the sellers increase their prices.</p>
            <p><strong>No But</strong> The captain won’t provide the Safehouse but put in a good word for them at the inn.</p>
            <p><strong>Yes But</strong> The captain will provide a Safehouse but at a 50% discount of what the normal price would be to stay at the inn.</p>
            <p><strong>Yes And</strong> The captain will provide a Safehouse, for free, and talk to the smith, providing them a discount when repairing their gear.</p>
            <h1>Social Skill Suites</h1>
            <p>The captain has a base Rank of 4. We’ll say he’s good at Intimidation (giving him a Rank 6 in that) but bad at Lecturing (giving him a Rank 2 in that).</p>
            <p>We probably want to give him at least 2 Descriptions: Imposing and Methodical - both under Intimidation.</p>
            <h1>Convictions</h1>
            <p>He’s got 2 Convictions, both with a base Rank of 2. I’m going to give him something related to his job (“I’m the shield of this village”) and something related to the world in general (“Outsiders are untrustworthy”).</p>
            <h1>Relationships</h1>
            <p>His base Relationship Rank is 1. I’m going to give him one relating to a specific person in the village because it gives players something to use if they look for it. The easiest would be that he’s in love with the smith.</p>
            <h1>Reputations</h1>
            <p>The captain is a unique NPC so he’s going to get 1 Reputation at Rank 4. Based on what we know of him, it’ll probably be something along the lines of “Does his job”.</p>
            <h1>Other Stats</h1>
            <p>I’m going to roll randomly for his Temperaments except Work-ethic because I think we’ve defined somebody who has a decently high one.</p>
            <p>Additionally, I’d probably give him some Combat Skills but I’ll give him a 2 Skull Combat Rating to represent the fact that he grew up on the borderland so he’s tougher than your average guard.</p>
        </div>
    )
}
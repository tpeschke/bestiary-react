import Icon from "../../../../../components/icon/Icon";
import formatSkulls from "../../../utilities/FormatSkulls";

export default function Step4() {
    return (
        <div>
            <p>For each step, list out possible Boons and Complications.</p>
            <p>You can do this but referencing question 2 and 3 of the previous step but also thinking all the ways the characters could partial failure or succeed with flying colors</p>
            <p>You can also review the following list and then attach an in-world explanation: don’t just write ‘Expend additional Resourceses: 1d6! Damage’. Instead note “Trip on rock and smash knee: 1d6! Damage’. This makes it easier to weave into what’s going on and allow the player to try and mitigate it. It might also inspire you: “Trip on rock, smash knee: 1d6! Damage, limited to Crawl until healed”.</p>
            <br />
            <p>You only need, at most, 4 of each type of each step that makes sense.</p>
            <h2>Time</h2>
            <p>You might consider how long each step is going to take - usually represented in dice. This helps with Boons and Complications related to time. Don’t forget to set a floor on the time, however.</p>
            <h1>Boons</h1>
            <br />
            <ul>
                <li>Halving the Stress that one d4! Inflicts</li>
                <li>Removing one dice from the possible Stress gained</li>
                <ul>
                    <li>for 2 Boons</li>
                </ul>
                <li>Accomplishing the task faster</li>
                <li>Getting free Prep on the next, similar Check</li>
                <li>Giving a small bonus to the next person or Check</li>
                <ul>
                    <li>+1 Position per Boon</li>
                </ul>
                <li>Giving a small penalty to enemy's next Check</li>
                <ul>
                    <li>-2 Position per Boon</li>
                </ul>
                <li>Inflict / Reduce a Rank of an Emotion</li>
                <li>Don't gain Wear on an item used</li>
                <li>Gain an item</li>
                <li>Have a Stroke of luck</li>
                <li>Gain additional insight</li>
                <li>Find a secret</li>
            </ul>
            <br />
            <h1>Complications</h1>
            <br />
            <ul>
                <li>Expend additional Resources (default)</li>
                <ul>
                    <li>Wear: 1d4!</li>
                    <li>Damage: See table below</li>
                    <li>Stress: 1d4!</li>
                    <li>Emotions: 1d4!</li>
                </ul>
                <li>Devil’s Bargain</li>
                <ul>
                    <li>Give the players a trade between getting past the Obstacle for a price</li>
                </ul>
                <li>Dangle a carrot with an additional risk</li>
                <li>Inflict an ongoing penalty</li>
                <li>Escalate an Obstacle</li>
                <li>Introduce a new Obstacle</li>
                <li>Faulty success</li>
                <li>Reveal a new danger</li>
                <li>Collateral damage</li>
                <ul>
                    <li>Threaten another character, ally, and / or Faction</li>
                </ul>
                <li>Remove an opportunity</li>
                <li>You know who might know?</li>
                <ul>
                    <li>The players don’t know but they do know who might know</li>
                </ul>
                <li>Give an enemy an opening or bonus</li>
                <li>Draw unwanted attention</li>
                <li>Leave Evidence</li>
                <li>Take additional time</li>
                <li>Turn it over to the players</li>
            </ul>
            <br />

            <table>
                <thead>
                    <tr>
                        <th rowSpan={2}>Skull Rating</th>
                        <th colSpan={5}>Damage</th>
                        <th colSpan={2}>Recovery</th>
                    </tr>
                    <tr>
                        <th>Slashing</th>
                        <th>Piercing, Pokey</th>
                        <th>Piercing, Stabby</th>
                        <th>Piercing, Gougey</th>
                        <th>Crushing</th>
                        <th>Repeating</th>
                        <th>One Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{<Icon iconName="skull-outline" iconSize='h2' />}</th>
                        <td>4d4!</td>
                        <td>2d6!</td>
                        <td>1d8!+1d4!</td>
                        <td>1d12!+1d12!</td>
                        <td>1d10!</td>
                        <td>10</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <th>{formatSkulls(1)}</th>
                        <td>5d4!</td>
                        <td>3d6!</td>
                        <td>2d8!</td>
                        <td>1d12!+1d6!</td>
                        <td>1d12!</td>
                        <td>8</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <th>{formatSkulls(2)}</th>
                        <td>5d4!+1d2!</td>
                        <td>3d6!+1d4!</td>
                        <td>2d8!+1d4!</td>
                        <td>1d12!+1d8!</td>
                        <td>1d12!+1</td>
                        <td>7</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <th>{formatSkulls(3)}</th>
                        <td>6d4!</td>
                        <td>4d6!</td>
                        <td>2d8!+1d6!</td>
                        <td>1d12!+1d10!</td>
                        <td>1d20!</td>
                        <td>6</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <th>{formatSkulls(4)}</th>
                        <td>6d4!+1d2!</td>
                        <td>4d6!+1d4!</td>
                        <td>3d8!</td>
                        <td>2d12!</td>
                        <td>1d20!+1</td>
                        <td>5</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <th>{formatSkulls(5)}</th>
                        <td>7d4!</td>
                        <td>5d6!</td>
                        <td>3d8!+1d4!</td>
                        <td>2d12!+1d4!</td>
                        <td>1d20!+2</td>
                        <td>4</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <th>{formatSkulls(6)}</th>
                        <td>7d4!+1d2!</td>
                        <td>5d6!+1d4!</td>
                        <td>3d8!+1d6!</td>
                        <td>2d12!+1d6!</td>
                        <td>1d20!+3</td>
                        <td>4</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <th>{formatSkulls(7)}</th>
                        <td>9d4!+1d2!</td>
                        <td>7d6!+1d4!</td>
                        <td>4d8!+1d4!</td>
                        <td>3d12!</td>
                        <td>1d20!+6</td>
                        <td>3</td>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <h1 className="italic">Example</h1>
            <p className="italic">Additional time might be enough of a penalty but I’m going to add a few more options:</p>
            <br />
            <ol className="italic">
                <li>Identify whether or not a library has got a clue</li>
                <ul>
                    <li>Boons: Find the Librarian Asset (increase Knowledge and Org based on number of Boons), Find the Library Quicker (-1d4! Days), +1 Position to Steps 3 and 4</li>
                    <li>Complications: +1d4! Weeks to Time, Discover a False Lead, Discover Part of the Truth, Draw Attention from a Rival Adventuring Party, the library is far away and / or in a dangerous location, -1 Position to Steps 3 and 4</li>
                </ul>
                <li>Travel to the library</li>
                <ul>
                    <li>This doesn’t have any Boons or Complications so we’ll skip it.</li>
                </ul>
                <li>Sift through the records at the library</li>
                <ul>
                    <li>Boons: Find Some Helpful Additional Material (free Prep on Step 3), Learn About Some Threat at the Location of the Sword, Find the Information Quicker (-1d4! Days)</li>
                    <li>Complications: +1d4! Days to Time, 1d4! Stress, Anger the librarian, Find a Scroll with the Information Locked Away and Out of Access, Find a Half-Destroyed Record (Penalty on Step 3).</li>
                </ul>
                <li>Comprehend the tomes</li>
                <ul>
                    <li>Boons: Learn About Some Threat at the Location of the Sword, Read Quickly (-1d4! Days).</li>
                    <li>Complications: +1d4! Weeks to Time, 1d4! Stress, Handle the Tombs Too Roughly (1d4! Wear), Discover a Curse on the sword</li>
                </ul>
            </ol>
        </div>
    )
}
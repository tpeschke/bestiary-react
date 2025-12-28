import Icon from "../../../../../components/icon/Icon";
import formatSkulls from "../../../utilities/FormatSkulls";

export default function Step5() {
    return (
        <div>
            <p>Select a Skull Rating (0 - 7) for the Challenge.</p>
            <h1>Difficulty</h1>
            <p>For each step you’ve decided is worth an actual Check, go to the chosen Skull’s row and choose a Position: the top row is going to tell you the dice you’re going to be rolling.</p>
            <br />
            <p>Generally, s1 is considered the default with what you should select.</p>
            <p>You can also select Skulls 1 or 2 higher than the baseline if you want more variety but the average should be the Skull level you selected. You should never go higher than 2 because of the way that math of the game works; going higher than that can make an Obstacle unbeatable for the characters.</p>
            <h2>d0s</h2>
            <p>I like to put the three dice in front of my players while we’re resolving an Obstacle; for the d0, I represent it with a chip.</p>
            <h2 className="italic">Example</h2>
            <p className="italic">The Blade is legendary but we’ll say that the players had an initial lead that started them on this path to searching libraries in the area so that initial hurdle is what kept people from finding it earlier. That being said, this might still be a tricky task so I’m going to go with 3 Skulls, which means that the default Difficulty is going to be 9 - s1 (d6 / d10 / d10).</p>
            <p className="italic">I’m actually not going to mess with that; it’s good enough for me.</p>
            <p className="italic">Note that Step 2 isn’t going to have a Difficulty; it’s not an Obstacle - just a step that needs to be taken to complete the Challenge.</p>

            <table>
                <thead>
                    <tr>
                        <th>Skull Rating</th>
                        <th>Untrained</th>
                        <th>Novice</th>
                        <th>Journey</th>
                        <th>Expert</th>
                        <th>Master</th>
                        <th>Grandmaster</th>
                        <th>Legendary</th>
                        <th>Mythic</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bottom-border">
                        <th>Default Dice Array</th>
                        <td>0 - X (d0 / d4 / d20)</td>
                        <td>3 - X (d2 / d6 / d12)</td>
                        <td>6 - X (d4 / d8 / d10)</td>
                        <td>9 - X (d6 / d10 / d8)</td>
                        <td>12 - X (d8 / d12 / d6)</td>
                        <td>15 - X (d10 / d20 / d4)</td>
                        <td>18 - X (d12 / d20+d4 / d2)</td>
                        <td>30 - X (d20 / d20+d6 / d0)</td>
                    </tr>
                    <tr>
                        <th>{<Icon iconName="skull-outline" iconSize='h2' />}</th>
                        <td className="gray">s1</td>
                        <td>n (-1 Pos)</td>
                        <td>w1 (-2 Pos)</td>
                        <td>h (-5 Pos)</td>
                        <td>h (-5 Pos)</td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                    </tr>
                    <tr>
                        <th>{formatSkulls(1)}</th>
                        <td> </td>
                        <td className="gray">s1</td>
                        <td>n (-1 Pos)</td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                    </tr>
                    <tr>
                        <th>{formatSkulls(2)}</th>
                        <td> </td>
                        <td> </td>
                        <td className="gray">s1</td>
                        <td>n (-1 Pos) / w1 (-2 Pos)</td>
                        <td> </td>
                        <td>w1 (-2 Pos)</td>
                        <td> </td>
                        <td> </td>
                    </tr>
                    <tr>
                        <th>{formatSkulls(3)}</th>
                        <td> </td>
                        <td> </td>
                        <td>l (+3 Pos)</td>
                        <td className="gray">s1</td>
                        <td>n (-1 Pos) / w1 (-2 Pos)</td>
                        <td>w1 (-2 Pos)</td>
                        <td>w1 (-2 Pos)</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <th>{formatSkulls(4)}</th>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td>l (+3 Pos)</td>
                        <td className="gray">s1</td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                    </tr>
                    <tr>
                        <th>{formatSkulls(5)}</th>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td>l (+3 Pos)</td>
                        <td className="gray">n</td>
                        <td> </td>
                        <td> </td>
                    </tr>
                    <tr>
                        <th>{formatSkulls(6)}</th>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td>s1 (+1 Pos)</td>
                        <td className="gray">n</td>
                        <td>h (-5 Pos)</td>
                    </tr>
                    <tr>
                        <th>{formatSkulls(7)}</th>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td className="gray">n</td>
                    </tr>
                </tbody>
            </table>
            <br/>

            <table className="float-right">
                <thead>
                    <tr>
                        <th>Ease</th>
                        <th># of Complications</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Hard</th>
                        <td>1</td>
                    </tr>
                    <tr>
                        <th>Average</th>
                        <td>2</td>
                    </tr>
                    <tr>
                        <th>Easy</th>
                        <td>4</td>
                    </tr>
                    <tr>
                        <th>Very Easy</th>
                        <td>8</td>
                    </tr>
                    <tr>
                        <th>Never</th>
                        <td>∞</td>
                    </tr>
                </tbody>
            </table>

            <h1>Ease</h1>
            <p>Steps with no fail state (or Success at a Price) get an Ease of N/A (or you can write ∞ if you like). Otherwise, you can refer to the following table. The higher the Ease, the easier the Check is going to be.</p>
            <p>You can actually go higher than 16 but, at that point, you might as well just go with ∞.</p>
            <h2 className="italic">Example</h2>
            <p className="italic">Going step-by-step, I’m going to assign Eases:</p>
            <br />
            <ol className="italic">
                <li>Identify whether or not a library has got a clue</li>
                <ul>
                    <li>I’m going to give this an Ease of n/a: essentially, this is an Obstacle with no fail state or, more accurately, this Obstacle’s fail state is handled by the two other Obstacles.</li>
                </ul>
                <li>Travel to library</li>
                <ul>
                    <li>This isn’t an Obstacle so it doesn’t need an Ease.</li>
                </ul>
                <li>Sift through the records at the library</li>
                <ul>
                    <li>This is a long project with plenty of time to course correct so I’m going to give it an Ease of 4.</li>
                </ul>
                <li>Comprehend the tomes</li>
                <ul>
                    <li>Either the players are able to comprehend a clue or not, which would result in an Ease of 1 but it makes sense that maybe, once they found the record, they could possibly find additional records that help decipher them so I’ll go with 2.</li>
                </ul>
            </ol>
        </div>
    )
}
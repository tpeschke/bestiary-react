import Icon from "../../../../../../../components/icon/Icon";
import formatSkulls from "../../../../../utilities/FormatSkulls";

export default function Step2() {
    return (
        <div>
            <table className="float-right">
                <thead>
                    <tr>
                        <th>Skull Rating</th>
                        <th>Repeating</th>
                        <th>One Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{<Icon iconName="skull-outline" iconSize='h2' />}</th>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <th>{formatSkulls(1)}</th>
                        <td>2</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <th>{formatSkulls(2)}</th>
                        <td>3</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <th>{formatSkulls(3)}</th>
                        <td>4</td>
                        <td>8</td>
                    </tr>
                    <tr>
                        <th>{formatSkulls(4)}</th>
                        <td>5</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <th>{formatSkulls(5)}</th>
                        <td>6</td>
                        <td>12</td>
                    </tr>
                    <tr>
                        <th>{formatSkulls(6)}</th>
                        <td>7</td>
                        <td>14</td>
                    </tr>
                    <tr>
                        <th>{formatSkulls(7)}</th>
                        <td>11</td>
                        <td>22</td>
                    </tr>
                </tbody>
            </table>

            <p>Choose a Skull Rating from 0 - 7 and then determine whether the threat is going to be repeating (a vampire reaching across the void to seduce their victim slowly over weeks) or one time (a skeleton drops on a player when they open a closet, spooking them and putting them on edge).</p>
            <br />
            <p>Use those two bits of information to determine how many Emotional Ranks are inflicted.</p>
            <h1 className="italic">Example</h1>
            <p className="italic">So, I’m going to have layers to my swamp: Outer, Inner, and Heart.</p>
            <p className="italic">The Outer is going to be 1 Skull and Inner 2 but the Heart is going to jump up to 4 Skulls. This is also going to be a repeating threat as the players travel through the swamp.</p>
            <p className="italic">This means that they’ll inflict:</p>
            <br />
            <ul className="italic">
                <li>Outer: 4</li>
                <li>Inner: 6</li>
                <li>Heart: 10</li>
            </ul>
        </div>
    )
}
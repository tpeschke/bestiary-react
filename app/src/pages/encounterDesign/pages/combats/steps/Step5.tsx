import example from '../../../../../assets/images/encounterDesign/placeExample.jpg'
import PointCalculator from './components/PointCalculator'

export default function Step5() {
    return (
        <div>
            <table className='float-right'>
                <thead>
                    <tr>
                        <th>Points</th>
                        <th>Secondary Role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>1 Lesser</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>1 None, Champion, or Tyrant</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>1 Veteran or Officer</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>1 Solo</td>
                    </tr>
                </tbody>
            </table>
            <p>You get a number of points equal to their followers plus double the number of characters. You exchange these for specific enemies, based on the enemy’s Secondary Role.</p>
            <br />
            <p>You can also increase and decrease the number of points to increase or decrease the difficulty but note: adding additional enemies doesn't scale linearly in difficulty due to Lanchester’s Law. So, for a four person party, doubling the number of standard enemies that face doesn’t double the difficulty because an advantage in numbers will spiral.</p>
            <p>Secondary Role types do take this into consideration but it’s something to watch out for. You might think only adding another Veteran won’t do that much but it might severely tip things in the enemy’s favor.</p>
            <p>Likewise, players (and their followers) outnumbering their enemies might spiral things in their favor.</p>
            <br />
            <p>Now place them on the map, along with the general location the players are going to start. You want to place the defender toward the center but closer to the edge (so there is space completely around them but the battle will meet near the middle) and the attackers on the edge, although it is safest to also give them some space behind them on the map.</p>
            <h1>Higher /  Lower Skull Rating</h1>
            <p>For every Skull below what the characters are at, half the point value for that monster. So, if your characters are taking on 3 Skull monsters, if you were to add some 2 Skull Lesser enemies, they would be worth 0.5 Points ( (3 - 2) / 2 ).</p>
            <p>For higher Skull monsters, double their points per Skull of difference. However you should never go higher than 2 Skulls due to the math of the game, which can make higher Skull monsters untouchable.</p>

            <PointCalculator />

            <img src={example} alt="Example battlefield with enemies placed" />
            <h1 className="italic">Example</h1>
            <p className="italic">Assuming that I have 4 players with 4 followers so that gives me 12 points (4 * 2 + 4). Thugs and Sharpshooters have no Secondary Role. Looters are Lesser. That means I have 3 Sharpshooters, 1 Thug, and 4 Looters.</p>
            <p className="italic">But, there’s actually two combats here: one getting to the shack and the other when they get to the shack. When I make that, I would probably have the captain be a Veteran or Officer and then have him be flanked by 2 bodyguards. They’d be too busy torturing the prisoner to help with the initial battle but will turn to fight the players when they make it inside.</p>
            <p className="italic">If the Sharpshooters aren’t taken care of, they can climb down the ladder and use daggers, basically making them Lesser since they’re not as good in melee.</p>
            <p className="italic">But, anyway, that would be the next combat so let’s refocus on the current one. The placement looks like:</p>
        </div>
    )
}
import example from '../../../../../assets/images/encounterDesign/finalExample.jpg'

export default function Step6() {
    return (
        <div>
            <p>Finally, you want to ‘smudge’ things so they don’t come off as unnatural or artificial. Part of that is replacing the generic terms for things (like barriers) with specific things (like a fence or a series of statues with interlocking arms).</p>
            <p>I’ve also found that removing the grid helps with smudging but here are some options to smudge things:</p>
            <br />
            <ul>
                <li>Add one or two squares in random places</li>
                <li>Tilt things at an angle</li>
                <li>Adjust to have an odd number of enemies</li>
                <ul>
                    <li>Default to adding a Lesser</li>
                </ul>
                <li>Swap out a single enemy’s Role for one not selected</li>
                <li>Add some places to change / interact</li>
            </ul>
            <br />
            <h1>Final Pass on Objectives</h1>
            <p>This is also a good time to circle back to the objective and make some changes / calculations to make them reasonable. This is where you should calculate how long things take.</p>
            <p><strong>For distances</strong>: Divide the distance they need to travel by the slowest member’s Jog Speed.</p>
            <p><strong>For Combat</strong>: Use 10 seconds / enemy, if the objective doesn’t involve killing them, otherwise, 30 seconds / enemy / character.</p>
            <p><strong>For other actions</strong>: use the max time that action would take with no explosions, if guidelines are provided ( so if the characters need to remove a shield to complete the objective, add 10 seconds (d10! Seconds &gt; 10 seconds) . Otherwise, use the following:</p>
            <br />
            <ul>
                <li>Simple Task: + 10 seconds (use a d10! during the session to determine the actual time it takes)</li>
                <li>Moderately Complex Task: +20 seconds (2d10!)</li>
                <li>Complex Task: +30 seconds (3d10!)</li>
            </ul>
            <br />
            <p><strong>For Initiative</strong>: use the max of the Initiative Die you’re going to use (so, if a d8, +8 seconds).</p>
            <br />
            <p>You want to be generous on time limits: even if the players are given double the amount of time they would need to complete the objective, having a time limit puts pressure on them.</p>
            <img src={example} alt="The finished battlefield" />
            <h1 className='italic'>Example</h1>
            <p className='italic'>Okay, I’ve mostly already done this but I’m going to add a few more details:</p>
            <br />
            <p className='italic'>So,  I’ve made the following changes:</p>
            <br />
            <ul className='italic'>
                <li>I’ve made the straight black cliffs into more naturalistic looking cliffs.</li>
                <ul>
                    <li>As the characters get closer to the top, it’ll be easier for them to climb so the hard barrier becomes a soft one - that’s perfectly acceptable.</li>
                </ul>
                <li>Added some trees on either side of the river but made them more dense on the east side.</li>
                <li>I’ve added a barricade in front of the first Artillery because they’ve had enough time to do a little preparation</li>
                <li>I’ve added a Skirmisher on the east side of the river.</li>
                <ul>
                    <li>He’ll mainly be used to pepper the players but, if they attempt to ford the river or deal too much damage to him, he’ll run away</li>
                    <li>He’ll also just run at a certain point to go warn other outlaws.</li>
                </ul>
                <li>I’ve tilted the shack and repositioned the tower</li>
                <ul>
                    <li>I’ve also decided that it’s an old chapel and the tower was a bell tower since I don’t think the outlaws would have had enough time to construct their own and I doubt a random hunting shack would have had one.</li>
                </ul>
            </ul>
            <br />
            <p className='italic'>Finally, there’s the matter of getting to the prisoner before he breaks. Assuming that all the party members are Medium Sized and that they’re going into this encounter with d4 Initiative:</p>
            <br />
            <ul className='italic'>
                <li>Distance: 	240 ft / 10 = 24 seconds</li>
                <li>Combat: 		8 enemies they don’t have to kill (I’m not including the Skirmisher since it’s not actually in their way)  x 10 = 80 seconds</li>
                <li>Other actions: 	Just opening the door to the chapel so +10 seconds</li>
                <li>Initiative: 	+4 seconds</li>
            </ul>
            <br />
            <p className='italic'>For a total of 138 seconds but I’ll round up to 140 seconds for ease for tracking.</p>
        </div>
    )
}
export default function Step3() {
    return (
        <div>
            <p>Look at your steps: for each, ask these questions:</p>
            <br />
            <ol>
                <li>What does failure look like at this step?</li>
                <li>What possible bonuses could they get?</li>
                <li>What possible penalties could this step give them?</li>
                <li>Your guiding Rules of Thumb are:</li>
            </ol>
            <br />
            <ul>
                <li>If you can’t answer 2 out of the 3 questions for a step</li>
                <ul>
                    <li>Maybe roll that step into the previous or next step.</li>
                    <li>You might keep it as a separate step if it still needs done but it won't really be an Obstacle</li>
                </ul>
                <li>If you have a lot of answers for all 3 questions</li>
                <ul>
                    <li>Maybe break it into 2 steps.</li>
                </ul>
                <li>If you answers are the same for one or more steps</li>
                <ul>
                    <li>Roll them into a single step.</li>
                </ul>
            </ul>
            <br />
            <h1>Focus & Speed of the Challenge</h1>
            <p>You should also keep something in mind: how important is this Challenge to the session? 1 Obstacle will typically take 30 minutes of play; if only one player is involved with resolving it, you might remove steps and abstract things to keep play moving.</p>
            <p>But, if all the players are involved (or really invested in the outcome of the Challenge), you can keep it a bit longer.</p>
            <h1>No Failure State</h1>
            <p>It could be possible that a step doesn't have a failure state. For example: while traveling to a location via the road. In that case, there’s no fail state since getting lost is impossible, however, you still want to keep the step there because it is something that still has to happen but you'll just narrate it in play and move to the next Obstacle.</p>
            <h2>Success at Price</h2>
            <p>If you still think a Check for a step is at least warranted, marking the fail state as “you get what you want but at a price” is completely valid.</p>
            <p>In fact, for one shots (or times where Checks might gate adventure advancement with no alternative or where you're in a non-Skill-focused game) default to success at a price.</p>
            <h1 className="italic">Example</h1>
            <br />
            <ol className="italic">
                <li>Identify whether or not a library has got a clue</li>
                <ul>
                    <li>Failure: spend time at the wrong library</li>
                    <li>Bonus: Find a knowledgeable librarian, find a likely library</li>
                    <li>Penalties: Take up additional time, find an unlikely library</li>
                </ul>
                <li>Travel to the library</li>
                <ul>
                    <li>Failure: None</li>
                    <li>Sift through the records at the library</li>
                    <li>Failure: discover nothing</li>
                    <li>Bonus: Find additional clues about the challenges they’re going to face</li>
                    <li>Penalties: Take up additional time</li>
                </ul>
                <li>Comprehend the tomes</li>
                <ul>
                    <li>Failure: Realize that can’t read it - they have to find somebody who can</li>
                    <li>Bonus: Nothing</li>
                    <li>Penalties: Take up additional time</li>
                </ul>
            </ol>
            <br />
            <p className="italic">So, steps 1, 3, and 4 have “Take up additional time” as a penalty but the answers are different enough to warrant staying as their own separate steps.</p>
            <p className="italic">Step 2 is going to be super context dependent: if traveling through the wilderness, this could be broken out into its own set of Obstacles but, for the purposes of this example, we’re going to assume that the players will be traveling on roads so there’s no chance of getting lost and that dangers - like being delayed, bad weather, or running into monsters - are going to be handled via other tools.</p>
            <p className="italic">For Step 4, I might sketch out an additional Obstacle to track down a scribe who could help them or I might just give it to them (“You’re pretty sure, based on the fragments you can understand, that this scroll might have the information you need but you can’t fully understand it but you do know that Carina, the head scribe for the Baron of Illindar, would be able to decipher it).</p>
        </div>
    )
}
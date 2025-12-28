import ObjectiveTables from "./components/objectiveTables";

export default function Step2() {
    return (
        <div>
            <p>Typically the objective is “kill all the enemy” for both sides but you might consider changing that up or just adding secondary objectives.</p>
            <p>If you’re not sure, you can roll once on each of the following tables and combine for inspiration.</p>
            <br/>
            <p>When you create an object, you need to pair it with a bonus and/or a penalty. For instance, if you give the players a secondary objective to rescue an informant that’s currently being tortured by the Thieves Guild, the penalty for not getting to them in time results in them dying, therefore the players will miss important information.</p>
            <p>Or, on the flip side, if the players are able to kill the enemy captain, then the enemy will fall back and/or retreat.</p>
            <ObjectiveTables />
            <h1 className="italic">Example</h1>
            <p className="italic">So, I’m going to roll randomly for the Verb and the Noun to see what I get. I got “Take & Hold”, “Captain”, and “Before the other side completes their objective” so the players have been commissioned to capture the captain of a local gaunt outlaw gang because he has some information they need. The people who commissioned the players want him alive.</p>
            <p className="italic">And, for the enemies, I got “Route”, “Captain”, and “In any number of seconds”, which sounds like the characters might have some help but I could actually see the outlaws trying to torture a captured allied captain.</p>
            <p className="italic">So, the players need to swoop in and kidnap the outlaw captain before the outlaws can break the prisoner that they have. This also means that rescuing the prisoner can be a secondary objective for the party. I’m actually going to put a time limit on the objectives, representing how long before the outlaws break the prisoner, which ignores the result I got on my roll but these are just guidelines.</p>
        </div>
    )
}
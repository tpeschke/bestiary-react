export default function Step2() {
    return (
        <div>
            <p>To set the Difficulty, first set the EP value of the encounter.</p>
            <p>You can then either select an enemy that matches that EP value or find one you need and then use the EP Modifier at the base on the stat block to get the monster near that EP value.</p>
            <br />
            <p>	Note that an enemy’s Social Roles will also influence what approaches they’ll be good at. Depending on the party’s approach and their skills, this can modify the difficulty, but don’t worry about modifying the EP value as it’ll all wash out in the end.</p>
            <h1 className="italic">Example</h1>
            <p className="italic">I'm going to use the <a href="https://bestiary.stone-fish.com/beast/261" target="_blank">Artisan's stats</a> as my baseline.</p>
            <p className="italic">Why? Because it's a relatively easy social enemy and it's free for everyone to see.</p>
            <p className="italic">So, I'm going to grab the Artisan's best Social Suite (Inform but, for the Swamp, it'd use the Artisan's Inform percentage for the Swamp's Intimidate) and its EP value for the swamp. And, just like that, I've turned a human into an environment.</p>
        </div>
    )
}
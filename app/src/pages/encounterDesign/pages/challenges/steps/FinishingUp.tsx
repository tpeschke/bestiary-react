export default function FinishingUp() {
    return (
        <div>
            <p>That’s it: that’s all you need.</p>
            <p>Note that steps with Difficulties and Eases are now, officially, Obstacles but don’t just skip over the other steps: these can create great pacing and breathing space between Obstacles.</p>
            <h1>Ad Hoc Obstacles</h1>
            <p>The last thing to note is that players might create ad hoc Obstacles during play. This is most commonly due to players doing Preparation Checks.</p>
            <p>In these cases, default to 0 - s1 (d0 / d6 / d20) with an Ease of 1.</p>
            <h1 className="italic">Example</h1>
            <p className="italic">In the library example, the time period over which the Skill Challenge happens is weeks so it’s completely reasonable that players would want to do Preparations for their Checks. This is great!</p>
            <p className="italic">They might travel to see a sage on the topic, look specific for libraries with historical records of the battle in which the blade was lost, perhaps send letters trying ahead of them, they might seek out some books to help with their translation work.</p>
            <p className="italic">All of these would be handled via the default Preparation Obstacle.</p>
        </div>
    )
}
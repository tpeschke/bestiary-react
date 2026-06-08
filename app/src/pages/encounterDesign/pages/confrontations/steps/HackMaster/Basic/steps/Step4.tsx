export default function Step4() {
    return (
        <div>
            <p>The player(s) keep their Emotion until they do one of two things:</p>
            <ol>
                <li>Use that Emotion to gain an Advantage on a roll</li>
                <li>Use that Emotion to gain Disadvantage on a roll</li>
            </ol>
            <p>If they still have their Emotion at the end of session, they receive -1 Honor. If they were able to rid themselves of the Emotion, they, instead, gain +1 Honor.</p>
            <h1>Enemy Emotions</h1>
            <p>If an enemy has an Emotion, they keep that Emotion until the players redeem it to give the enemy Disadvantage on a roll.</p>
            <h1 className="italic">Example</h1>
            <p className="italic">Let's say that, while passing through the swamp, both the thief, William Nine-Fingers, and the cleric, Leena of the Wind, failed their Checks and have gained the Fear Emotion.</p>
            <p className="italic">During the course of the session, they were ambushed by undead. Leena decided the the fear affected her Turn check; she rid herself of the Fear but had Disadvantage on the Fear Check. William decided 
                that his character powered through. At the end of the session, Leena gets +1 Honor and William gets -1 Honor.
            </p>
            <p className="italic">During the next session, William is still Fearful so he reasons that his character is a bit on edge so, when combat breaks out, William snaps: he gains Disadvantage 
                on his Initiative roll. At the end of the session, he gets +1 Honor.
            </p>
        </div>
    )
}
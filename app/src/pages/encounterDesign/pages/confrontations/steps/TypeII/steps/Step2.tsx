import emotionsWheel from '../../../../../../../assets/images/emotions-wheel.png'

export default function Step2() {
    return (
        <div>
            <img src={emotionsWheel} />
            <p>If the players are the attackers in the Confrontation, they’ll choose the Emotion they want to use but you’ll need to decide whether or not it’ll work. Default to ‘yes’ unless there’s a specific reason it wouldn’t (like the monster is immune to the Emotion).</p>
            <br />
            <p>Otherwise, review the Emotion Wheel at the beginning of this chapter and choose an Emotion. In 80% of cases, you only need the emotions in the center.</p>
            <br />
            <p>You’ll also want to note what Emotions the defending side will inflict back should they lose a Check.</p>
            <h1>Default Options</h1>
            <p>The Emotion Wheel can be cool but overwhelming. Truth be told, while it's nice to have all those options, 90% of the time, you can get away with one of the following:</p>
            <ul>
                <li>Depression</li>
                <li>Disgust</li>
                <li>Fury</li>
                <li>Joy</li>
                <li>Surprise</li>
                <li>Terror</li>
            </ul>
            <h1 className='italic'>Example</h1>
            <p className='italic'>In this case, the players are going to decide the Emotion but I’m going to note that Surprised and Disgusted will simply not work in this case. Anger and Fear might work as long as they’re not centered on the players.</p>
            <p className='italic'>In fact, if the players fail a Check, I think that the captain will get Angry at them.</p>
        </div>
    )
}
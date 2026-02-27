import emotionsWheel from '../../../../../../../assets/images/emotions-wheel.png'

export default function Step1() {
    return (
        <div>
            <img src={emotionsWheel} />
            <p>Review the Emotion Wheel at the beginning of this chapter and choose an Emotion. In 80% of cases, you only need the emotions in the center.</p>
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
            <h1 className="italic">Example</h1>
            <p className="italic">I want the swamp to be scary and put the characters on edge so I’m going to select Fearful as the Emotion. I could also choose Scared or even Frightened but Fearful already captured that.</p>
            <p className="italic">Another legitimate choice would have been Nervous.</p>
        </div>
    )
}
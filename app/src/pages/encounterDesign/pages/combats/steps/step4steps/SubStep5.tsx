import explanation from '../../../../../../assets/images/encounterDesign/battlefieldPatterns/explanation.jpg'

import alley from '../../../../../../assets/images/encounterDesign/battlefieldPatterns/alley.jpg'
import dangerWall from '../../../../../../assets/images/encounterDesign/battlefieldPatterns/dangerWall.jpg'
import divide from '../../../../../../assets/images/encounterDesign/battlefieldPatterns/divide.jpg'
import funnel from '../../../../../../assets/images/encounterDesign/battlefieldPatterns/funnel.jpg'
import guardian from '../../../../../../assets/images/encounterDesign/battlefieldPatterns/guardian.jpg'
import horseshoe from '../../../../../../assets/images/encounterDesign/battlefieldPatterns/horseshoe.jpg'
import kingOfTheHill from '../../../../../../assets/images/encounterDesign/battlefieldPatterns/kingOfTheHill.jpg'
import longPath from '../../../../../../assets/images/encounterDesign/battlefieldPatterns/longPath.jpg'
import openField from '../../../../../../assets/images/encounterDesign/battlefieldPatterns/openField.jpg'
import pillar from '../../../../../../assets/images/encounterDesign/battlefieldPatterns/pillar.jpg'
import pincer from '../../../../../../assets/images/encounterDesign/battlefieldPatterns/pincer.jpg'
import uphill from '../../../../../../assets/images/encounterDesign/battlefieldPatterns/uphill.jpg'

import example from '../../../../../../assets/images/encounterDesign/battlefieldPatterns/example.jpg'

export default function SubStep5() {
    return (
        <div>
            <img src={explanation} alt="legend for the following images" />
            <p>Now to put it all together. An explanation of each Pattern is found below. It’s not necessary at this step, but you might think about what each part means, in-world. It often helps me, as I’m combing Patterns, to think about what they are (a pillar becomes a watch tower: the barrier of the Horseshoe becomes a chasm, etc).</p>
            <p>Barriers can be something blocking both movement and view (like a wall), something blocking just movement (like wall of force), or just make movement difficult (like a pile of rubble). They can also be destructible or temporary.</p>
            <p>It can also be something that can be destroyed (like a wood wall) or moved over at a cost (like a pit) or something that’s permanent and fixed (like a stone wall) or something that’s a ‘soft’ barrier which hinders movement but doesn’t stop it (like a waist-high wall).</p>
            <p>Likewise, “elevation changes” don’t necessarily need to be elevation changes but can be anything that creates resistance moving in a direction.</p>
            <h2>Hard & Soft Patterns</h2>
            <p>You can overlay Patterns, of course, mixing hard and soft barriers or mixing elevation.</p>
            <DisplayBattlefieldPatternExplanations />
            <img src={example} alt="An example battlefield" />
            <h1 className='italic'>Example</h1>
            <p className='italic'>Alright, I have King-of-the-Hill, Long-Path, and Alley and I kind of already have an idea of what they mean because I can’t help myself. Sketching it out looks like this:</p>
            <p className='italic'>So the King-of-the-Hill is actually kind of two parts: the tower on the roof of the shack and the upper slopes of the cliffs.</p>
            <p className='italic'>The Long-Path is added via the path that winds up the cliffs. It is entirely possible that the players attempt to climb the cliffs (especially when it gets more  shallow).</p>
            <p className='italic'>Finally, the Alley is the river on one side and the cliffs on the other, forcing the players to keep themselves exposed. I might end up putting trees on the far side.</p>
            <p className='italic'>Note that I’ve also made most of the gaps ~4 squares wide because this is a medium sized battlefield but I’m not being too precise since this is still a rough sketch. I’m not using the entire battle map either - that’s also okay since it gives us more space for dressing when we smudge the map.</p>
        </div>
    )
}

function DisplayBattlefieldPatternExplanations() {
    return (
        <div className='explanations'>
            {patternExplanationDictionary.map((pattern, index) => formatExplanation(pattern, index) )}
        </div>
    )
}

function formatExplanation({ images, name, explanation}: Explanation, overallIndex: number) {
    return (
        <div key={overallIndex} className='explanation'>
            <div>
                <h1>{name}</h1>
                {explanation.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
            <div className='explanation-images'>
                {images.map((image, index) => <img key={index} src={image} alt={`${name} ${index + 1}`} />)}
            </div>
        </div>
    )
}

interface Explanation {
    images: string[],
    name: string,
    explanation: string[]
}

const patternExplanationDictionary: Explanation[] = [
    {
        images: [openField],
        name: 'Open Field',
        explanation: ['This is a battlefield (or part of a battlefield) that is completely open.']
    },
    {
        images: [divide],
        name: 'Divide',
        explanation: ["The divide is the simplest way to add interest to a room. The elevation change can be replaced with any ‘soft’ barrier, such as a pit or barricade."]
    },
    {
        images: [dangerWall],
        name: "Danger Wall",
        explanation: ["The walls are dangerous for some reason. This means that the combatants are forced into the center. This can also be combined with any barrier from any other Pattern."]
    },
    {
        images: [pillar],
        name: "Pillar",
        explanation: ["This has a barrier in the middle of the room, forcing the players to pick a side and be flanked or to split their forces and be weakened."]
    },
    {
        images: [guardian, pincer],
        name: "Guardian / Pincer",
        explanation: ["This pattern is called the Guardian when the enemy is in the middle position between the barriers and Pincer if it’s the players."]
    },
    {
        images: [funnel],
        name: "Funnel",
        explanation: ["This pattern is a variation of the Pincer in that the barriers are titled a bit further."]
    },
    {
        images: [horseshoe],
        name: "Horseshoe",
        explanation: [
            "The Horseshoe pattern moves the hole in the barrier to the far end so it works best with barriers that block movement but not ranged firing.",
            "This also covers L-shaped rooms."
        ]
    },
    {
        images: [longPath],
        name: "Long-Path",
        explanation: ["This places two barriers that are more-or-less parallel, forcing anyone to take a circuitous route to get to where they want to go."]
    },
    {
        images: [alley],
        name: "Alley",
        explanation: [
            "The Alley puts the players in a position where they have very little room to maneuver in and a small margin of error.",
            "Note that you can put an enemy on the bridge to hamper forward movement but not having enemies surround the players."
        ]
    },
    {
        images: [uphill],
        name: "Up-Hill",
        explanation: ["The Up-Hill pattern traditionally puts the enemy at the top of a hill in a fortified position."]
    },
    {
        images: [kingOfTheHill],
        name: "King of the Hill",
        explanation: [
            "A.k.a. “Fool on the Hill”",
            "This puts one of the sides of the combat on an elevated position in the middle of the battlefield."
        ]
    }
]
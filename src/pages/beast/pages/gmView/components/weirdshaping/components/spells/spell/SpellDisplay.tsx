import './SpellDisplay.css'

import { Spell } from '../../../../../../../interfaces/infoInterfaces/castingInfo'

import HTMLDisplay from '../../../../../../../components/UI/htmlDisplay/htmlDisplay'
import Icon from '../../../../../../../../../components/icon/Icon'

interface Props {
    spell: Spell
}

export default function SpellDisplay({ spell }: Props) {
    const { name, shape, origin, range, resist, interval, effect } = spell
    return (
        <div className='spell-display-shell'>
            <h4>{name}</h4>
            <div className='spell-stat-effect'>
                <strong>Shape</strong>
                <p>{shape} <Icon iconName='info' tooltip={shapeTooltips[shape]} /></p>
            </div>
            <div className='spell-stat-effect'>
                <strong>Origin</strong>
                <p>{origin} <Icon iconName='info' tooltip={originTooltips[origin]} /></p>
            </div>
            <div className='spell-stat-effect'>
                <strong>Range</strong>
                <p>{range}</p>
            </div>
            <div className='spell-stat-effect'>
                <strong>Resist</strong>
                <p>{resist}</p>
            </div>
            <div className='spell-stat-effect'>
                <strong>Interval</strong>
                <p>{interval}</p>
            </div>
            <strong>Effect</strong>
            <HTMLDisplay html={effect} />
        </div>
    )
}

const shapeTooltips: {[key: string]: string} = {
    Circle: "It extends from the Origin with a Radius equal to the Base Range of the Effect. Anyone within the Circle is affected by the spell. \n If it deals damage or inflicts Stress, this occurs on the Interval or if a person enters/re-enters the shape. \n If not cast far enough away, this could also include the weird-adept.",
    Chain: "The weird-adept casts the spell and it chooses 1 viable, random target within the Range of the Spell. After half the spell’s Interval, it then leaps to the next. Anyone hit by the spell suffers its Effects for the entire time the spell is cast. \n People may be hit multiple times, which simply counts as the spell Stacking on them, but the weird-adept may try and redirect the spell, causing it to skip over a person, but they take Stress equal to the number of times they’ve done so.",
    Cone: "The Cone starts with its tip at the Origin and then extends in a 45-degree arch from it up to the spell’s Range. Anyone within the Cone is affected by the spell. If it deals damage or inflicts Stress, this occurs on the Interval or if a person enters/re-enters the shape. \n The Cone can also be moved and shifted, rotating around its Origin, moving a facing every 3 seconds.",
    Salvo: "The Salvo is the spell chucked up to 3 * its base Range from the spell’s Origin. It requires a ranged attack to hit (though ignoring Cover). On a miss, it follows the normal ranged miss rules. Anyone that is hit, suffers the full effects of the spell. If it deals damage or inflicts Stress, this occurs on the Interval. \n From where the Salvo's touch location is, that is where the Shape of the spell is placed. Those within the Base Range of the Effect of that Shape (even on a total miss) suffer the effects of the spell for half its Interval.",
    Sphere: "The spell takes on the shape of a 2 ft diameter sphere that flies around, coming into being at the spell’s Origin. While the weird-adept has complete control over the direction with only minimal effort (so it doesn’t affect what else he’s doing), it still has some limitations. \n The first is that it only goes 10 ft / second, no faster, no slower. \n The second is that it can only turn it 45 degrees every 3 seconds. \n Anyone touched by the sphere suffers the Effects of the spell.",
    Ray: "The ray is a thin line of magic that extends from the spell’s Origin up the 10 times the spell’s Range. It manifests in a single instant, requiring a roll to hit, but those that it hits, suffer the full Effect of the spell, though he can only try once per second, and this does eat into the Interval. \n If no one was hit and the spell is still being cast, the weird-adept can manifest another ray and try again until he hits or he decasts the spell, though he can only try once per second and this does eat into the Interval.",
    Wall: "The wall is a line that starts at the spell’s Origin and extends up to its Range, but also into the air and below the ground up to 50 ft. It also doesn’t have to be a straight line, weaving, twisting and turning, however, no part of it can get within 5 ft of another part. It must also be anchored to the ground. The wall cannot be moved once placed unless it has an Aura Origin. \n Anyone passing through the wall is affected by the Spell. Those that are in the wall’s way when it is cast, get a defense roll vs a ranged attack to get out of the way.",
    Personal: "This makes the Shape of a spell just a single individual. Starting at a point within the Origin, it effects the first viable target (deteremined by the Effect Rudiment) and then stops. The spell continues to affect that person after that point, wherever they move."
}

const originTooltips: {[key: string]: string} = {
    Aura: "This makes it so the Origin starts at the weird-adept (and any equipment he carries) and then extends out from them, moving as they move.",
    Touch: "This makes it so the Origin starts at whatever the weird-adept touches and then extends from there. \n If the target is trying to resist being touched, the weird-adept needs to make an Unarmed attack against them: the weird-adept is considered armed.",
    Near: "This makes the Origin of the spell from the Effect's Base Range to up to double the Effect’s Base Range. This never affects the caster.",
    Far: "This makes the Origin of the spell from double the Effect’s Base Range to up to triple the Base Range.",
    Burst: "This makes the Origin of the spell from 0ft up to the Base Range of the spell, although it never affects the shaper."
}
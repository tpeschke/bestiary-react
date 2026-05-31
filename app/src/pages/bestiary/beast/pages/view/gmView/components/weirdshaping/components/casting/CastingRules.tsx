import { BONFIRE } from '@bestiary/common/utilities/get/getSystemString'
import '../../Weirdshaping.css'

interface Props {
    index: number,
    spellNumberDie?: string,
    systemPreference: 0 | 1 | 2 | undefined
}

export default function CastingRules({ index, spellNumberDie = '', systemPreference }: Props) {
    const isBonfire = systemPreference === BONFIRE

    const shapingOrCasting = isBonfire ? 'Shaping' : 'Casting'
    const shapeOrCast = isBonfire ? 'Shape' : 'Cast'
    const intervalOrDuration = isBonfire ? 'Interval' : 'Duration'
    const pOrExclamation = isBonfire ? '!' : 'p'
    const explodeOrPenetrate = isBonfire ? 'explode' : 'penetrate'

    const augurExplanation = (
        <>
            <p><strong>{shapingOrCasting} Time</strong> 3 seconds</p>
            {isBonfire && (
                <>
                    <p><strong>Fallout</strong> 10 Stress</p>
                    <p></p>
                </>
            )}
            <p>When you cast your first spell, roll a d10.</p>
            <p></p>
            <p>6 - 10: no bonus</p>
            <p>5: Range.</p>
            <p>4: Effect & Range.</p>
            <p>3: {intervalOrDuration}.</p>
            <p>2: Effect & {intervalOrDuration}.</p>
            <p>1: Effect.</p>
            <p></p>
            <p>Double the value of the thing(s) rolled for the duration of the day.</p>
        </>
    )

    const wildMagicExplanation = (
        <>
            <p><strong>{shapingOrCasting} Time</strong> 7 seconds</p>
            {isBonfire && (
                <>
                    <p><strong>Fallout</strong> 5 Stress</p>
                    <p></p>
                </>
            )}
            <p>Range, {intervalOrDuration}, and Effect have random modifiers.</p>
            <p></p>
            <p>Range is modified by d10{pOrExclamation} - 5: this is added or subtracted from the second to right’s digit place</p>
            <p>{intervalOrDuration} is modified by d6{pOrExclamation} - 3</p>
            <p>Effect is modified by d20{pOrExclamation} - 10</p>
            <p></p>
            <p>If 2 dice {explodeOrPenetrate}, a Wild Surge occurs: double everything.</p>
        </>
    )

    const vancianExplanation = (spellNumberDie: string) => {
        return (
            <>
                <p><strong>Spell Number Die</strong> {spellNumberDie}</p>
                {isBonfire && (
                    <>
                        <p><strong>Fallout</strong> None</p>
                        <p></p>
                    </>
                )}
                <p>When you cast a spell, roll the Spell Number Die: on a 1, that dice shrinks one dice size.</p>
                <p></p>
                <p>You can get additional points to buff the spell but that increases the chance of shrinking the Spell Number
                    Die by a like amount.</p>
                <p>So, if you start with a d8 and want 3 additional points to spend to buff the spell, if you roll 1 - 4, that
                    dice shrinks to a d6.</p>
                <p></p>
                <p>You can’t get a bonus higher than the dice size - 1 (so, for a d8, the highest bonus is +7)</p>
                <p></p>
                <p>When your dice shrinks to below a d4, you’ve run out of spells.</p>
            </>
        )
    }

    const manifestingExplanation = (
        <>
            <p>The longer you wait, the more points you get to spend.</p>
            <p></p>
            <p>You get 1 point per 10 seconds, compounding (1 after 10 secs, 2 after 20 secs, 4 after 30 secs, 8 after 40
                secs, etc). At 10 points, you can {shapeOrCast} but you can also wait and accrue more points to buff the spell.</p>
            <p></p>
            <p><strong>Fallout</strong> 1 damage for each point added to the pool</p>
        </>
    )

    const adamicCommandingExplanation = (
        <>
            {isBonfire && (
                <>
                    <p><strong>Fallout</strong> 6 Stress + 1 for each spell spoken in the last 24 hours</p>
                    <p></p>
                </>
            )}
            <p>{shapingOrCasting} time is random and based around d4{pOrExclamation}s; the result is the {shapingOrCasting} Time in seconds AND the points you can
                use to modify the spell.</p>
            <p>This is applied to effect, {intervalOrDuration}, or range but is applied per dice, although they can be doubled up.</p>
            <p></p>
            <p>So, if you roll 4 d4{pOrExclamation}s and get a 1, a 3, a 3, and a 2. You can apply the first die to the effect (giving it 1
                point), the second and third to the {intervalOrDuration} (giving it 6 points), and the fourth to the range (giving it 3
                points) and a total casting time of 9 seconds.</p>
        </>
    )

    const bloodPactExplanation = (
        <>
            <p>Deal 1 point of damage per second for each person with 10 ft (including the weird-adept): gain 1 point each time damage done regardless of how much.</p>
            <p>Whenever someone takes damage within 25ft, gain 1 point.</p>
            <p></p>
            <p>Each spell takes a minimum of 10 points to cast: additional points beyond that can be used to buff the spell.</p>
        </>
    )

    const explanationDictionary = [augurExplanation, wildMagicExplanation, vancianExplanation(spellNumberDie), manifestingExplanation, adamicCommandingExplanation, bloodPactExplanation]

    return explanationDictionary[index]
}
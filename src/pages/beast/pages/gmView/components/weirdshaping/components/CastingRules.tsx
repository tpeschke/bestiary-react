import '../Weirdshaping.css'

interface Props {
    index: number,
    spellnumberdie?: string
}

export default function CastingRules({ index, spellnumberdie = '' }: Props) {
    const explanationDictionary = [augurExplanation, wildMagicExplanation, vancianExplanation(spellnumberdie), manifestingExplanation, adamicCommandingExplanation, bloodPactExplanation]

    return explanationDictionary[index]
}

const augurExplanation = (
    <>
        <p><strong>Shaping Time</strong> 3 seconds</p>
        <p><strong>Fallout</strong> 10 Stress</p>
        <p></p>
        <p>When you cast a spell, roll a d20 whenever you cast.</p>
        <p></p>
        <p>5 is range.</p>
        <p>4 is effect & range.</p>
        <p>3 is interval.</p>
        <p>2 is effect & interval.</p>
        <p>1 is effect.</p>
        <p></p>
        <p>Rolling a thing doubles the value of the thing(s) rolled.</p>
        <p>Everything else has no bonus.</p>
    </>
)

const wildMagicExplanation = (
    <>
        <p><strong>Shaping Time</strong> 7 seconds</p>
        <p><strong>Fallout</strong> 5 Stress</p>
        <p></p>
        <p>Range, Duration, and Effect have random modifiers.</p>
        <p></p>
        <p>Range is modified by d10! - 5: this is added or subtracted from the second to right’s digit place</p>
        <p>Interval is modified by d6! - 3</p>
        <p>Effect is modified by d20! - 10</p>
        <p></p>
        <p>If 2 dice explode, a Wild Surge occurs: double everything.</p>
    </>
)

// this needs to take a parameter due to the spell number die being different based on the monster
const vancianExplanation = (spellnumberdie: string) => {
    return (
        <>
            <p><strong>Spell Number Die</strong> {spellnumberdie}</p>
            <p><strong>Fallout</strong> None</p>
            <p></p>
            <p>When you cast a spell, roll the Spell Number Die: on a 1, that dice shrinks one dice size.</p>
            <p></p>
            <p>You can get additional points to buff the spell but that increases the chance of shrinking the Spell Number
                Die.</p>
            <p>So, if you start with a d8 and want 3 additional points to spend to buff the spell, if you roll 1 - 4, that
                dice shrinks to a d6.</p>
            <p></p>
            <p>You can’t get a bonus higher than the dice size - 1 (so, for a d8, the highest bonus is +7)</p>
            <p></p>
            <p>When your dice shrinks to below a d4, you’ve run out of spells.</p>
            <p></p>
            <p>Victims recieve a save: d20! + d10! + 10 vs d20! + their level.</p>
        </>
    )
}

const manifestingExplanation = (
    <>
        <p>The longer you wait, the more points you get to spend.</p>
        <p></p>
        <p>You get 1 point per 10 seconds, compounding (1 after 10 secs, 2 after 20 secs, 4 after 30 secs, 8 after 40
            secs, etc)</p>
        <p></p>
        <p><strong>Fallout</strong> 1 damage for each point added to the pool</p>
    </>
)

const adamicCommandingExplanation = (
    <>
        <p><strong>Fallout</strong> 6 Stress + 1 for each spell spoken in the last 24 hours</p>
        <p></p>
        <p>Shaping time is random and based around d4!s; the result is the shaping time in seconds AND the points you can
            use to modify the spell.</p>
        <p>This is applied to effect, interval, or range but is applied per dice, although they can be doubled up.</p>
        <p></p>
        <p>So, if you roll 4 d4!s and get a 1, a 3, a 3, and a 2. You can apply the first die to the effect (giving it 1
            point), the second and third to the interval (giving it 6 points), and the fourth to the range (giving it 3
            points)
            and a total casting time of 9 seconds.</p>
    </>
)

const bloodPactExplanation = (
    <>
        <p>Deal 1 point of damage per second for each person with 10 ft (including the weird-adept): gain 1 point each time damage done regardless of how much.</p>
        <p>Whenever someone takes damage within 25ft, gain 1 point.</p>
        <p></p>
        <p>Each spell takes a minimum of 10 points to cast: additional points beyond that can be used to buff the spell.
        </p>
    </>
)
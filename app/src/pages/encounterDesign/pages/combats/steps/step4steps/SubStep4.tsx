export default function SubStep4() {
    return (
        <div>
            <p>Now reference the Role Types you’ve picked and select 1 - 5 Patterns from the list. Don’t be afraid to double / triple / etc up on Patterns.</p>
            <p>The percentages in the last step is a guideline: as long as you get close, you’re good. But you can balance things out by selecting a Pattern that actively works against a defender’s Role Types. You typically want at least one for the players to possibly leverage.</p>
            <div className="battlefield-preferences">
                <div>
                    <h2>Artillery</h2>
                    {formatBattlefieldNotes(artillery)}
                </div>
                <div>
                    <h2>Brute</h2>
                    {formatBattlefieldNotes(brute)}
                </div>
                <div>
                    <h2>Defender</h2>
                    {formatBattlefieldNotes(defender)}
                </div>
                <div>
                    <h2>Duelist</h2>
                    {formatBattlefieldNotes(duelist)}
                </div>
                <div>
                    <h2>Shock</h2>
                    {formatBattlefieldNotes(shock)}
                </div>
                <div>
                    <h2>Skirmisher</h2>
                    {formatBattlefieldNotes(skirmisher)}
                </div>
            </div>
            <table className="float-right">
                <tbody>
                    <tr>
                        <td>1 - 2</td>
                        <td>Open Field</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Divide</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Danger Wall</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Pillar</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Guardian / Pincer</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>Funnel</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>Horseshoe</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>Long-Path</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>Alley</td>
                    </tr>
                    <tr>
                        <td>11</td>
                        <td>Up-Hill</td>
                    </tr>
                    <tr>
                        <td>12</td>
                        <td>King of the Hill</td>
                    </tr>
                </tbody>
            </table>
            
            <h1>Roll Randomly</h1>
            <p>For all the other Patterns, you can roll randomly on the table below. Note that you don’t have to worry about a Pattern’s effect on a Role Type.</p>

            <h1 className="italic">Example</h1>
            <p className="italic">So, I kind of have an image of an old shack, just off the road, that the outlaws are holed up in so I’m going to pick King-of-the-Hill (which represents the shack and which I can put the Artillery on top of) and Long-Path (possibly a winding path leading up to the shack).</p>
            <p className="italic">I’m going to roll for a random Pattern: this will put me at 66% in favor of the defenders but that’s okay - it’s close enough. I got Alley. I don’t have to do so at this stage but I can’t help myself thinking about what that means: my mind thinks of a cliffs on one side and a river on the other.</p>
        </div>
    )
}

function formatBattlefieldNotes([good, bad]: string[][]) {
    return (
        <>
            {good.map((field, index) => <p key={index}>+ {field}</p>)}
            {bad.map((field, index) => <p key={index}>- {field}</p>)}
        </>
    )
}

const artillery = [
    ['Divide', 'Alley', 'Danger Wall', 'Long-Path', 'Up-Hill', 'King-of-the-Hill'],
    ['Open Field']
]

const brute = [
    ['Divide', 'Danger Wall', 'Guardian', 'Pincer', 'Funnel', 'Horseshoe', 'Long-Path', 'Alley', 'King-of-the-Hill'],
    ['Open Field', 'Pillar', 'Up-Hill']
]

const defender = [
    ['Danger Wall', 'Pillar', 'Guardian', 'Funnel', 'Horseshoe', 'Long-Path', 'Alley', 'Up-Hill', 'King-of-the-Hill'],
    ['Open Field', 'Pincer']
]

const duelist = [
    ['Open Field', 'Pillar', 'Guardian', 'Pincer', 'Funnel', 'Horseshoe', 'Long-Path', 'Alley', 'Up-Hill'],
    ['Divide', 'King-of-the-Hill']
]

const shock = [
    ['Open Field', 'Pillar', 'Pincer', 'Up-Hill'],
    ['Divide', 'Guardian', 'Funnel', 'Horseshoe', 'Long-Path', 'Alley', 'King-of-the-Hill']
]

const skirmisher = [
    ['Open Field', 'Divide'],
    ['Danger Wall', 'Alley', 'King-of-the-Hill']
]
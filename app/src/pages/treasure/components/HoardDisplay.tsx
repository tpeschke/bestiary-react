interface Props {
    hoard: Hoard
}

export interface Hoard {
    hoardType: string,
    baseline: [string, string, string, string, string]
    applicableTables?: string[],
    consumables?: string[],
    extraTreasure: [
        [string, string],
        [string, string],
        [string, string],
        [string, string],
        [string, string, string],
    ],
    notes?: string
}

export default function HoardDisplay({ hoard }: Props) {
    const { hoardType, baseline, applicableTables, consumables, extraTreasure, notes } = hoard
    const [dismal, poor, average, rich, mythic] = extraTreasure

    const treasureLevels: string[] = [
        'Dismal', 'Poor', 'Average', 'Rich', 'Mythic'
    ]

    return (
        <div className='card-background hoard-card'>
            <h2 className="border">{hoardType}</h2>
            <div className="upper-card">
                <div>
                    <h3>Baseline Treasure</h3>
                    {baseline.map((treasure, index) => {
                        return (
                            <div key={index}>
                                <p><em>{treasureLevels[index]}</em></p>
                                <p>{treasure}</p>
                            </div>
                        )
                    })}
                </div>
                {applicableTables && (
                    <div>
                        <h3>Applicable Tables</h3>
                        {applicableTables.map((table, index) => <p key={index}> {table}</p>)}

                        {consumables && (
                            <>
                                <h3>Consumables</h3>
                                {consumables.map((consumable, index) => <p key={index}> {consumable}</p>)}
                            </>
                        )}
                    </div>
                )}
            </div>

            <div className="treasure-extras">
                <h3>Extra Treasure</h3>
                <div>
                    <p>Dismal (d4)</p>
                    <p>1</p>
                    <p>Nothing Extra</p>
                </div>
                <div>
                    <p></p>
                    <p>2</p>
                    <p>{dismal[0]}</p>
                </div>
                <div className="bottom-border">
                    <p></p>
                    <p>3</p>
                    <p>{dismal[1]}</p>
                </div>
                <div>
                    <p>Poor (d4 + 2)</p>
                    <p>4</p>
                    <p>{poor[0]}</p>
                </div>
                <div className="bottom-border">
                    <p></p>
                    <p>5</p>
                    <p>{poor[1]}</p>
                </div>
                <div>
                    <p>Average (d4 + 4)</p>
                    <p>6</p>
                    <p>{average[0]}</p>
                </div>
                <div className="bottom-border">
                    <p></p>
                    <p>7</p>
                    <p>{average[1]}</p>
                </div>
                <div>
                    <p>Rich (d4 + 6)</p>
                    <p>8</p>
                    <p>{rich[0]}</p>
                </div>
                <div className="bottom-border">
                    <p></p>
                    <p>9</p>
                    <p>{rich[1]}</p>
                </div>
                <div>
                    <p>Mythic (d4 + 6)</p>
                    <p>10</p>
                    <p>{mythic[0]}</p>
                </div>
                <div>
                    <p></p>
                    <p>11</p>
                    <p>{mythic[1]}</p>
                </div>
                <div>
                    <p></p>
                    <p>12</p>
                    <p>{mythic[2]}</p>
                </div>
            </div>

            {notes && <p id="notes"><strong>Note</strong> {notes}</p>}
        </div>
    )
}
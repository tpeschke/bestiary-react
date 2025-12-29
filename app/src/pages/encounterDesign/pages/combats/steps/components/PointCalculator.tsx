import { useState } from "react"
import Icon from "../../../../../../components/icon/Icon"

interface EnemyObjects {
    'None': EnemyObject,
    'Lesser': EnemyObject,
    'Veteran': EnemyObject,
    'Champion': EnemyObject,
    'Officer': EnemyObject,
    'Tyrant': EnemyObject,
    'Solo': EnemyObject
}

interface EnemyObject {
    multiplier: number,
    '-2': number,
    '-1': number,
    '0': number,
    '1': number,
    '2': number,
}

type Secondary = keyof EnemyObjects

type SkullModOptions = "-2" | "-1" | "0" | "1" | "2"

export default function PointCalculator() {
    const [characters, setCharacters] = useState(0)
    const [followers, setFollowers] = useState(0)
    const [skullMod, setSkullMod] = useState<SkullModOptions>("0")

    const [enemies, setEnemies] = useState<EnemyObjects>({
        'None': {
            multiplier: 2,
            '-2': 0,
            '-1': 0,
            '0': 0,
            '1': 0,
            '2': 0,
        },
        'Lesser': {
            multiplier: 1,
            '-2': 0,
            '-1': 0,
            '0': 0,
            '1': 0,
            '2': 0,
        },
        'Veteran': {
            multiplier: 4,
            '-2': 0,
            '-1': 0,
            '0': 0,
            '1': 0,
            '2': 0,
        },
        'Champion': {
            multiplier: 2,
            '-2': 0,
            '-1': 0,
            '0': 0,
            '1': 0,
            '2': 0,
        },
        'Officer': {
            multiplier: 4,
            '-2': 0,
            '-1': 0,
            '0': 0,
            '1': 0,
            '2': 0,
        },
        'Tyrant': {
            multiplier: 2,
            '-2': 0,
            '-1': 0,
            '0': 0,
            '1': 0,
            '2': 0,
        },
        'Solo': {
            multiplier: 8,
            '-2': 0,
            '-1': 0,
            '0': 0,
            '1': 0,
            '2': 0,
        }
    })

    const calculateEnemyPoints = (enemyObjects: EnemyObjects) => {
        let total = 0

        for (let stringKey in enemyObjects) {
            const key = stringKey as Secondary
            const enemy = enemyObjects[key]

            total += (enemy["-2"] * enemy.multiplier) / 4
            total += (enemy["-1"] * enemy.multiplier) / 2
            total += enemy["0"] * enemy.multiplier
            total += enemy["1"] * enemy.multiplier * 2
            total += enemy["2"] * enemy.multiplier * 4
        }

        return total
    }

    const enemyPoints = calculateEnemyPoints(enemies)

    const setNumber = (value: number, secondary: Secondary, skullMod: SkullModOptions) => {
        const copiedEnemy = { ...enemies[secondary], [skullMod]: value }
        setEnemies({ ...enemies, [secondary]: copiedEnemy })
    }

    const updateSkullMod = (event: any) => {
        const value = event.target.value as number

        if (value >= -2 && value <= 2) {
            // I want to have this so that users can just increment or decrement the number but, for the negatives to work
            // as object keys, they need to be strings. With the check, I can verify everything is legit so Typescript 
            // can be ignored in this specific case
            // @ts-ignore
            setSkullMod(`${value}`)
        }
    }

    return (
        <div className='combat-calculator' onClick={event => event.stopPropagation()}>
            <div>
                <div>
                    <strong>Encounter Points</strong>
                    <p className="bottom-border">{enemyPoints} / {followers + (characters * 2)}</p>
                    <p>Character Number</p>
                    <input type='number' onChange={event => setCharacters(+event.target.value)} />
                    <p>Follower Number</p>
                    <input type='number' onChange={event => setFollowers(+event.target.value)} />
                </div>

                <div>
                    <span>
                        <input type='number' value={+skullMod} max={2} min={-2} onChange={updateSkullMod} />
                        <h2>Skull Modifier</h2>
                    </span>

                    <table>
                        <thead>
                            <tr>
                                <th colSpan={5}>Skull Modifier</th>
                                <th colSpan={3}> </th>
                            </tr>
                            <tr>
                                <th>-2</th>
                                <th>-1</th>
                                <th>0</th>
                                <th>1</th>
                                <th>2</th>
                                <th>Secondary</th>
                                <th> </th>
                                <th>Multiplier</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formatTableRow(enemies.Lesser, 'Lesser', skullMod, setNumber)}
                            {formatTableRow(enemies.None, 'None', skullMod, setNumber)}
                            {formatTableRow(enemies.Champion, 'Champion', skullMod, setNumber)}
                            {formatTableRow(enemies.Tyrant, 'Tyrant', skullMod, setNumber)}
                            {formatTableRow(enemies.Veteran, 'Veteran', skullMod, setNumber)}
                            {formatTableRow(enemies.Officer, 'Officer', skullMod, setNumber)}
                            {formatTableRow(enemies.Solo, 'Solo', skullMod, setNumber)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function formatTableRow(enemies: EnemyObject, secondary: Secondary, skullMod: SkullModOptions, setNumber: Function) {
    const skullMultiplierDictionary: { [key: string]: number } = {
        "-2": 0.25,
        "-1": 0.5,
        "0": 1,
        "1": 2,
        "2": 4
    }

    return (
        <tr>
            <td>{enemies["-2"]}</td>
            <td>{enemies["-1"]}</td>
            <td>{enemies["0"]}</td>
            <td>{enemies["1"]}</td>
            <td>{enemies["2"]}</td>
            <td>{secondary}</td>
            <td>
                <button onClick={_ => setNumber(++enemies[skullMod], secondary, skullMod)}><Icon iconName='plus' /></button>
                <button onClick={_ => setNumber(--enemies[skullMod], secondary, skullMod)} disabled={enemies[skullMod] === 0}><Icon iconName='minus' /></button>
            </td>
            <td>{enemies.multiplier * skullMultiplierDictionary[skullMod]}</td>
        </tr>
    )
}
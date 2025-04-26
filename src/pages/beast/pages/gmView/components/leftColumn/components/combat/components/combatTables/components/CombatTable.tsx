import '../CombatTables.css'

import { CombatStat } from '../../../../../../../../../interfaces/infoInterfaces.ts/combatInfoInterfaces'

interface Props {
    combatTable: CombatStat
}

export default function CombatTables({ combatTable }: Props) {
    const { name } = combatTable
    return (
        <div className='combat-table-shell'>
            <h4>{name}</h4>
            <table>
                <tr>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Country</th>
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                </tr>
                <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                </tr>
            </table>
        </div>
    )
}
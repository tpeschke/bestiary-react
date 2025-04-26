import './CombatTables.css'

import { CombatStat } from '../../../../../../../../interfaces/infoInterfaces.ts/combatInfoInterfaces'

import CombatTable from './components/CombatTable'

interface Props {
    combatStats: CombatStat[]
}

export default function CombatTables({ combatStats }: Props) {
    return (
        <div className='combat-stats-shell'>
            {combatStats.map(combatTable => <CombatTable combatTable={combatTable} />) }
        </div>
    )
}
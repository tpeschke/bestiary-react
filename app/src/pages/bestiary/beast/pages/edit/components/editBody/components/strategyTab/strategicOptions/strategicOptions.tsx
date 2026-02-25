import './strategicOptions.css'
import { StrategicOptions } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import { UpdateFunction } from "../../../../../../../hooks/updateUtilities/interfaces/updateInterfaces";
import AddStrategicObstaclesDisplay from './components/addStrategicObstacles';
import AddStrategicCustomsDisplay from './components/addCustoms';
import AddStrategicOtherDisplay from './components/addOther';

interface Props {
    options: StrategicOptions,
    updateCombatInfo: UpdateFunction
}

export default function StrategicOptionsDisplay({ options, updateCombatInfo }: Props) {

    return (
        <>
            <h2 className="border">Strategies</h2>
            <AddStrategicObstaclesDisplay options={options} updateCombatInfo={updateCombatInfo} />
            <AddStrategicCustomsDisplay options={options} updateCombatInfo={updateCombatInfo} />
            <AddStrategicOtherDisplay options={options} updateCombatInfo={updateCombatInfo} />
        </>
    )
} 
import './strategicOptions.css'
import { StrategicObstacles, StrategicOptions } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import { UpdateFunction } from "../../../../../../../hooks/updateUtilities/interfaces/updateInterfaces";
import { useState } from "react";
import ComboBox from 'react-responsive-combo-box'
import axios from "axios";
import { obstacleSearchByNameURL } from "../../../../../../../../../../frontend-config";
import Icon from '../../../../../../../../../../components/icon/Icon';
import AddStrategicObstaclesDisplay from './components/addStrategicObstacles';

interface Props {
    options: StrategicOptions,
    updateCombatInfo: UpdateFunction
}

export default function StrategicOptionsDisplay({ options, updateCombatInfo }: Props) {

    return (
        <>
            <h2 className="border">Strategies</h2>
            <AddStrategicObstaclesDisplay options={options} updateCombatInfo={updateCombatInfo} />

            <h3>Customs</h3>

            <h3>Other</h3>
        </>
    )
} 
import { Climate } from '../../../../../../../interfaces/infoInterfaces.ts/linkedInfoInterfaces'
import ClimateDisplay from './climateDisplay/ClimateDisplay'
import './ClimatesDisplay.css'

interface Props {
    climates: Climate[]
}

export default function ClimatesDisplay({ climates }: Props) {

    return (
        <div className='climates-display-shell'>
            <h3>Climates</h3>
            <div>
                {climates.map((climate, index) => <ClimateDisplay key={index} climate={climate} />)}
            </div>
        </div >
    )
}
import { Climate } from '../../../../../../../../interfaces/infoInterfaces/linkedInfoInterfaces'
import './ClimateDisplay.css'

interface Props {
    climate: Climate
}

export default function ClimateDisplay({ climate }: Props) {
    const { climate: climateName, code, examples } = climate

    let tooltip = examples
    code ? tooltip += `\nKöppen Climate Classification:  ${code}` : null
    tooltip += '\nClick to Search for other monsters in this climate.'

    return (
        <button className='climate-display' data-tooltip-id="my-tooltip" data-tooltip-content={tooltip}>{climateName}</button>
    )
}
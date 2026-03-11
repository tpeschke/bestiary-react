import './VariantDisplay.css'

import { Variant } from "@bestiary/common/interfaces/beast/infoInterfaces/linkedInfoInterfaces"
import { Link } from 'react-router-dom'

interface Props {
    variantInfo: Variant
}

export default function VariantDisplay({ variantInfo }: Props) {
    const { name, variantid } = variantInfo
    return (
        <Link to={`/beast/${variantid}`}>
            <button className='variant-display'>{name}</button>
        </Link>
    )
}
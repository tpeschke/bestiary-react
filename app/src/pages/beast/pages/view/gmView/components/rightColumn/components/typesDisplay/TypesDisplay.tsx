import './TypesDisplay.css'

import { BeastType } from "../../../../../../../interfaces/infoInterfaces/linkedInfoInterfaces"

import Drawers from "../../../../../../../../../components/drawers/Drawers"
import HTMLDisplay from '../../../../../../../components/UI/htmlDisplay/htmlDisplay'
import { Link } from 'react-router-dom'
import Drawer from '../../../../../../../../../components/drawers/components/Drawer'

interface Props {
    types: BeastType[]
}

export default function TypesDisplay({ types }: Props) {
    return (
        <>
            {types.length > 0 &&
                <div className='types-display-shell'>
                    <h2 className='border'>Types</h2>
                    <Drawers>
                        {types.map((type, index) => formatType(index, type))}
                    </Drawers>
                </div>
            }
        </>
    )
}

function formatType(index: number, { type, description, typeid }: BeastType) {
    return (
        <Drawer key={index} label={type}>
            <div className='type-description-shell'>
                <HTMLDisplay html={description} />
                <Link to={`/search?types=${typeid}`}>
                    <button>See More {type}s</button>
                </Link>
            </div>
        </Drawer>
    )
}
import './TypesDisplay.css'

import { BeastType } from "../../../../../../../interfaces/infoInterfaces/linkedInfoInterfaces"

import Drawers, { DrawerObject } from "../../../../../../../../../components/drawers/Drawers"
import HTMLDisplay from '../../../../../../../components/UI/htmlDisplay/htmlDisplay'
import { Link } from 'react-router-dom'

interface Props {
    types: BeastType[]
}

export default function TypesDisplay({ types }: Props) {
    const formatedTypes = types.map(type => formatType(type))

    return (
        <>
            {types.length > 0 &&
                <div className='types-display-shell'>
                    <h2 className='border'>Types</h2>
                    <Drawers drawerInnards={formatedTypes} />
                </div>
            }
        </>
    )
}

function formatType({ type, description, typeid }: BeastType): DrawerObject {
    return {
        label: type,
        innards: (
            <div className='type-description-shell'>
                <HTMLDisplay html={description} />
                <Link to={`/search?types=${typeid}`}>
                    <button>See More {type}s</button>
                </Link>
            </div>
        )
    }
}
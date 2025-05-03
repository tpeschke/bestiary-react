import './TypesDisplay.css'

import { BeastType } from "../../../../../../interfaces/infoInterfaces.ts/linkedInfoInterfaces"

import Drawers, { DrawerObject } from "../../../../../../../../components/drawers/Drawers"
import HTMLDisplay from '../../../../../../components/UI/htmlDisplay/htmlDisplay'

interface Props {
    types: BeastType[]
}

export default function TypesDisplay({ types }: Props) {
    const formatedTypes = types.map(type => formatType(type))

    return (
        <div className='types-display-shell'>
            <h2 className='border'>Types</h2>
            <Drawers drawerInnards={formatedTypes} />
        </div>
    )
}

function formatType({ typeName, description }: BeastType): DrawerObject {
    return {
        label: typeName,
        innards: (
            <div className='type-description-shell'>
                <HTMLDisplay html={description} />
                <button>See More {typeName}s</button>
            </div>
        )
    }
}
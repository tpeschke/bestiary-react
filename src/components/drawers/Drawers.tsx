import Drawer from './components/Drawer'
import './Drawers.css'

import { JSX, useState } from 'react'

interface Props {
    drawerInnards: DrawerObject[]
}

export interface DrawerObject {
    label: string,
    innards: JSX.Element
}

export default function Drawers({ drawerInnards }: Props) {
    const [openIndex, setOpenIndex] = useState()

    return (
        <div className='drawers-shell'>
            {drawerInnards.map(({ label, innards }, index) => <Drawer key={index} label={label} innards={innards} isOpen={openIndex === index} index={index} openDrawer={setOpenIndex} />)}
        </div>
    )
}
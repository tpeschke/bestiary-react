import Drawer from './components/Drawer'
import './Drawers.css'

import { JSX, useEffect, useState } from 'react'

interface Props {
    drawerInnards: DrawerObject[],
    closeDrawer?: boolean
}

export interface DrawerObject {
    label: string,
    subtitle?: string,
    innards: JSX.Element
}

export default function Drawers({ drawerInnards, closeDrawer = false }: Props) {
    const [openIndex, setOpenIndex] = useState<number|null>(null)

    useEffect(() => {
        if (closeDrawer) {
            setOpenIndex(null)
        }
    }, [closeDrawer])

    return (
        <div className='drawers-shell'>
            {drawerInnards.map(({ label, subtitle, innards }, index) => <Drawer key={index} label={label} subtitle={subtitle} innards={innards} isOpen={openIndex === index} index={index} openDrawer={setOpenIndex} />)}
        </div>
    )
}
import Drawer from './components/Drawer'
import './Drawers.css'

import { Children, cloneElement, JSX, useEffect, useState } from 'react'

interface Props {
    children: JSX.Element | JSX.Element[],
    closeDrawer?: boolean
}

export interface DrawerObject extends JSX.Element {
    subtitle?: string,
    children: JSX.Element
}

export default function Drawers({ children, closeDrawer = false }: Props) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    useEffect(() => {
        if (closeDrawer) {
            setOpenIndex(null)
        }
    }, [closeDrawer])

    return (
        <div className='drawers-shell'>
            {Children.map(children, (child, index) => {
                return cloneElement(child, { isOpen: openIndex === index, index, openDrawer: setOpenIndex })
            })}
        </div>
    )
}
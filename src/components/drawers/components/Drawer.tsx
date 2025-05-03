import './Drawer.css'

import { JSX } from 'react'

interface Props {
    label: string,
    innards: JSX.Element,
    isOpen: boolean,
    index: number,
    openDrawer: Function
}

export default function Drawer({ label, innards, isOpen, index, openDrawer }: Props) {
    let classShellString = 'drawer-shell'
    isOpen ? classShellString += ' open' : ''

    index > 0 && isOpen ? classShellString += ' open-top-margin' : ''

    const indexToSetTo: null | number = isOpen ? null : index

    return (
        <div className={classShellString} onClick={_=>openDrawer(indexToSetTo)}>
            <h3>{label}</h3>
            <div className='drawer-innards'>
                {innards}
            </div>
        </div>
    )
}
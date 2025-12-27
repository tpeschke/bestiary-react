import Icon from '../../icon/Icon'
import './Drawer.css'

import { JSX } from 'react'

interface Props {
    label: string,
    subtitle?: string,
    children: JSX.Element,
    isOpen?: boolean,
    index?: number,
    openDrawer?: Function
}

export default function Drawer({ label, subtitle, children, isOpen, index = 0, openDrawer = () => {} }: Props) {
    let classShellString = 'drawer-shell'
    isOpen ? classShellString += ' open' : ''

    index > 0 && isOpen ? classShellString += ' open-top-margin' : ''

    const indexToSetTo: null | number = isOpen ? null : index

    return (
        <div className={classShellString} onClick={_ => openDrawer(indexToSetTo)}>
            <div className='drawer-header-shell'>
                <h3>{label}</h3>
                {subtitle && <p>{subtitle}</p>}
                <div className='icon-shell'>
                    <Icon iconName={isOpen ? 'up' : 'down'} />
                </div>
            </div>
            <div className='drawer-innards'>
                {children}
            </div>
        </div>
    )
}
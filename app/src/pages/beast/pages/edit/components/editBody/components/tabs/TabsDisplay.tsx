import { Fragment, useState } from 'react'
import './tabs.css'

interface Props {
    setTabIndex: (tabIndex: number) => void,
    tabIndex: number
}

export default function Tabs({ setTabIndex, tabIndex }: Props) {
    const tabs: string[] = [
        'Confrontations',
        'Combats',
        'Challenges'
    ]

    return (
        <div className="tabs-shell">
            {
                tabs.map((tab, index) => {
                    return (
                        <Fragment key={index}>
                            <button  className={index === tabIndex ? 'active' : ''} onClick={_ => setTabIndex(index)}>{tab}</button>
                            <div className='space'></div>
                        </Fragment>
                    )
                })
            }
            <div className='space leftOver'></div>
        </div>
    )
}
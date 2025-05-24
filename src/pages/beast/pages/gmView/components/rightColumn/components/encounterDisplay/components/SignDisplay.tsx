import "../EncounterDisplay.css"

import { useState } from "react"

import { SignObject } from "../interfaces/EncounterInterfaces"

import Icon from "../../../../../../../../../components/icon/Icon"
import Table, { TableObject } from "../../../../../../../../../components/table/Table"

interface Props {
    signInfo: SignObject
}

export default function SignDisplay({ signInfo }: Props) {
    const [showTables, setShowTable] = useState(false)

    const { beastSign, allSigns } = signInfo

    const allSignsTable: TableObject = {
        title: 'All Signs for Entry',
        headerRow: ['Value', 'Weight'],
        rows: allSigns.map(sign => [sign.sign, sign.weight])
    }

    return (
        <>
            {signInfo &&
                <div className="sign-display-shell">
                    <div className="pair-shell">
                        <h3>Sign <Icon iconName="info" tooltip="Signs are evidence of the monster's passing or evidence that the monster is near. They can be sights, sounds, leavings, victims, tracks, smells & vapors, environmental damage, and/or intentional markings." /></h3>
                        <p onClick={_ => setShowTable(!showTables)} className="hidden-button">{beastSign.sign} <Icon iconName={showTables ? 'up' : 'down'} /></p>
                    </div>
                    <div className={showTables ? 'sign-table-shell' : 'display-none'}>
                        <Table table={allSignsTable} textAlign='second-column-center' />
                    </div>
                </div>
            }
        </>
    )
}
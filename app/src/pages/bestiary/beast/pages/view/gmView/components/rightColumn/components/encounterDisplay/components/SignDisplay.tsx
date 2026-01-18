import Icon from "../../../../../../../../../../../components/icon/Icon"
import Table, { TableObject } from "../../../../../../../../../../../components/table/Table"
import "../EncounterDisplay.css"

import { SignObject } from "../interfaces/EncounterInterfaces"

interface Props {
    signInfo: SignObject
}

export default function SignDisplay({ signInfo }: Props) {
    const { beastSign, allSigns } = signInfo

    const allSignsTable: TableObject = {
        title: 'All Signs for Entry',
        headerRow: ['Value', 'Weight'],
        rows: allSigns.map(sign => [sign.sign, sign.weight])
    }

    const htmlTooltip = {
        component: Table({table: allSignsTable, textAlign: "second-column-center"}),
        id: 'sign-table'
    }

    return (
        <>
            {signInfo &&
                <div className="sign-display-shell">
                    <div className="pair-shell secondary-div">
                        <h3>Sign <Icon iconName="info" tooltip="Signs are evidence of the monster's passing or evidence that the monster is near. They can be sights, sounds, leavings, victims, tracks, smells & vapors, environmental damage, and/or intentional markings." /></h3>
                        <div><p>{beastSign.sign}</p> <Icon iconName="table" htmlTooltip={htmlTooltip} /></div>
                    </div>
                </div>
            }
        </>
    )
}
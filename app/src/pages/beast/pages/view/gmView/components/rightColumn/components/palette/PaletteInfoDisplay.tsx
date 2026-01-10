import './PaletteInfoDisplay.css'
import { Palette } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import Body from "../../../../../../../components/UI/body/Body"
import Pair, { PairIconSettings } from "../../../../../../../components/UI/pair/Pair"

interface Props {
    palette: Palette
}

export default function PaletteInfoDisplay({ palette }: Props) {
    const { drives, needs, defenses, logistics, methods, groupDescriptions } = palette

    if (!drives && !needs && !defenses && !logistics && !methods && !groupDescriptions) {
        return <></>
    }

    const drivesIcon: PairIconSettings = {
        iconName: 'info',
        tooltip: 'The instinctual thing that this entry moves towards.\nThis gives you a direction for any given action.'
    }

    const needsIcon: PairIconSettings = {
        iconName: 'info',
        tooltip: 'These are things that the monster can\'t go without.\nIf denied these things, they’ll slowly die.'
    }

    const defensesIcon: PairIconSettings = {
        iconName: 'info',
        tooltip: 'How the monsters secure and safeguard its needs.\nThese protect stores of Needs, which the players can siege or assault to deny Needs.'
    }

    const logisticsIcon: PairIconSettings = {
        iconName: 'info',
        tooltip: 'How the monster gets, expands, and transfers its needs.\nThese are things your players can attack to keep Defenses from resupplying their Needs.'
    }

    const methodsIcon: PairIconSettings = {
        iconName: 'info',
        tooltip: 'How it responds to threats, and/or moves towards its Drive.\nAfter the players attack, this is how the monster responds.'
    }

    const groupDescriptionsIcon: PairIconSettings = {
        iconName: 'info',
        tooltip: 'How you would describe a monster\'s defenses, logistics, equipment, and how you would describe how they act in a group.\nPlayers can leverage this to help their war, influencing the whole in ways they can’t influence an individual or smaller group.'
    }

    return (
        <div className='palette-display-shell'>
            <h2 className='border'>Palette</h2>
            <Body>
                <>
                    {drives && <Pair title='Drives' info={drives} icon={drivesIcon} />}
                    {needs && <Pair title='Needs' info={needs} icon={needsIcon} />}
                    {defenses && <Pair title='Defenses' info={defenses} icon={defensesIcon} />}
                    {logistics && <Pair title='Logistics' info={logistics} icon={logisticsIcon} />}
                    {methods && <Pair title='Methods' info={methods} icon={methodsIcon} />}
                    {groupDescriptions && <Pair title='Group Descriptions' info={groupDescriptions} icon={groupDescriptionsIcon} />}
                </>
            </Body>
        </div>
    )
}
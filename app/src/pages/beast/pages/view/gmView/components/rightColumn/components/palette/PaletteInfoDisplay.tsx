import './PaletteInfoDisplay.css'
import { Palette } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import Body from "../../../../../../../components/UI/body/Body"
import Pair from "../../../../../../../components/UI/pair/Pair"

interface Props {
    palette: Palette
}

export default function PaletteInfoDisplay({ palette }: Props) {
    const { drives, needs, defenses, logistics, methods, groupDescriptions } = palette

    return (
        <div className='palette-display-shell'>
            <h2 className='border'>Palette</h2>
            <Body>
                <>
                    {drives && <Pair title='Drives' info={drives} />}
                    {needs && <Pair title='Needs' info={needs} />}
                    {defenses && <Pair title='Defenses' info={defenses} />}
                    {logistics && <Pair title='Logistics' info={logistics} />}
                    {methods && <Pair title='Methods' info={methods} />}
                    {groupDescriptions && <Pair title='Group Descriptions' info={groupDescriptions} />}
                </>
            </Body>
        </div>
    )
}
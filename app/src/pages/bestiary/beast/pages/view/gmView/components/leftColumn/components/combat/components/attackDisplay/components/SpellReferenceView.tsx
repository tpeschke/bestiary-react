import { SpellReference } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import Body from "../../../../../../../../../../components/UI/body/Body"
import './AttackStats.css'
import { situationTooltip } from "../utilities/situationTooltip"
import Icon from "../../../../../../../../../../../../../components/icon/Icon"

interface Props {
    spellReferenceInfo: SpellReference
}

export default function SpellReferenceView({ spellReferenceInfo }: Props) {
    const { situation, spellInfo } = spellReferenceInfo

    if (!spellInfo) { return <></> }

    return (
        <div className='attack-stats-shell spell-reference'>
            <span data-tooltip-id="my-tooltip" data-tooltip-content={situationTooltip}><h6>{situation}</h6> <p>Spell</p></span>
            <Body>
                <p className='italic'>{spellInfo.name} <Icon iconName="eye" /></p>
            </Body>
        </div>
    )
}
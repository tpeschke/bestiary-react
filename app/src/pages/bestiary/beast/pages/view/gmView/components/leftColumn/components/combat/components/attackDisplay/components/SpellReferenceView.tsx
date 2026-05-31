import { SpellReference } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import Body from "../../../../../../../../../../components/UI/body/Body"
import './AttackStats.css'
import { situationTooltip } from "../utilities/situationTooltip"
import Icon from "../../../../../../../../../../../../../components/icon/Icon"
import { Tooltip } from "react-tooltip"
import SpellDisplay from "../../../../../../weirdshaping/components/spells/spell/SpellDisplay"
import { useSelector } from "react-redux"
import { getSystemPreference } from "../../../../../../../../../../../../../redux/slices/userSlice"

interface Props {
    spellReferenceInfo: SpellReference
}

export default function SpellReferenceView({ spellReferenceInfo }: Props) {
    const systemPreference = useSelector(getSystemPreference) as 0 | 1 | 2 | undefined
    
    const { situation, spellInfo } = spellReferenceInfo

    if (!spellInfo) { return <></> }

    return (
        <>
            <div className='attack-stats-shell spell-reference'>
                <span data-tooltip-id="my-tooltip" data-tooltip-content={situationTooltip}><h6>{situation}</h6></span>
                <Body>
                    <p data-tooltip-id={`${spellInfo.id}-spell-attack-tooltip`} className='italic'>{spellInfo.name} <Icon iconName="eye" /></p>
                </Body>
            </div>
            <Tooltip id={`${spellInfo.id}-spell-attack-tooltip`} className="spell-display-tooltip">
                <SpellDisplay spell={spellInfo} systemPreference={systemPreference} />
            </Tooltip>
        </>
    )
}
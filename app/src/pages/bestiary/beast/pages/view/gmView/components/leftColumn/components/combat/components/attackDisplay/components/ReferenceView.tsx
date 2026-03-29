import { AttackReference } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import Body from "../../../../../../../../../../components/UI/body/Body"
import './AttackStats.css'
import { getTacticInfo } from "../../../../../../../../../../utilities/tacticOptions"
import { situationTooltip, bonfireTacticTooltip, hackMasterTacticTooltip } from "../utilities/situationTooltip"

interface Props {
    referenceInfo: AttackReference
}

export default function ReferenceView({ referenceInfo }: Props) {
    const { system, situation, tactic, reference } = referenceInfo

    return (
        <div className='attack-stats-shell'>
            <span data-tooltip-id="my-tooltip" data-tooltip-content={situationTooltip}><h6>{situation}</h6></span>
            <Body>
                <p className={`italic ${!tactic && 'bottom-margin'}`}>As {reference}</p>
            </Body>
            {tactic &&
                <Body>
                    <p className='italic' data-tooltip-id="my-tooltip" data-tooltip-content={system === 'Bonfire' ? bonfireTacticTooltip : hackMasterTacticTooltip}>
                        + {getTacticInfo(tactic)}
                    </p>
                </Body>
            }
        </div>
    )
}
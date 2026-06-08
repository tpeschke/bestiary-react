import RoleTitle from "../../../roleTitle/RoleTitle"
import SpecialInfo from "../specialInfo/specialInfo"
import CharacteristicsDisplay from "./components/CharacteristicsDisplay"
import { SpecificSocialInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import CapacityDisplay from "./components/CapacityDisplay"

interface Props {
    socialInfo: SpecificSocialInfo
}

export default function ConfrontationSection({ socialInfo }: Props) {
    const { type, socialRole, socialSkulls, socialEpValue, conflicts, attackInfo, defenseInfo, socialSecondary, capacity, isBeast, isSwarm } = socialInfo

    function getBeastBonus() {
        if (type === 'Bonfire' && isBeast) {
            return "<p><strong>Bestial</strong> When this creature gains a negative Emotional State, it doubles its current Rank in that Emotional State and doubles the Rank it's gaining. Any positive Emotional State gain is halved (rounded up).</p>"
        }
        return null
    }

    const beastBonus = getBeastBonus()

    function getSwarmBonus() {
        if (type === 'Bonfire' && isSwarm) {
            return '<p><strong>Swarm</strong> This creature never benefits from the Persuading a Group bonus.</p>'
        }
        return null
    }

    const swarmBonus = getSwarmBonus()

    // if HM info is null, the code uses the Bonfire info to generate it
    // So if we want Bonfire info but not HM info, we need to leave a placeholder, hence to '<p></p>'
    const showDefenseSection = (!!defenseInfo && defenseInfo !== '<p></p>') || beastBonus || swarmBonus
    const showAttackSection = !!attackInfo && attackInfo !== '<p></p>'

    if (socialRole === 'No Personality') {
        return <RoleTitle title={type === 'Bonfire' ? 'Confrontation' : 'Social'} hasBottomBorder={true} skulls={socialSkulls} role={socialRole} />
    }

    return (
        <>
            {type === 'Bonfire' ?
                <RoleTitle title='Confrontation' skulls={socialSkulls} role={socialRole} secondaryRole={socialSecondary} />
                :
                <RoleTitle title="Social" epValue={socialEpValue} role={socialRole} secondaryRole={socialSecondary} linkURL="/encounters/confrontations" />
            }
            {showDefenseSection &&
                <>
                    <h3>Defense Info</h3>
                    <SpecialInfo info={defenseInfo + (beastBonus ?? '') + (swarmBonus ?? '')} />
                </>
            }
            {showAttackSection &&
                <>
                    <h3>Attack Info</h3>
                    <SpecialInfo info={attackInfo} />
                </>
            }
            {capacity.threshold && <CapacityDisplay capacity={capacity.threshold} />}
            <CharacteristicsDisplay characteristicInfo={conflicts} type={type} />
        </>
    )
}
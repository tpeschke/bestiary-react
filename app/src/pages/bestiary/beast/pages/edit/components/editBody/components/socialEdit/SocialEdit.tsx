import Body from '../../../../../../components/UI/body/Body'
import { UpdateSocialInfoFunctionsObject } from '../../../../../../hooks/updateUtilities/updateSocialInfo'
import AttackInfoEdit from '../components/info/AttackInfoEdit'
import DefenseInfoEdit from '../components/info/DefenseInfoEdit'
import './SocialEdit.css'
import { NonspecificSocialInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"

interface Props {
    socialInfo: NonspecificSocialInfo,
    updateSocialInfoFunctions: UpdateSocialInfoFunctionsObject
}

export default function SocialEdit({ socialInfo, updateSocialInfoFunctions }: Props) {
    const { capacity, attackInfo, defenseInfo } = socialInfo
    const { updateSocialInfo } = updateSocialInfoFunctions

    const updateCapacity = () => {
        const newCapacity = {
            ...capacity,
            strength: !capacity.strength ? 'x' : null
        }
        updateSocialInfo('capacity', newCapacity)
    }

    return (
        <div className="social-edit">
            <span className="checkbox-span">
                <input type="checkbox" onChange={updateCapacity} checked={capacity.strength === 'x'} />
                <p>No Capacity</p>
            </span>

            <Body>
                <AttackInfoEdit attackInfo={attackInfo} updateAttackInfo={updateSocialInfo} />
                <DefenseInfoEdit defenseInfo={defenseInfo} updateDefenseInfo={updateSocialInfo} />
            </Body>
        </div>
    )
}
import { UpdateSocialInfoFunctionsObject } from '../../../../../../hooks/updateUtilities/updateSocialInfo'
import SocialAttackInfoEdit from './info/SocialAttackInfoEdit'
import SocialDefenseInfoEdit from './info/SocialDefenseInfoEdit'
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

            <SocialAttackInfoEdit attackInfo={attackInfo} updateAttackInfo={updateSocialInfo} />
            <SocialDefenseInfoEdit defenseInfo={defenseInfo} updateDefenseInfo={updateSocialInfo} />
        </div>
    )
}
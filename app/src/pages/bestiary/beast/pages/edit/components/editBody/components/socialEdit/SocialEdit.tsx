import { UpdateSocialInfoFunctionsObject } from '../../../../../../hooks/updateUtilities/updateSocialInfo'
import './SocialEdit.css'
import SocialInfo from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"

interface Props {
    socialInfo: SocialInfo,
    updateSocialInfoFunctions: UpdateSocialInfoFunctionsObject
}

export default function SocialEdit({ socialInfo, updateSocialInfoFunctions }: Props) {
    const { capacity } = socialInfo
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
        </div>
    )
}
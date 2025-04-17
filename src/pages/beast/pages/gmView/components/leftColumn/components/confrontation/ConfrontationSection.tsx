import SocialInfo from "../../../../../../interfaces/infoInterfaces.ts/socialInfo"

import RoleTitle from "../../../roleTitle/RoleTitle"
import Body from "../../../../../../components/UI/body/Body"
import CharacteristicsDisplay from "./components/CharacteristicsDisplay"

interface Props {
    socialInfo: SocialInfo
}

export default function ConfrontationSection({ socialInfo }: Props) {
    const { socialrole, socialpoints, conflicts } = socialInfo
    return (
        <>
            <RoleTitle title="Confrontation" points={socialpoints} role={socialrole} />
            <Body>
                {conflicts ?
                    <CharacteristicsDisplay characteristicInfo={conflicts} />
                    : <></>
                }
            </Body>
        </>
    )
}
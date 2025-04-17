import SocialInfo from "../../../../../../interfaces/infoInterfaces.ts/socialInfo"

import RoleTitle from "../../../roleTitle/RoleTitle"
import Pair from "../../../../../../components/UI/pair/Pair"
import Body from "../../../../../../components/UI/body/Body"
import Card from "../../../../../../components/UI/card/Card"
import CharacteristicsDisplay from "./components/CharacteristicsDisplay"

interface Props {
    socialInfo: SocialInfo
}

export default function Confrontation({ socialInfo }: Props) {
    const { socialrole, socialpoints, conflicts } = socialInfo
    return (
        <>
            <RoleTitle title="Confrontation" points={socialpoints} />
            <Body>
                <Pair title="Role" info={socialrole} />
            </Body>
            {conflicts ?
                <Card>
                    <CharacteristicsDisplay characteristicInfo={conflicts} />
                </Card>
                : <></>
            }
        </>
    )
}
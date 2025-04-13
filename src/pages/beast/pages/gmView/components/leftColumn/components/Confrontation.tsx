import SocialInfo from "../../../../../interfaces/infoInterfaces.ts/socialInfo"
import RoleTitle from "../../roleTitle/RoleTitle"

interface Props {
    socialInfo: SocialInfo
}

export default function Confrontation({ socialInfo }: Props) {
    const { socialrole, socialpoints } = socialInfo
    return (
        <>
            <RoleTitle title="Confrontation" points={socialpoints} />
            <div>
                <h3>Role</h3>
                <p>{socialrole}</p>
            </div>
        </>
    )
}
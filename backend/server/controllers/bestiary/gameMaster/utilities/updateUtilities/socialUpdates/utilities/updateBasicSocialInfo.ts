import query from "../../../../../../../db/database";
import SocialInfo from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces";

export default async function updateBasicSocialInfo(beastID: number, socialInfo: SocialInfo) {
    const sqlQuery = `update bbindividualbeast
    set socialSkulls = $2, socialrole = $3, socialsecondary = $4
    where id = $1`

    const { socialSkulls, socialRole, socialSecondary } = socialInfo

    return query(sqlQuery, [beastID, socialSkulls, socialRole, socialSecondary])
}
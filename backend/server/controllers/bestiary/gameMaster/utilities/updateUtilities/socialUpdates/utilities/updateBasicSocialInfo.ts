import query from "../../../../../../../db/database";
import SocialInfo from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces";

export default async function updateBasicSocialInfo(beastID: number, socialInfo: SocialInfo) {
    const sqlQuery = `update bbIndividualBeast
    set socialSkulls = $2, socialRole = $3, socialSecondary = $4, capacity = $5
    where id = $1`

    const { socialSkulls, socialRole, socialSecondary, capacity } = socialInfo

    return query(sqlQuery, [beastID, socialSkulls, socialRole, socialSecondary, capacity.strength])
}
import query from "../../../../../../db/database";
import SocialInfo from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces";

export default async function updateBasicSocialInfo(beastID: number, socialInfo: SocialInfo) {
    const sqlQuery = `update bbindividualbeast
    set socialSkulls = $2
    where id = $1`

    const { socialSkulls } = socialInfo

    return query(sqlQuery, [beastID, socialSkulls])
}
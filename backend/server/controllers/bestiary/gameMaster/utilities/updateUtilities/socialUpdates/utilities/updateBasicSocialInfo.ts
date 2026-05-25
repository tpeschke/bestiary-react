import { BONFIRE, HACKMASTER } from "@bestiary/common/utilities/get/getSystemString";
import query from "../../../../../../../db/database";
import { NonspecificSocialInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces";

export default async function updateBasicSocialInfo(beastID: number, socialInfo: NonspecificSocialInfo) {
    const sqlQuery = `update bbIndividualBeast
    set socialSkulls = $2, socialEpValue = $3, socialRole = $4, socialSecondary = $5, capacity = $6, 
    atk_conf = $7, atk_conf_hm = $8
    where id = $1`

    const { socialSkulls, socialRawEpValue, socialRole, socialSecondary, capacity, attackInfo } = socialInfo

    return query(sqlQuery, [beastID, socialSkulls, socialRawEpValue, socialRole, socialSecondary, capacity.strength,
        attackInfo[BONFIRE], attackInfo[HACKMASTER]
    ])
}
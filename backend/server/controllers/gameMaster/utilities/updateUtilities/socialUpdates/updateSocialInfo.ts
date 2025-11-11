import SocialInfo from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import updateBasicSocialInfo from "./utilities/updateBasicSocialInfo"

export default async function updateSocialInfo(beastID: number, socialInfo: SocialInfo) {

    let promiseArray: Promise<any>[] = [
        updateBasicSocialInfo(beastID, socialInfo)
    ]

    return Promise.all(promiseArray)
}
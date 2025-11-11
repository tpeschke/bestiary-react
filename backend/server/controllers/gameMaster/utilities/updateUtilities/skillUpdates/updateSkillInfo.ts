import SkillInfo from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import updateBasicSkillInfo from "./utilities/updateBasicSkillInfo"

export default async function updateSkillInfo(beastID: number, skillInfo: SkillInfo) {
    let promiseArray: Promise<any>[] = [
        updateBasicSkillInfo(beastID, skillInfo)
    ]

    return Promise.all(promiseArray)
}
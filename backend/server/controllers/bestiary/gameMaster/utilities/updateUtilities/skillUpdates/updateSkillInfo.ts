import SkillInfo from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import updateBasicSkillInfo from "./utilities/updateBasicSkillInfo"
import updateSkillSuites from "./utilities/updateSkillSuites"

export default async function updateSkillInfo(beastID: number, skillInfo: SkillInfo) {
    let promiseArray: Promise<any>[] = [
        updateBasicSkillInfo(beastID, skillInfo, skillInfo.skills?.everythingElseStrength),
        updateSkillSuites(beastID, undefined, skillInfo.skills)
    ]

    return Promise.all(promiseArray)
}
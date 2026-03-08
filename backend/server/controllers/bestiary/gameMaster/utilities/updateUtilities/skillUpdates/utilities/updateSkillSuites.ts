import { Skill, SkillObject } from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces";
import query from "../../../../../../../db/database";

export default async function updateSkillSuites(beastID: number, roleID: string | undefined, skills?: SkillObject): Promise<any> {
    if (skills) {
        const { preferred = [], weakness = [] } = skills

        return Promise.all([
            updateSkillSuite(beastID, roleID, preferred, 'preferred'),
            updateSkillSuite(beastID, roleID, weakness, 'weakness')
        ])
    }
    return true
}

const deleteSkillSuiteSQL = `delete from bbSkillSuites 
where beastID = $1 and roleID = $2 and key = $3 and Not (id = any($4))`

const updateSkillSuiteSQL = `update bbSkillSuites
set skill = $2, index = $3
where id = $1`

const addSkillSuiteSQL = `insert into bbSkillSuites (beastID, roleID, skill, index, key)
values ($1, $2, $3, $4, $5)`

async function updateSkillSuite(beastID: number, roleID: string | undefined, suites: Skill[], key: 'preferred' | 'weakness') {
    await query(deleteSkillSuiteSQL, [beastID, roleID, key, [0, ...suites.map(suite => suite.id)]])

    return suites.map(({ id, skill }, index) => {
        if (id) {
            return query(updateSkillSuiteSQL, [id, skill, index])
        }

        return query(addSkillSuiteSQL, [beastID, roleID, skill, index, key])
    })
}

export default interface SkillInfo {
    panic: number,
    stress: number,
    skillrole: string,
    skillsecondary: string,
    skillpoints: number,
    atk_skill: string,
    def_skill: string,
    skills?: Skill[],
    obstacles: Obstacle[],
    challenges: Challenge[],
}

export interface Skill {
    id: number,
    beastid: number,
    skill: string,
    rank: string,
    skillroleid: string,
    allroles: boolean,
    strength: string,
    adjustment: number,
    deleted: boolean
}

export interface Obstacle {
    id: number,
    beastid: number,
    obstacleid: number,
    name: string,
    notes: string,
    complicationsingle: string,
    difficulty: string,
    failure: string,
    information: string,
    success: string,
    threshold: string,
    time: string,
    type: string,
    stringid: string,
    complications?: Complication[],
    pairsOne?: Pair[]
    pairsTwo?: Pair[]
}

export interface Complication {
    name: string,
    body: string,
    index: number,
    stringid: string,
    id: number
}

export interface Pair {
    name: string,
    body: string,
    type: 'pairone' | 'pairtwo'
    index: number,
    id: number,
    stringid: string
}

export interface Challenge {
    id: number,
    beastid: number,
    challengeid: number,
    name: string,
    flowchart: string,
    type: string,
    notes: string,
    obstacles: ObstacleNameObject
}

interface ObstacleNameObject {
    [key: string]: Obstacle
}
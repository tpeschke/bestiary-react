import { ConflictObject } from '../../../../../common/interfaces/beast/infoInterfaces/socialInfoInterfaces'

export default interface SocialInfo {
    socialrole: string,
    socialsecondary: string,
    socialpoints: number,
    atk_conf: string,
    def_conf: string,
    archetypeInfo: ArchetypeInfo,
    conflicts: ConflictObject,
}

export interface ArchetypeInfo {
    hasarchetypes: boolean,
    hasmonsterarchetypes: boolean,
    difficultyDie: string,
    normalArchetypes: NormalArchetypeObject,
    monsterArchetypes: MonsterArchetypeObject
}

interface ArchetypeObject {
    type: 'monster' | 'normal'
}

export interface MonsterArchetypeObject extends ArchetypeObject {
    type: 'monster',
    archetype: string[]
}

export interface NormalArchetypeObject extends ArchetypeObject {
    type: 'normal'
    archetype: string,
    deviation: boolean,
    reverse: boolean
}
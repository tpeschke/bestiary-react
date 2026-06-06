import { SystemInfoArray } from "../beast/infoInterfaces/generalInfoInterfaces";

export interface ObstacleTile {
    obstacleid: number | null;
    challengeid: number | null;
    name: string
}

export interface Challenge {
    id: number,
    beastid: number,
    challengeid: number,
    name: string,
    flowchart: string,
    type: string,
    notes: string,
    obstacles: ObstacleNameObject,
    relatedBeasts?: RelatedBeasts[]
}

interface RelatedBeasts {
    id: number,
    beastid: number,
    name: string
}

interface ObstacleNameObject {
    [key: string]: Obstacle
}

export interface RawObstacle {
    id: number,
    beastid?: number,
    obstacleid: number,
    name: string,
    skull: number,
    prompt: string | null,
    difficulty: string,
    notes: string,
    complicationsingle: string,
    failure: string,
    information: string,
    success: string,
    threshold: string,
    time: string,
    type: string,
    stringid: string,
}

export interface Obstacle {
    id: number,
    beastid?: number,
    obstacleid: number,
    name: string,
    skull: number,
    ep: number,
    prompt: string | null,
    difficulty: SystemInfoArray,
    notes: string,
    complicationsingle: SystemInfoArray,
    information: string,
    failure: SystemInfoArray,
    success: SystemInfoArray,
    threshold: string,
    time: string,
    type: string,
    stringid: string,
    complications?: Complication[],
    pairsOne?: Pair[]
    pairsTwo?: Pair[]
    skullVariants?: SkullVariant[]
}

export interface RawComplication {
    name: string,
    body: string,
    index: number,
    stringid: string,
    id: number
}

export interface Complication {
    name: string,
    body: SystemInfoArray,
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

export interface SkullVariant {
    id: number,
    skullValue: number,
    stringid: string,
    body: string
}
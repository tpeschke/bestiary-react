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
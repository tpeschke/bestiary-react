export interface Challenge {
    id: number,
    challengeid: number,
    beastid: number
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
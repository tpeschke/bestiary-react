export type ScalingObject = {
    majSt: number,
    minSt: number,
    none: number,
    minWk: number,
    majWk: number,
    x: number
}

export type DiceObject = {
    d3: number,
    d4: number,
    d6: number,
    d8: number,
    d10: number,
    d12: number,
    d20: number,
    damageMod?: number
}

export type ScalingAndBonus = {
    scaling: ScalingObject,
    bonus: ScalingObject,
    swarm?: ScalingObject
}

export default {
    attack: {
        scaling: {
            majSt: 5,
            minSt: 3,
            none: 0,
            minWk: -2,
            majWk: -3
        },
        bonus: {
            majSt: 1.25,
            minSt: 1,
            none: 0,
            minWk: .5,
            majWk: .33
        }
    },
    cover: {
        scaling: {
            majSt: 6,
            minSt: 3,
            none: 0,
            minWk: -3,
            majWk: -6
        },
        bonus: {
            majSt: 3,
            minSt: 2,
            none: 0,
            minWk: 1,
            majWk: .75
        }
    },
    damage: {
        scaling: {
            majSt: 5,
            minSt: 4,
            none: 3,
            minWk: 2,
            majWk: 1
        },
        bonus: {
            majSt: 1,
            minSt: .75,
            none: 0,
            minWk: .5,
            majWk: .25
        }
    },
    defense: {
        scaling: {
            majSt: 3,
            minSt: 2,
            none: 0,
            minWk: -3,
            majWk: -5
        },
        bonus: {
            majSt: 1.1,
            minSt: 1.05,
            none: 0,
            minWk: 1,
            majWk: .9
        }
    },
    flanks: {
        scaling: {
            majSt: 2,
            minSt: 1,
            none: 0,
            minWk: -1,
            majWk: -2
        },
        bonus: {
            majSt: 1.5,
            minSt: 1,
            none: 0,
            minWk: .5,
            majWk: .25
        }
    },
    initiative: {
        scaling: {
            majSt: -2,
            minSt: -1,
            none: 0,
            minWk: 2,
            majWk: 4
        },
        bonus: {
            majSt: -1.5,
            minSt: -1.25,
            none: 0,
            minWk: -.75,
            majWk: -.5
        }
    },
    measure: {
        scaling: {
            majSt: 5,
            minSt: 4,
            none: 3,
            minWk: 2,
            majWk: 1
        },
        swarm: {
            majSt: 2,
            minSt: 1,
            none: 0,
            minWk: -1,
            majWk: -2
        },
        bonus: {
            majSt: .75,
            minSt: .5,
            none: 0,
            minWk: .25,
            majWk: .1
        }
    },
    parry: {
        scaling: {
            majSt: 6,
            minSt: 3,
            none: 0,
            minWk: -0,
            majWk: -3
        },
        bonus: {
            majSt: 1,
            minSt: .75,
            none: 0,
            minWk: .5,
            majWk: .25
        }
    },
    parrySlashDR: {
        scaling: {
            majSt: 3,
            minSt: 2,
            none: 2,
            minWk: 1,
            majWk: 0
        },
        bonus: {
            majSt: .75,
            minSt: .5,
            none: 0,
            minWk: .2,
            majWk: .1
        }
    },
    parryStaticDR: {
        scaling: {
            majSt: 4,
            minSt: 2,
            none: 0,
            minWk: -1,
            majWk: -2
        },
        bonus: {
            majSt: 1,
            minSt: .75,
            none: 0,
            minWk: .5,
            majWk: .25
        }
    },
    rangeIncrement: {
        scaling: {
            majSt: 200,
            minSt: 100,
            none: 50,
            minWk: 25,
            majWk: 10
        },
        bonus: {
            majSt: 50,
            minSt: 20,
            none: 0,
            minWk: 5,
            majWk: 2
        }
    },
    recovery: {
        swarm: {
            majSt: -2,
            minSt: -1,
            none: 0,
            minWk: 1,
            majWk: 2
        },
        scaling: {
            majSt: .6,
            minSt: .8,
            none: 1,
            minWk: 1,
            majWk: 1.25
        },
        bonus: {
            majSt: .5,
            minSt: .25,
            none: 0,
            minWk: .1,
            majWk: .05
        }
    },
    slashingDR: {
        scaling: {
            majSt: 2,
            minSt: 1,
            none: 0,
            minWk: -1,
            majWk: -2
        },
        bonus: {
            majSt: .75,
            minSt: .5,
            none: 0,
            minWk: .2,
            majWk: .1
        }
    },
    staticDR: {
        scaling: {
            majSt: 3,
            minSt: 2,
            none: 0,
            minWk: -1,
            majWk: -3
        },
        bonus: {
            majSt: 1,
            minSt: .75,
            none: 0,
            minWk: .5,
            majWk: .25
        }
    }
}
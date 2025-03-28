export interface BeastTile {
    id: number,
    name: string,
    patreon: number,
    canplayerview: boolean,
    thumbnail: string,
    hash: string,
    role: string,
    secondaryrole: string,
    socialrole: string,
    skillrole: string,
    defaultrole: string | null,
    socialsecondary: string,
    rarity: number,
    skillsecondary: string,
    notupdating: boolean,
    roles: Role[]
}

export interface Role {
    id: string,
    hash: string,
    name: string,
    role: string,
    secondaryrole: string,
    socialrole: string,
    skillrole: string,
    socialsecondary: string,
    skillsecondary: string
}
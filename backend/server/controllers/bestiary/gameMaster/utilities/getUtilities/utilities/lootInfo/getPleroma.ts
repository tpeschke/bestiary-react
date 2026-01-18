import { Pleroma } from "@bestiary/common/interfaces/beast/infoInterfaces/lootInfoInterfaces";
import { getMonsterPleroma } from "../../../../../../../db/beast/pleroma";
import query from "../../../../../../../db/database";

export default async function getPleroma(beastId: number): Promise<Pleroma[]> {
    const pleromaResult = await query(getMonsterPleroma, beastId)

    return pleromaResult.map(pleroma => {
        return {
            ...pleroma,
            positionModifier: getPositionModifier(pleroma.difficulty),
            harvestDifficulty: getHarvestDifficulty(pleroma.harvest)
        }
    })
}

function getPositionModifier(difficulty: string | null): string | null {
    if (!difficulty) { return null }

    const difficultyMod: { [key: string]: string } = {
        'n/a': '',
        '0': '',
        'd10!': '+1 Pos',
        'd20!': '+2 Pos',
        'd10!+d20!': '+3 Pos',
        '2d20!': '+4 Pos',
        '3d20!': '+5 Pos',
        '4d20!': '+6 Pos'
    }

    return difficultyMod[difficulty]
}

function getHarvestDifficulty(difficulty: string | null): string | null {
    if (!difficulty) { return null }

    const difficultyMod: { [key: string]: string | null } = {
        'Depends': 'Depends',
        '': null,
        'n/a': 'n/a',
        '+0': '0 - s1 (d0 / d6 / d20)',
        '0': '0 - s1 (d0 / d6 / d20)',
        'd10!': '0 - s1 (d0 / d6 / d20)',
        '1d10!': '0 - s1 (d0 / d6 / d20)',
        '1d20!': '6 - s1 (d4 / d8 / d12)',
        'd20!': '6 - s1 (d4 / d8 / d12)',
        'd10!+d20!': '9 - s1 (d6 / d10 / d10)',
        '1d10!+1d20!': '9 - s1 (d6 / d10 / d10)',
        '2d20!': '12 - s1 (d8 / d12 / d8)',
        '2d20': '12 - s1 (d8 / d12 / d8)',
        '1d10!+2d20!': '15 - n (d10 / d20 / d6)',
        'd10!+2d20!': '15 - n (d10 / d20 / d6)',
        '3d20!': '18 - n (d12 / d20+d4 / d4)',
        '4d20!': '30 - n (d20 / d20+d6 / d0)'
    }

    return difficultyMod[difficulty]
}


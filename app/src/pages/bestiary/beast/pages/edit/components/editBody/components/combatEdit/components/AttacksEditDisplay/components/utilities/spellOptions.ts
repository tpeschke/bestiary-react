import { Spell } from "@bestiary/common/interfaces/beast/infoInterfaces/castingInfo"

export default function getSpellOptions(spells: Spell[]): { value: string, label: string }[] {
    return spells.map(({id, name}) => {
        return {
            value: id,
            label: name
        }
    })
}
import { Spell } from "../../../../../../../../../../interfaces/infoInterfaces/castingInfo"

export default function getSpellOptions(spells: Spell[]): { value: number, label: string }[] {
    return spells.map(({id, name}) => {
        return {
            value: id,
            label: name
        }
    })
}
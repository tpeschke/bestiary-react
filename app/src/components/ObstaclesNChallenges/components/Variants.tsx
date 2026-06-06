import { SkullVariant } from "@bestiary/common/interfaces/obstacles/obstacleCatalog"
import Icon from "../../icon/Icon"
import { BONFIRE } from "@bestiary/common/utilities/get/getSystemString"
import getBaseEPValue from "@bestiary/common/utilities/scalingAndBonus/hackMaster/getEPValue"

interface Props {
    hideVariants: boolean,
    skullVariants: SkullVariant[],
    systemPreference: 0 | 1 | 2 | undefined
}

export default function Variants({ hideVariants, skullVariants, systemPreference }: Props) {
    return (
        <>
            {(!hideVariants && skullVariants.length > 0) && (
                <>
                    <tr className='standard-row'>
                        <td colSpan={2}><strong>Variants</strong></td>
                    </tr>
                    {skullVariants.map(({ skullValue, body }: SkullVariant, index) => {
                        if (systemPreference === BONFIRE) {
                            return formatForBonfire(index, skullValue, body)
                        }
                        return formatForHackMaster(index, skullValue, body)
                    })}
                    <tr>
                        <td colSpan={2} className='italic'>These are suggestions; variations within variations exist that might further modify the Skull value of an Obstacle.</td>
                    </tr>
                </>
            )}
        </>
    )
}

function formatForBonfire(index: number, skullValue: number, body: String) {
    return (
        <tr key={index} className='standard-row complication-row'>
            <td>{skullValue} <Icon iconName='skull' /></td>
            <td>{body}</td>
        </tr>
    )
}

function formatForHackMaster(index: number, skullValue: number, body: String) {
    return (
        <tr key={index} className='standard-row complication-row'>
            <td>{getBaseEPValue(skullValue)} EP</td>
            <td>{body}</td>
        </tr>
    )
}
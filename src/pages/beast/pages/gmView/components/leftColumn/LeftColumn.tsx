import ImageInfo from "../../../../interfaces/infoInterfaces/ImageInfoInterfaces"
import SocialInfo from "../../../../interfaces/infoInterfaces/socialInfo"
import SkillInfo from "../../../../interfaces/infoInterfaces/skillInfoInterfaces"

import FullImage from "../../../../components/UI/fullImage/fullImage"
import ConfrontationSection from "./components/confrontation/ConfrontationSection"
import SkillSection from "./components/skills/SkillSection"
import CombatSection from "./components/combat/CombatSection"
import CombatInfo from "../../../../interfaces/infoInterfaces/combatInfoInterfaces"
import { Size } from "../../../../interfaces/infoInterfaces/generalInfoInterfaces"

interface Props {
    beastId: number,
    beastName: string,
    imageInfo: ImageInfo, 
    socialInfo: SocialInfo,
    skillInfo: SkillInfo,
    combatInfo: CombatInfo,
    size: Size
}

export default function LeftColumn({ beastId, beastName, imageInfo, socialInfo, skillInfo, combatInfo, size }: Props) {
    return (
        <>
            <FullImage imageParam={beastId} altText={beastName} artistInfo={imageInfo.artistInfo?.genericArtistInfo}/>
            <ConfrontationSection socialInfo={socialInfo} />
            <SkillSection skillInfo={skillInfo} />
            <CombatSection combatInfo={combatInfo} size={size} />
        </>
    )
}
import ImageInfo from "../../../../interfaces/infoInterfaces.ts/ImageInfoInterfaces"
import SocialInfo from "../../../../interfaces/infoInterfaces.ts/socialInfo"
import SkillInfo from "../../../../interfaces/infoInterfaces.ts/skillInfoInterfaces"

import FullImage from "../../../../components/UI/fullImage/fullImage"
import ConfrontationSection from "./components/confrontation/ConfrontationSection"
import SkillSection from "./components/skills/SkillSection"
import CombatSection from "./components/combat/CombatSection"
import CombatInfo from "../../../../interfaces/infoInterfaces.ts/combatInfoInterfaces"

interface Props {
    beastId: number,
    beastName: string,
    imageInfo: ImageInfo, 
    socialInfo: SocialInfo,
    skillInfo: SkillInfo,
    combatInfo: CombatInfo
}

export default function LeftColumn({ beastId, beastName, imageInfo, socialInfo, skillInfo, combatInfo }: Props) {
    return (
        <>
            <FullImage imageParam={beastId} altText={beastName} artistInfo={imageInfo.artistInfo?.genericArtistInfo}/>
            <ConfrontationSection socialInfo={socialInfo} />
            <SkillSection skillInfo={skillInfo} />
            <CombatSection combatInfo={combatInfo} />
        </>
    )
}
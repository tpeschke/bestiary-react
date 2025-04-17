import GeneralInfo from "../interfaces/infoInterfaces.ts/generalInfoInterfaces";
import ImageInfo from "../interfaces/infoInterfaces.ts/ImageInfoInterfaces";
import SkillInfo from "../interfaces/infoInterfaces.ts/skillInfoInterfaces";
import SocialInfo from "../interfaces/infoInterfaces.ts/socialInfo";
import { BeastInfo } from "../interfaces/viewInterfaces";

export default class GMBeastClass {
    private beastInfo: BeastInfo;

    constructor(beastInfo: BeastInfo) {
        this.beastInfo = beastInfo;
    }

    get id(): number {
        return this.beastInfo?.id ? this.beastInfo.id : 0
    }

    get generalInfo(): GeneralInfo {
        return this.beastInfo.generalInfo
    }

    get imageInfo(): ImageInfo {
        return this.beastInfo.imageInfo
    }

    get socialInfo(): SocialInfo {
        return this.beastInfo.socialInfo
    }

    get skillInfo(): SkillInfo {
        return this.beastInfo.skillInfo
    }
 }
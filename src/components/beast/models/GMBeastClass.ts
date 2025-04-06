import GeneralInfo from "../interfaces/infoInterfaces.ts/generalInfoInterfaces";
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
}
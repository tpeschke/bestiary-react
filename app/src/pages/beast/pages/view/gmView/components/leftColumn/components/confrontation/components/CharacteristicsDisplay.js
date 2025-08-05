import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import CharacteristicsInfo from "./CharacteristicInfo";
export default function CharacteristicsDisplay({ characteristicInfo }) {
    const { burdens, convictions, descriptions, relationships, flaws } = characteristicInfo;
    const hasDescriptions = descriptions.length > 0;
    const hasConvictions = convictions.length > 0;
    const hasRelationships = relationships.length > 0;
    const hasFlaws = flaws.length > 0;
    const hasBurdens = burdens.length > 0;
    return (_jsxs(_Fragment, { children: [hasDescriptions && _jsx(CharacteristicsInfo, { title: "Descriptions", characteristics: descriptions }), hasConvictions && _jsx(CharacteristicsInfo, { title: "Convictions", characteristics: convictions }), hasRelationships && _jsx(CharacteristicsInfo, { title: "Relationships", characteristics: relationships }), hasFlaws && _jsx(CharacteristicsInfo, { title: "Flaws", characteristics: flaws }), hasBurdens && _jsx(CharacteristicsInfo, { title: "Burdens & Injuries", characteristics: burdens })] }));
}

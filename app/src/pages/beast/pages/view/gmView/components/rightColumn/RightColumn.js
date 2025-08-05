import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './RightColumn.css';
import Body from "../../../../../components/UI/body/Body";
import HTMLDisplay from "../../../../../components/UI/htmlDisplay/htmlDisplay";
import CommonFolklore from "./components/commonFolklore/CommonFolklore";
import InfoDisplay from "./components/infoDisplay/InfoDisplay";
import TypesDisplay from './components/typesDisplay/TypesDisplay';
import MiscInfoDisplay from './components/miscInfoDisplay/MiscInfoDisplay';
import VariantsDisplay from './components/variantsDisplay/VariantsDisplay';
import LocationsDisplay from './components/locationsDisplay/LocationsDisplay';
import LootDisplay from './components/lootDisplay/LootDisplay';
import HabitatDisplay from './components/habitatDisplay/HabitatDisplay';
import EncounterDisplay from './components/encounterDisplay/EncounterDisplay';
import PlayerDisplayInfo from './components/playerInfo/PlayerDisplayInfo';
export default function RightColumn({ appearance, intro, habitat, folklores, scenarios, types, miscInfo, variants, meta, locationsInfo, lootInfo, maxPoints, notes, updateNotes }) {
    const showIntroSection = intro && intro !== '';
    return (_jsxs("div", { className: 'right-column-shell', children: [showIntroSection &&
                _jsx(Body, { children: _jsx(HTMLDisplay, { html: intro }) }), _jsx(InfoDisplay, { section: "Appearance", info: appearance }), _jsx(CommonFolklore, { folklores: folklores }), _jsx(HabitatDisplay, { info: habitat, scenarios: scenarios }), _jsx(EncounterDisplay, {}), _jsx(LootDisplay, { lootInfo: lootInfo, rarity: miscInfo.rarity, maxPoints: maxPoints }), _jsx(MiscInfoDisplay, { miscInfo: miscInfo }), _jsx(TypesDisplay, { types: types }), _jsx(VariantsDisplay, { variantsInfo: variants }), _jsx(LocationsDisplay, { locationsInfo: locationsInfo }), _jsx(InfoDisplay, { section: 'Meta Notes', info: meta }), _jsx(PlayerDisplayInfo, { notes: notes, updateNotes: updateNotes })] }));
}

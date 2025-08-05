import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import NotesDisplay from "../../../../../../../components/notes/notesDisplay";
import Body from "../../../../../../../components/UI/body/Body";
export default function PlayerDisplayInfo({ notes, updateNotes }) {
    return (_jsxs("div", { className: 'player-display-shell', children: [_jsx("h2", { className: 'border', children: "Notes" }), _jsx(Body, { children: _jsx(NotesDisplay, { notes: notes, setPlayerNotes: updateNotes }) })] }));
}

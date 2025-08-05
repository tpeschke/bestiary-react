import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import NotesDisplay from "../../../components/notes/notesDisplay";
import DoubleColumn from "../../../components/UI/doubleColumn/doubleColumn";
import FullImage from "../../../components/UI/fullImage/fullImage";
import NameHeader from "../../../components/UI/nameHeader/nameHeader";
export default function PlayerView({ beast }) {
    return (_jsxs(_Fragment, { children: [_jsx(NameHeader, { name: beast.name }), _jsx(DoubleColumn, { LeftColumn: FullImage({ imageParam: beast.id, altText: beast.name, artistInfo: beast.artistInfo, roleID: null }), RightColumn: NotesDisplay({ notes: beast.notes, setPlayerNotes: beast.setNotes }) })] }));
}

import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import './notes.css';
import TextEditor from '../textEditor/textEditor';
import { useSelector } from 'react-redux';
import { isUserLoggedOn } from '../../../../redux/slices/userSlice';
export default function NotesDisplay({ notes, setPlayerNotes }) {
    const userIsLoggedIn = useSelector(isUserLoggedOn);
    return (_jsx(_Fragment, { children: userIsLoggedIn ?
            _jsx("div", { className: 'notes-shell', children: _jsx(TextEditor, { content: notes, captureCallBack: setPlayerNotes }) })
            :
                _jsx("p", { className: 'warning', children: "You need to be logged in to leave notes" }) }));
}

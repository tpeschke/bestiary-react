import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import './textEditor.css';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './menuBar';
import HTMLDisplay from '../UI/htmlDisplay/htmlDisplay';
export default function TextEditor({ content, captureCallBack = () => { }, readOnly = false }) {
    const extensions = [
        // @ts-ignore
        TextStyle.configure({ types: [ListItem.name] }),
        StarterKit.configure({
            bulletList: {
                keepMarks: true,
                keepAttributes: false,
            },
            orderedList: {
                keepMarks: true,
                keepAttributes: false,
            },
        })
    ];
    return (_jsx(_Fragment, { children: readOnly ?
            _jsx(HTMLDisplay, { html: content.notes })
            :
                _jsx(EditorProvider, { onBlur: ({ editor }) => captureCallBack(editor.getHTML()), slotBefore: _jsx(MenuBar, {}), extensions: extensions, content: content.notes }) }));
}

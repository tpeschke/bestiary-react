import './textEditor.css'

import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import MenuBar from './menuBar'

import { Notes } from '../../interfaces/viewInterfaces'

interface Props {
  content: Notes,
  captureCallBack: (value: string) => void,
  readOnly?: boolean
}

export default function TextEditor({ content, captureCallBack, readOnly = false }: Props) {
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
  ]

  return (
    <>
      {readOnly ?
        <div dangerouslySetInnerHTML={{ __html: content.notes }} />
        :
        <EditorProvider onBlur={({editor}) => captureCallBack(editor.getHTML())} slotBefore={<MenuBar />} extensions={extensions} content={content.notes}></EditorProvider>
      }
    </>
  )
}